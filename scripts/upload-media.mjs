#!/usr/bin/env node
/**
 * Publish product photography to Cloudflare R2 (technical spec §4).
 *
 * Images are not committed to git. `public/media` is the local staging area:
 * drop new photography in, check it in `npm run dev`, then run this script to
 * push it to the bucket. Bucket keys mirror the staging paths exactly, so the
 * same `MediaRef.key` resolves locally and in production.
 *
 *   npm run media:upload            # upload anything missing or changed
 *   npm run media:upload -- --force # re-upload everything
 *   npm run media:upload -- --dry   # list what would be uploaded
 *
 * Credentials come from .env.local and never reach the client bundle.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import mime from "mime-types";

const MEDIA_ROOT = path.resolve(process.cwd(), "public/media");
const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const dryRun = args.has("--dry");

function loadEnvFile() {
  // Node 20.6+ can do this with --env-file, but keeping it inline means the
  // npm script stays portable.
  try {
    const raw = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      process.env[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  } catch {
    // No .env.local — fall back to the ambient environment.
  }
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && !entry.name.startsWith(".")) {
      yield full;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing ${name}. Set it in .env.local (see .env.example).`);
    process.exit(1);
  }
  return value;
}

async function main() {
  loadEnvFile();

  try {
    await stat(MEDIA_ROOT);
  } catch {
    console.error(`No media directory at ${MEDIA_ROOT}.`);
    process.exit(1);
  }

  const accountId = requireEnv("R2_ACCOUNT_ID");
  const bucket = requireEnv("R2_BUCKET_NAME");
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });

  let uploaded = 0;
  let skipped = 0;

  for await (const file of walk(MEDIA_ROOT)) {
    const key = path.relative(MEDIA_ROOT, file).split(path.sep).join("/");
    const body = await readFile(file);
    const etag = createHash("md5").update(body).digest("hex");

    if (!force) {
      try {
        const head = await client.send(
          new HeadObjectCommand({ Bucket: bucket, Key: key }),
        );
        if (head.ETag?.replace(/"/g, "") === etag) {
          skipped += 1;
          continue;
        }
      } catch {
        // Not in the bucket yet — fall through and upload.
      }
    }

    const contentType = mime.lookup(file) || "application/octet-stream";
    console.log(`${dryRun ? "would upload" : "uploading"}  ${key}`);

    if (!dryRun) {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: contentType,
          // Catalog images are replaced by uploading a new filename, so a long
          // immutable TTL is safe and keeps Cloudflare serving from edge.
          CacheControl: "public, max-age=31536000, immutable",
        }),
      );
    }
    uploaded += 1;
  }

  console.log(
    `\n${dryRun ? "Dry run: " : ""}${uploaded} uploaded, ${skipped} unchanged.`,
  );
  if (uploaded > 0 && !dryRun) {
    console.log(
      "Remember the public bucket or custom domain must be reachable at NEXT_PUBLIC_IMAGE_CDN_DOMAIN.",
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
