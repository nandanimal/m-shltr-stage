import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({
    leftPct = 50,
    bottomPct = 50,
    imgWidth = 0,
    imgHeight = 0,
    textBody = "",
    hideDelay = 180,
}) {
    const [visible, setVisible] = useState(false);
    const hideTimer = useRef(null);

    // Calculate left and bottom in px based on props
    const leftPx = (imgWidth * leftPct) / 100;
    const bottomPx = (imgHeight * bottomPct) / 100;

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

    return (
        <>
            <div
                role="button"
                aria-label="Tooltip trigger"
                className="absolute w-12 bg-white/80 border border-white backdrop-blur-sm rounded-sm shadow cursor-pointer p-1 flex items-center justify-center"
                style={{
                    left: leftPx,
                    bottom: bottomPx,
                }}
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
                        className="absolute z-50 max-w-xs p-2 text-sm bg-white/80 text-black leading-none
                        backdrop-blur-md text-justify rounded-sm shadow-lg pointer-events-auto font-mono uppercase
                        hover:shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition"
                        style={{
                            left: leftPx,
                            bottom: bottomPx + 30, // Offset tooltip above the trigger
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
