"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_FRAMES = 100;
const BASE_PATH = "/images/CBN3D/";
const BASE_NAME = "CBN"; // Filenames: CBN1.webp, CBN2.webp...
const EXT = ".webp";
const INITIAL_FRAME_NUMBER = 20; // 1-indexed to match filenames
const ASPECT_RATIO = 16 / 9;
const FRAME_SENSITIVITY = -0.18; // negative to reverse drag direction (frames per pixel)
const ZOOM_MULTIPLIER = 0.5; // bleed outside canvas by ~12.5%

export default function Object3DViewer() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCountRef = useRef(TOTAL_FRAMES);
    const frameIndexRef = useRef(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, INITIAL_FRAME_NUMBER - 1))
    );
    const frameRemainderRef = useRef(0);
    const drawRequestedRef = useRef(false);
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const velocityRef = useRef(0);
    const momentumRafRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const rafRef = useRef(null);

    const [loaded, setLoaded] = useState(false);

    // Imperative draw helper, scheduled through rAF to avoid layout shift and rerenders.
    const drawFrame = useCallback(() => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIndexRef.current];
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        ctx.clearRect(0, 0, width, height);

        const coverScale = Math.max(width / img.width, height / img.height);
        const drawWidth = img.width * coverScale * ZOOM_MULTIPLIER;
        const drawHeight = img.height * coverScale * ZOOM_MULTIPLIER;
        const drawX = (width - drawWidth) / 2;
        const drawY = (height - drawHeight) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            drawX,
            drawY,
            drawWidth,
            drawHeight
        );
    }, []);

    const scheduleDraw = useCallback(() => {
        if (drawRequestedRef.current) return;
        drawRequestedRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
            drawRequestedRef.current = false;
            drawFrame();
        });
    }, [drawFrame]);

    // Keep canvas sized responsively while honoring aspect ratio (prevents layout shift).
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const width = container.clientWidth;
        const height = width / ASPECT_RATIO;
        const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        scheduleDraw();
    }, [scheduleDraw]);

    // Preload all frames once.
    useEffect(() => {
        let isCancelled = false;
        const loaders = Array.from({ length: TOTAL_FRAMES }, (_, idx) => {
            const img = new Image();
            img.src = `${BASE_PATH}${BASE_NAME}${idx + 1}${EXT}`;
            return new Promise((resolve) => {
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
            });
        });

        Promise.all(loaders).then((frames) => {
            if (isCancelled) return;
            const validFrames = frames.filter(Boolean);
            imagesRef.current = validFrames;
            frameCountRef.current = validFrames.length || TOTAL_FRAMES;
            frameIndexRef.current = Math.min(
                frameIndexRef.current,
                Math.max(0, frameCountRef.current - 1)
            );
            setLoaded(true);
            scheduleDraw();
        });

        return () => {
            isCancelled = true;
        };
    }, [scheduleDraw]);

    // Setup responsive canvas sizing.
    useEffect(() => {
        if (!containerRef.current) return undefined;
        resizeCanvas();

        resizeObserverRef.current = new ResizeObserver(() => {
            resizeCanvas();
        });

        resizeObserverRef.current.observe(containerRef.current);

        return () => {
            resizeObserverRef.current?.disconnect();
        };
    }, [resizeCanvas]);

    // Cleanup any pending rAF (draw + momentum).
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (momentumRafRef.current)
                cancelAnimationFrame(momentumRafRef.current);
        };
    }, []);

    const applyFrameDelta = useCallback(
        (deltaFrames) => {
            frameRemainderRef.current += deltaFrames;
            const wholeFrames = Math.trunc(frameRemainderRef.current);
            if (wholeFrames === 0) return;

            frameRemainderRef.current -= wholeFrames;
            const nextIndex =
                (frameIndexRef.current + wholeFrames + frameCountRef.current) %
                Math.max(frameCountRef.current, 1);
            frameIndexRef.current = nextIndex;
            scheduleDraw();
        },
        [scheduleDraw]
    );

    const stopMomentum = useCallback(() => {
        if (momentumRafRef.current) {
            cancelAnimationFrame(momentumRafRef.current);
            momentumRafRef.current = null;
        }
    }, []);

    const startMomentum = useCallback(
        (initialVelocityPxPerMs) => {
            stopMomentum();
            let velocity = initialVelocityPxPerMs;
            let lastTs = performance.now();

            const tick = () => {
                const now = performance.now();
                const deltaMs = now - lastTs;
                lastTs = now;

                applyFrameDelta(velocity * FRAME_SENSITIVITY * deltaMs);
                velocity *= 0.94; // friction

                if (Math.abs(velocity) < 0.01) {
                    momentumRafRef.current = null;
                    return;
                }

                momentumRafRef.current = requestAnimationFrame(tick);
            };

            momentumRafRef.current = requestAnimationFrame(tick);
        },
        [applyFrameDelta, stopMomentum]
    );

    const handlePointerDown = useCallback(
        (event) => {
            if (!loaded) return;
            stopMomentum();
            isDraggingRef.current = true;
            lastXRef.current = event.clientX;
            lastTimeRef.current = performance.now();
            event.currentTarget.setPointerCapture(event.pointerId);
        },
        [loaded, stopMomentum]
    );

    const handlePointerMove = useCallback(
        (event) => {
            if (!isDraggingRef.current || !loaded) return;
            const now = performance.now();
            const deltaX = event.clientX - lastXRef.current;
            const deltaTime = now - lastTimeRef.current || 1;

            lastXRef.current = event.clientX;
            lastTimeRef.current = now;
            velocityRef.current = deltaX / deltaTime;

            applyFrameDelta(deltaX * FRAME_SENSITIVITY);
        },
        [applyFrameDelta, loaded]
    );

    const handlePointerUp = useCallback(
        (event) => {
            if (!isDraggingRef.current || !loaded) return;
            isDraggingRef.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);

            if (Math.abs(velocityRef.current) > 0.01) {
                startMomentum(velocityRef.current);
            }
        },
        [loaded, startMomentum]
    );

    const handlePointerLeave = useCallback(
        (event) => {
            if (!isDraggingRef.current || !loaded) return;
            isDraggingRef.current = false;
            event.currentTarget.releasePointerCapture(event.pointerId);
        },
        [loaded]
    );

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] overflow-hidden rounded-md bg-[#e4e4e4]"
            >
                <AnimatePresence>
                    {!loaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#e4e4e4] animate-pulse"
                        >
                            <p className="p-4 text-center text-xs">
                                Loading 3D frames...
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full cursor-grab"
                    role="img"
                    aria-label="3D view, drag to rotate"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    onPointerLeave={handlePointerLeave}
                    style={{ touchAction: "none" }}
                />
            </div>
        </div>
    );
}
