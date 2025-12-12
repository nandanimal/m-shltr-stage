"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import steps from "@/data/timelineSteps.json";

const AnimatedTimeline = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const totalHeightVh = Math.max((steps?.length || 1) * 120, 120);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (typeof latest !== "number" || !steps.length) return;

        const segment = 1 / steps.length;
        const nextIndex = Math.min(
            steps.length - 1,
            Math.floor(latest / segment + 0.0001)
        );
        if (nextIndex !== activeIndex) {
            setActiveIndex(nextIndex);
        }
    });

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-[#f2f2ee]"
            data-nav-theme="dark"
        >
            <div className="max-w-6xl m-auto px-4 sm:px-6">
                <div
                    className="relative"
                    style={{ height: `${totalHeightVh}vh` }}
                >
                    <div className="sticky top-0 h-screen flex items-center justify-center relative">
                        <div className="flex items-center justify-between absolute bottom-0 w-full text-gray font-mono uppercase text-xs tracking-[0.18em] mb-6">
                            <span>Process Timeline</span>
                            <span className="text-[11px]">
                                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                                {String(steps.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div
                            className="absolute inset-y-12 left-1/2 w-px bg-[#d8d3cf] hidden lg:block z-10"
                            aria-hidden
                        />

                        {steps.map((step, idx) => {
                            const isLeft = idx % 2 === 0;
                            const isActive = idx === activeIndex;

                            return (
                                <motion.div
                                    key={step.id}
                                    className={`absolute inset-0 flex flex-col justify-center lg:flex-row items-center gap-10 sm:gap-0 ${
                                        isLeft ? "" : "lg:flex-row-reverse"
                                    }`}
                                    initial={{ opacity: 0, y: 32 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        y: isActive ? 0 : 12,
                                        transition: {
                                            duration: 0.5,
                                            ease: [0.33, 1, 0.68, 1],
                                        },
                                    }}
                                    style={{
                                        pointerEvents: isActive
                                            ? "auto"
                                            : "none",
                                    }}
                                >
                                    <div className="w-full lg:w-1/2 flex justify-center">
                                        <div
                                            className={`overflow-hidden bg-white  w-full max-w-[560px] aspect-[4/3] ${
                                                isLeft ? "sm:pr-8" : "sm:pl-8"
                                            }`}
                                        >
                                            <Image
                                                src={step.image}
                                                alt={step.title}
                                                width={800}
                                                height={600}
                                                className="w-full h-full object-cover rounded-sm"
                                                priority={idx === 0}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6 max-w-xl">
                                        <div
                                            className={`flex items-center gap-3 w-full ${
                                                isLeft
                                                    ? "lg:justify-start"
                                                    : "lg:justify-end"
                                            }`}
                                        >
                                            {isLeft && (
                                                <div
                                                    className="hidden lg:flex flex-1 h-px bg-[#d8d3cf]"
                                                    aria-hidden
                                                />
                                            )}

                                            {!isLeft && (
                                                <div
                                                    className="hidden lg:flex flex-1 h-px bg-[#d8d3cf]"
                                                    aria-hidden
                                                />
                                            )}
                                        </div>

                                        <div
                                            className={`flex flex-col gap-2 ${
                                                isLeft ? "p-8" : "p-8"
                                            }`}
                                        >
                                            <div className="w-8 h-8 border border-[#d8d3cf] rounded-sm flex items-center justify-center text-xs font-mono text-gray ">
                                                0{idx + 1}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl mt-8 font-semibold text-[#272727] leading-tight">
                                                {step.title}
                                            </h3>
                                            <p className="font-roboto text-xs sm:text-base text-[#272727] leading-relaxed tracking-wide">
                                                {step.description}
                                            </p>
                                            {Array.isArray(step.chips) &&
                                            step.chips.length ? (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {step.chips.map((chip) => (
                                                        <span
                                                            key={chip}
                                                            className="bg-[#e7e3dd] text-[#49433c] font-mono text-[10px] tracking-tight px-2 py-1 rounded-sm"
                                                        >
                                                            {chip}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedTimeline;
