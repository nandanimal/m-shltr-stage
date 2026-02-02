"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";
import CTAMinimal from "./CTAMinimal";

export default function BigCTA({ theme }) {
    const ref = useRef(null);

    const isDark = theme === "dark";
    const fg = isDark ? "text-white" : "text-black";
    const bg = isDark ? "bg-black" : "bg-neutral-200/50";

    // progress: 0 when section enters, 1 when it leaves
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // subtle parallax (image moves slower than scroll)
    const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]); // px

    return (
        <section
            ref={ref}
            className="w-full grid place-items-center modern-padding mb-8 md:mb-0"
        >
            <div
                className={`max-w-[1440px] rounded-sm ${bg} shadow-sm grid grid-cols-8 overflow-hidden`}
            >
                <div className="md:col-span-4 col-span-8 p-4 sm:p-16 flex flex-col ">
                    <div className="flex flex-wrap gap-x-1">
                        <span className="type-display-sm text-gray font-dince header-text">
                            Architectural
                        </span>
                        <span className="type-display-sm text-gray font-dince header-text">
                            calm,
                        </span>
                        <span
                            className={`type-display-sm text-pretty ${fg} font-dince header-text`}
                        >
                            delivered.
                        </span>
                    </div>
                    <span className={`type-body-lg mt-4 ${fg}`}>
                        A modular home with the restraint of a custom build:
                        honest materials, integrated millwork, and light that
                        moves through the day.
                    </span>
                    <div className={`mt-8 ${fg}`}>
                        <CTAMinimal text="reserve a build slot" width="w-fit" />
                    </div>
                </div>
                <div className="md:col-span-4 col-span-8 mt-8 sm:mt-0">
                    <img
                        src="/images/kitchen_detail.webp"
                        className="w-full h-full object-cover"
                        alt="CBN kitchen detail shot"
                    />
                </div>
            </div>
        </section>
    );
}
