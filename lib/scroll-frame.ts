/**
 * A single shared scroll loop.
 *
 * The homepage choreographs nine sections off scroll position. Giving each
 * section its own `requestAnimationFrame` loop and scroll listener would mean
 * nine independent layout-read passes per frame; instead every section
 * subscribes here and one loop drives them all, exactly like the original
 * mockup's single `frame()` function.
 *
 * The loop is idle until a scroll happens and parks itself again once the
 * smoothed velocity settles, so a still page costs nothing.
 */

export interface FrameState {
  /** `window.scrollY` for this frame. */
  readonly y: number;
  /** Raw pixel delta since the previous frame. */
  readonly dy: number;
  /** Smoothed scroll velocity. Drives the elastic marquee. */
  readonly vel: number;
  readonly vw: number;
  readonly vh: number;
  /** `documentElement.scrollHeight - vh`, for page-progress readouts. */
  readonly docH: number;
}

type FrameHandler = (state: FrameState) => void;
type BuildHandler = (vw: number, vh: number) => void;

const frameHandlers = new Set<FrameHandler>();
const buildHandlers = new Set<BuildHandler>();

let vw = 0;
let vh = 0;
let lastY = 0;
let vel = 0;
let running = false;
let started = false;
let resizeTimer: ReturnType<typeof setTimeout> | undefined;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function tick() {
  const y = window.scrollY;
  const dy = y - lastY;
  lastY = y;
  vel += (dy - vel) * 0.18;

  const state: FrameState = {
    y,
    dy,
    vel,
    vw,
    vh,
    docH: document.documentElement.scrollHeight - vh,
  };

  for (const handler of frameHandlers) handler(state);

  if (Math.abs(vel) > 0.05) {
    requestAnimationFrame(tick);
  } else {
    running = false;
  }
}

/** Wake the loop. Safe to call as often as you like. */
export function requestFrame() {
  if (typeof window === "undefined" || running) return;
  running = true;
  requestAnimationFrame(tick);
}

/** Force one pass even when the loop is parked (e.g. right after a rebuild). */
function runOnce() {
  if (typeof window === "undefined") return;
  const y = window.scrollY;
  lastY = y;
  const state: FrameState = {
    y,
    dy: 0,
    vel: 0,
    vw,
    vh,
    docH: document.documentElement.scrollHeight - vh,
  };
  for (const handler of frameHandlers) handler(state);
}

function build() {
  vw = window.innerWidth;
  vh = window.innerHeight;
  for (const handler of buildHandlers) handler(vw, vh);
  runOnce();
}

function ensureStarted() {
  if (started || typeof window === "undefined") return;
  started = true;

  vw = window.innerWidth;
  vh = window.innerHeight;
  lastY = window.scrollY;

  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 120);
  });

  // Web fonts change text metrics, which the SVG mask geometry depends on.
  document.fonts?.ready.then(build).catch(() => {});
  window.addEventListener("load", build);
}

/**
 * Subscribe to the scroll loop. Handlers are skipped entirely when the visitor
 * prefers reduced motion — the `.rm` stylesheet lands every scene on its final
 * state instead.
 */
export function onFrame(handler: FrameHandler): () => void {
  if (typeof window === "undefined" || prefersReducedMotion()) {
    return () => {};
  }
  ensureStarted();
  frameHandlers.add(handler);
  requestFrame();
  return () => {
    frameHandlers.delete(handler);
  };
}

/**
 * Subscribe to geometry rebuilds: once on mount, then on debounced resize,
 * font load and window load. Runs regardless of motion preference because
 * some handlers set layout, not animation.
 */
export function onBuild(handler: BuildHandler): () => void {
  if (typeof window === "undefined") return () => {};
  ensureStarted();
  buildHandlers.add(handler);
  handler(window.innerWidth, window.innerHeight);
  return () => {
    buildHandlers.delete(handler);
  };
}

export const clamp = (v: number, a: number, b: number) =>
  Math.min(b, Math.max(a, v));

/** Normalise `v` into 0..1 across the range `a..b`. */
export const map = (v: number, a: number, b: number) =>
  clamp((v - a) / (b - a), 0, 1);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
