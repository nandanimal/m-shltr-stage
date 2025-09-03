"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useScroll as fmUseScroll, useMotionValueEvent } from "framer-motion";

const ScrollContext = createContext({
    // numbers
    y: 0,
    progress: 0,
    vh: 0,
    vw: 0,
    scrollHeight: 1,
    // motion values (placeholders so consumers can destructure safely)
    scrollY: undefined,
    scrollYProgress: undefined,
});

export function ScrollProvider({ children }) {
    // numeric state for React logic / debugging
    const [y, setY] = useState(0);
    const [progress, setProgress] = useState(0);
    const [vh, setVh] = useState(0);
    const [vw, setVw] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(1);

    // Framer Motion MotionValues
    const { scrollY, scrollYProgress } = fmUseScroll();

    // Sync MotionValues -> numeric state (only when they change)
    useMotionValueEvent(scrollY, "change", (v) => {
        if (typeof v === "number") setY(v);
    });

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        if (typeof p === "number") {
            // clamp just in case
            setProgress(Math.min(1, Math.max(0, p)));
        }
    });

    // viewport + document sizing, SSR-safe
    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined")
            return;

        const readDocHeights = () => {
            const doc = document.documentElement;
            const body = document.body;
            const sh = Math.max(
                body.scrollHeight,
                doc.scrollHeight,
                body.offsetHeight,
                doc.offsetHeight,
                body.clientHeight,
                doc.clientHeight
            );
            setScrollHeight(sh || 1);
        };

        const onResize = () => {
            setVh(window.innerHeight || 0);
            setVw(window.innerWidth || 0);
            readDocHeights();
        };

        // initial
        onResize();
        readDocHeights();

        window.addEventListener("resize", onResize);

        const ro = new ResizeObserver(readDocHeights);
        ro.observe(document.body);

        return () => {
            window.removeEventListener("resize", onResize);
            ro.disconnect();
        };
    }, []);

    return (
        <ScrollContext.Provider
            value={{
                // numbers
                y,
                progress,
                vh,
                vw,
                scrollHeight,
                // MotionValues (for direct animation bindings)
                scrollY,
                scrollYProgress,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
}

export const useScroll = () => useContext(ScrollContext);
