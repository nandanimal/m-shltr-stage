"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "framer-motion";
import { useObject3DViewer } from "@/context/Object3DViewerContext";

const TOTAL_FRAMES = 100;
const ASPECT_RATIO = 16 / 9;
const FRAME_SENSITIVITY = -0.18;
const ZOOM_MULTIPLIER = 0.5;
const BASE_PATH = "/images/CBN3D/";
const BASE_NAME = "CBN";
const EXT = ".webp";

export default function Object3DViewer({ initial = 34 }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const frameCountRef = useRef(TOTAL_FRAMES);
    const frameIndexRef = useRef(
        Math.max(0, Math.min(TOTAL_FRAMES - 1, initial - 1))
    );
    const frameRemainderRef = useRef(0);
    const isDraggingRef = useRef(false);
    const lastXRef = useRef(0);
    const lastTimeRef = useRef(0);
    const velocityRef = useRef(0);
    const momentumRafRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const rafRef = useRef(null);
    const lastScrollProgressRef = useRef(null);

    const { images, loaded, frameCount } = useObject3DViewer();
    const [coverLoaded, setCoverLoaded] = useState(false);

    // Cover image URL for static display while loading
    const coverSrc = `${BASE_PATH}${BASE_NAME}${initial}${EXT}`;

    const drawImage = useCallback((img) => {
        const canvas = canvasRef.current;
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

        ctx.drawImage(img, 0, 0, img.width, img.height, drawX, drawY, drawWidth, drawHeight);
    }, []);

    const drawFrame = useCallback(() => {
        if (!loaded || images.length === 0) return;
        const img = images[frameIndexRef.current];
        if (img) drawImage(img);
    }, [loaded, images, drawImage]);

    const scheduleDraw = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(drawFrame);
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

        if (loaded) scheduleDraw();
    }, [loaded, scheduleDraw]);

    // Setup resize observer once
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(containerRef.current);
        resizeObserverRef.current = observer;

        return () => observer.disconnect();
    }, [resizeCanvas]);

    // Initial draw when loaded
    useEffect(() => {
        if (loaded && images.length > 0) {
            frameCountRef.current = frameCount;
            frameIndexRef.current = Math.max(0, Math.min(frameCount - 1, initial - 1));
            resizeCanvas();
        }
    }, [loaded, images, frameCount, initial, resizeCanvas]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!loaded || isDraggingRef.current) {
            lastScrollProgressRef.current = latest;
            return;
        }
        if (lastScrollProgressRef.current == null) {
            lastScrollProgressRef.current = latest;
            return;
        }
        const delta = latest - lastScrollProgressRef.current;
        lastScrollProgressRef.current = latest;
        if (delta === 0) return;
        applyFrameDelta(delta * TOTAL_FRAMES * 0.25);
    });

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
                {/* Static cover image shown while loading */}
                {!loaded && (
                    <img
                        src={coverSrc}
                        alt="3D view loading"
                        className="absolute inset-0 w-full h-full object-cover overflow-visible"
                        style={{ transform: `scale(${ZOOM_MULTIPLIER})` }}
                        onLoad={() => setCoverLoaded(true)}
                    />
                )}

                {/* Loading placeholder before cover loads */}
                <AnimatePresence>
                    {!loaded && !coverLoaded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/40 animate-pulse"
                        >
                         
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interactive canvas shown when loaded */}
                {loaded && (
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 h-full w-full cursor-grab"
                        style={{ touchAction: "none" }}
                        role="img"
                        aria-label="3D view, drag to rotate"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                        onPointerLeave={handlePointerLeave}
                    />
                )}

                <div className="absolute bottom-0 w-full flex items-center justify-center mb-8 md:mb-16 lg:mb-32">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <img src="icons/rotate-gray.svg" />
                        <div className="type-mono-xs text-gray uppercase">
                            {loaded ? 'drag to rotate' : 'loading...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
