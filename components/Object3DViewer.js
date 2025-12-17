"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_FRAMES = 100;
const BASE_PATH = "/images/CBN3D/";
const BASE_NAME = "CBN";
const EXT = ".webp";
const INITIAL_FRAME_NUMBER = 34;
const ASPECT_RATIO = 16 / 9;
const FRAME_SENSITIVITY = -0.18;
const ZOOM_MULTIPLIER = 0.5;
const LOG_PREFIX = "[Object3DViewer]";

export default function Object3DViewer({ initial = 34 }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCountRef = useRef(TOTAL_FRAMES);
    const frameIndexRef = useRef(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, initial - 1))
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
    const loadedRef = useRef(false);

    const [loaded, setLoaded] = useState(false);

    const drawFrame = useCallback(() => {
        console.log("loadedRef.current >>>", loadedRef.current);

        if (!loadedRef.current) return;

        console.log("drawing frame");

        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIndexRef.current];
        if (!canvas || !img) return;

        const ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio || 1;
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

        if (process.env.NODE_ENV !== "production") {
            if (canvas.__lastLoggedIndex !== frameIndexRef.current) {
                canvas.__lastLoggedIndex = frameIndexRef.current;
            }
        }
    }, []);

    const scheduleDraw = useCallback(() => {
        console.log("drawRequestedRef >>>", drawRequestedRef.current);
        // if (drawRequestedRef.current) return;
        drawRequestedRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
            drawRequestedRef.current = false;
            drawFrame();
        });
    }, [drawFrame]);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const width = container.clientWidth;
        const height = width / ASPECT_RATIO;
        const dpr = window.devicePixelRatio || 1;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        scheduleDraw();
    }, [scheduleDraw]);

    /**
     * 🔥 FIXED PRELOAD FUNCTION
     * Always forces decode, even when cached.
     * Does NOT filter out missing frames (keeps index alignment).
     */
    async function loadFrame(src) {
        const img = new Image();
        img.src = src;

        await new Promise((resolve) => {
            const done = () => resolve();

            if (img.complete) {
                if (img.decode) img.decode().then(done).catch(done);
                else done();
            } else {
                img.onload = () => {
                    if (img.decode) img.decode().then(done).catch(done);
                    else done();
                };
                img.onerror = done;
            }
        });

        return img;
    }

    useEffect(() => {
        let isCancelled = false;

        // Reset state on mount to avoid stale refs after client-side navigation.
        imagesRef.current = [];
        frameCountRef.current = TOTAL_FRAMES;
        frameIndexRef.current = Math.max(
            0,
            Math.min(TOTAL_FRAMES - 1, initial - 1)
        );
        frameRemainderRef.current = 0;
        setLoaded(false);
        loadedRef.current = false;

        (async () => {
            const cacheBust = Date.now();

            const frames = await Promise.all(
                Array.from({ length: TOTAL_FRAMES }, (_, idx) =>
                    loadFrame(
                        `${BASE_PATH}${BASE_NAME}${
                            idx + 1
                        }${EXT}?reload=${performance.now()}`
                    )
                )
            );

            if (isCancelled) return;

            imagesRef.current = frames;
            frameCountRef.current = frames.length;

            // Force a redraw once frames decode
            requestAnimationFrame(() => {
                loadedRef.current = true;
                setLoaded(true);
                scheduleDraw();
            });
        })();

        return () => {
            isCancelled = true;
        };
    }, [scheduleDraw]);

    useEffect(() => {
        if (!containerRef.current) return;
        resizeCanvas();

        resizeObserverRef.current = new ResizeObserver(resizeCanvas);
        resizeObserverRef.current.observe(containerRef.current);

        return () => resizeObserverRef.current?.disconnect();
    }, [resizeCanvas]);

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
            const whole = Math.trunc(frameRemainderRef.current);
            if (whole === 0) return;
            frameRemainderRef.current -= whole;

            frameIndexRef.current =
                (frameIndexRef.current + whole + frameCountRef.current) %
                frameCountRef.current;

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
        (velocity) => {
            stopMomentum();
            let v = velocity;
            let last = performance.now();

            const tick = () => {
                const now = performance.now();
                const dt = now - last;
                last = now;

                applyFrameDelta(v * FRAME_SENSITIVITY * dt);
                v *= 0.94;

                if (Math.abs(v) < 0.01) {
                    momentumRafRef.current = null;
                    return;
                }

                momentumRafRef.current = requestAnimationFrame(tick);
            };

            momentumRafRef.current = requestAnimationFrame(tick);
        },
        [applyFrameDelta, stopMomentum]
    );

    const handlePointerDown = (e) => {
        if (!loaded) return;
        stopMomentum();
        isDraggingRef.current = true;
        lastXRef.current = e.clientX;
        lastTimeRef.current = performance.now();
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current || !loaded) return;

        const now = performance.now();
        const dx = e.clientX - lastXRef.current;
        const dt = now - lastTimeRef.current || 1;

        lastXRef.current = e.clientX;
        lastTimeRef.current = now;
        velocityRef.current = dx / dt;

        applyFrameDelta(dx * FRAME_SENSITIVITY);
    };

    const handlePointerUp = (e) => {
        if (!isDraggingRef.current || !loaded) return;
        isDraggingRef.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);

        if (Math.abs(velocityRef.current) > 0.01) {
            startMomentum(velocityRef.current);
        }
    };

    const handlePointerLeave = (e) => {
        if (!isDraggingRef.current || !loaded) return;
        isDraggingRef.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div className="w-full flex flex-col items-center gap-4">
            <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] overflow-hidden rounded-md"
            >
                <AnimatePresence>
                    {!loaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#e4e4e4] animate-pulse"
                        >
                            <p className="p-4 text-center type-caption">
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
                <div className="absolute bottom-0 w-full flex items-center justify-center mb-8 md:mb-16 lg:mb-32">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <img src="icons/rotate-gray.svg" />
                        <div className="type-mono-xs text-gray uppercase">
                            drag to rotate
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
