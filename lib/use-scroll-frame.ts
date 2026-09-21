"use client";

import { useEffect, useEffectEvent } from "react";

import { onBuild, onFrame, type FrameState } from "./scroll-frame";

/**
 * Subscribe a component to the shared scroll loop for its lifetime.
 *
 * The handler is wrapped in an Effect Event so it always sees the latest
 * props and state without the subscription tearing down and re-establishing
 * on every render.
 */
export function useScrollFrame(handler: (state: FrameState) => void) {
  const onTick = useEffectEvent(handler);
  useEffect(() => onFrame((state) => onTick(state)), []);
}

/** Subscribe to geometry rebuilds (mount, resize, font load, window load). */
export function useBuild(handler: (vw: number, vh: number) => void) {
  const onRebuild = useEffectEvent(handler);
  useEffect(() => onBuild((vw, vh) => onRebuild(vw, vh)), []);
}
