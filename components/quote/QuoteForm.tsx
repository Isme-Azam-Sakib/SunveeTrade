"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState, type FormEvent } from "react";

import { Arrow } from "@/components/ui/Arrow";
import { productLines } from "@/content/products";
import type { QuoteFieldErrors, QuoteResponse } from "@/lib/quote-schema";

import styles from "./QuoteForm.module.css";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; message: string }
  | { state: "failed"; message: string };

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function QuoteForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus({ state: "sending" });
    setErrors({});

    const payload = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      productLines: data.getAll("productLines").map(String),
      quantity: String(data.get("quantity") ?? ""),
      targetDate: String(data.get("targetDate") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      turnstileToken: token,
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as QuoteResponse;

      if (result.ok) {
        setStatus({ state: "sent", message: result.message });
        form.reset();
      } else {
        setErrors(result.fieldErrors ?? {});
        setStatus({ state: "failed", message: result.message });
      }
    } catch {
      setStatus({
        state: "failed",
        message:
          "We could not reach the server. Please check your connection, or email sohag@sunveeintl.com.",
      });
    } finally {
      // A Turnstile token is single-use.
      turnstileRef.current?.reset();
      setToken("");
    }
  }

  const sending = status.state === "sending";

  return (
    <div className={styles.panel}>
      <h3>Request a quote</h3>
      <p>
        Tell us the line, the quantity and the date. We reply with a costed
        quotation and a sampling plan.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <div className={styles.grid}>
          <Field
            label="Your name"
            name="name"
            autoComplete="name"
            required
            errors={errors.name}
          />
          <Field
            label="Company"
            name="company"
            autoComplete="organization"
            required
            errors={errors.company}
          />
          <Field
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            required
            errors={errors.email}
          />
          <Field
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            errors={errors.phone}
          />
          <Field
            label="Country"
            name="country"
            autoComplete="country-name"
            errors={errors.country}
          />
          <Field
            label="Approx. quantity"
            name="quantity"
            placeholder="e.g. 50,000 pcs"
            errors={errors.quantity}
          />

          <div className={styles.full}>
            <fieldset className={styles.lines}>
              <legend>Product lines</legend>
              {productLines.map((line) => (
                <label className={styles.chip} key={line.slug}>
                  <input
                    type="checkbox"
                    name="productLines"
                    value={line.slug}
                  />
                  <span>{line.name}</span>
                </label>
              ))}
            </fieldset>
            {errors.productLines ? (
              <p className={styles.error} style={{ marginTop: 10 }}>
                {errors.productLines[0]}
              </p>
            ) : null}
          </div>

          <div className={styles.full}>
            <Field
              label="Target delivery date"
              name="targetDate"
              placeholder="e.g. March 2027"
              errors={errors.targetDate}
            />
          </div>

          <div className={styles.full}>
            <div
              className={styles.field}
              data-invalid={Boolean(errors.message)}
            >
              <label htmlFor="quote-message">Your requirement</label>
              <textarea
                id="quote-message"
                name="message"
                required
                placeholder="Construction, width, colours, certifications, and anything already in a tech pack."
                aria-describedby={
                  errors.message ? "quote-message-error" : undefined
                }
              />
              {errors.message ? (
                <p className={styles.error} id="quote-message-error">
                  {errors.message[0]}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Honeypot. Real users never see or tab to this. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="quote-website">Leave this field empty</label>
          <input
            id="quote-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {siteKey ? (
          <div className={styles.turnstile}>
            <Turnstile
              ref={turnstileRef}
              siteKey={siteKey}
              onSuccess={setToken}
              onExpire={() => setToken("")}
              options={{ theme: "dark", size: "flexible" }}
            />
          </div>
        ) : null}

        <div className={styles.foot}>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Sending…" : "Send request"} <Arrow />
          </button>
          <p className={styles.note}>
            Goes straight to our merchandising team. We reply within one working
            day.
          </p>
        </div>

        {status.state === "sent" || status.state === "failed" ? (
          <p
            className={styles.status}
            data-tone={status.state === "sent" ? "ok" : "error"}
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  errors,
  ...input
}: {
  label: string;
  name: string;
  errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `quote-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className={styles.field} data-invalid={Boolean(errors)}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="text"
        aria-describedby={errors ? errorId : undefined}
        {...input}
      />
      {errors ? (
        <p className={styles.error} id={errorId}>
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}
