// components/MediaRevealPinned.js
"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";

export default function BeforeCard({
    leftSrc,
    rightSrc,
    altLeft = "Before",
    altRight = "After",
    className = "",
}) {
    const ref = useRef(null);
    const [split, setSplit] = useState(0.2); // 0..1 from left

    const move = (x, y) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const p = Math.min(1, Math.max(0, (x - r.left) / r.width));
        setSplit(p);
    };

    const splitMotion = useMotionValue(split);

    const blur = useTransform(splitMotion, [0, 1], ["0px", "100px"]);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden w-full max-w-[1600px] rounded-sm cursor-col-resize ${className}`}
            style={{ aspectRatio: "16 / 9" }}
            onMouseMove={(e) => move(e.clientX, e.clientY)}
            onTouchStart={(e) =>
                move(e.touches[0].clientX, e.touches[0].clientY)
            }
            onTouchMove={(e) =>
                move(e.touches[0].clientX, e.touches[0].clientY)
            }
        >
            {/* UNDERLAY: full-size and pinned */}
            <motion.img
                src={leftSrc}
                alt={altLeft}
                style={blur}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none "
            />

            {/* OVERLAY: full-size; we reveal with clip-path (not width) */}
            <motion.div
                className="absolute inset-0"
                // clip-path: inset(top right bottom left)
                animate={{ clipPath: `inset(0 0 0 ${split * 100}%)` }}
                transition={{
                    type: "tween",
                    duration: 0.12,
                    ease: "easeOut",
                }}
            >
                <img
                    src={rightSrc}
                    alt={altRight}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                />
            </motion.div>

            {/* HANDLE */}
            <motion.div
                className="absolute top-0 bottom-0 w-px bg-white/90"
                style={{ left: `${split * 100}%` }}
                transition={{
                    type: "tween",
                    duration: 0.12,
                    ease: "easeOut",
                }}
            >
                <div className="absolute h-full flex items-center justify-center -left-2">
                    <div className="bg-white/90 w-4 h-2 rounded-xs"></div>
                </div>
            </motion.div>
        </div>
    );
}
