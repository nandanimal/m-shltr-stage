import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Tooltip
 * - Positions by viewport percentages (0–100)
 * - Keeps tooltip on-screen with clamping
 *
 * Props:
 *  - leftPct: number (0–100)  // % of viewport width
 *  - bottomPct: number (0–100) // % of viewport height (from bottom)
 *  - textBody: string
 *  - hideDelay: ms (default 180)
 *  - offset: { x: number, y: number }  // px nudge for the tooltip box
 */
export default function Tooltip({
    leftPct = 50,
    bottomPct = 50,
    textBody = "",
    hideDelay = 180,
    offset = { x: 12, y: -12 },
    maxWidth = 280, // px clamp for tooltip width
}) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ left: 0, bottom: 0 });
    const tooltipRef = useRef(null);
    const hideTimer = useRef(null);

    // --- helpers ---
    const pctToPx = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        // Convert bottom% to px from bottom edge
        const leftPx = (leftPct / 100) * vw;
        const bottomPx = (bottomPct / 100) * vh;
        return { leftPx, bottomPx };
    };

    const handleEnter = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
        setVisible(true);
    };

    const handleLeave = () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), hideDelay);
    };

    // Compute + clamp the tooltip whenever visible, props change, or on resize
    useEffect(() => {
        if (!visible) return;

        const compute = () => {
            const { leftPx, bottomPx } = pctToPx();
            let newLeft = leftPx + offset.x;
            let newBottom = bottomPx + offset.y;

            const pad = 8;
            const vw = window.innerWidth;
            const vh = window.innerHeight;

            // If we can measure the tooltip, clamp precisely
            const rect = tooltipRef.current?.getBoundingClientRect?.() ?? {
                width: maxWidth,
                height: 120,
            };

            // Right/left clamp
            if (newLeft + rect.width > vw - pad)
                newLeft = vw - rect.width - pad;
            if (newLeft < pad) newLeft = pad;

            // Top/bottom clamp (remember we're positioning from bottom)
            const topIfPlaced = vh - (newBottom + rect.height);
            if (topIfPlaced < pad) newBottom = vh - rect.height - pad; // push down (increase bottom)
            if (newBottom < pad) newBottom = pad;

            setPosition({ left: newLeft, bottom: newBottom });
        };

        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, [visible, leftPct, bottomPct, offset.x, offset.y, maxWidth]);

    // Also keep the trigger in the right place (percent → px)
    const triggerStyle = (() => {
        if (typeof window === "undefined") return {};
        const { leftPx, bottomPx } = pctToPx();
        return { left: leftPx, bottom: bottomPx };
    })();

    return (
        <>
            {/* Trigger (viewport-anchored) */}
            <div
                role="button"
                aria-label="Tooltip trigger"
                className="absolute w-12 bg-white/80 border border-white backdrop-blur-sm rounded-sm shadow cursor-pointer p-1 flex items-center justify-center"
                style={triggerStyle}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onFocus={handleEnter}
                onBlur={handleLeave}
                tabIndex={0}
            >
                <img src="icons/arrow-up-right.svg" alt="" />
            </div>

            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={tooltipRef}
                        className="absolute z-50 max-w-xs p-2 text-sm bg-white/80 text-black leading-snug
                       backdrop-blur-md text-justify rounded-sm shadow-lg pointer-events-auto
                       hover:shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition"
                        style={{
                            left: position.left,
                            bottom: position.bottom,
                            maxWidth,
                        }}
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {textBody}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
