"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

export default function BigCTA({ theme }) {
    const ref = useRef(null);

    let fg, bg;
    if (theme === "dark") {
        fg = "white";
        bg = "black";
    } else {
        fg = "black";
        bg = "white";
    }

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
            className="w-full grid place-items-center modern-padding"
        >
            <div
                className={`max-w-[1440px] rounded-sm bg-${bg} shadow-sm grid grid-cols-8 overflow-hidden`}
            >
                <div className="md:col-span-4 col-span-8 p-4 sm:p-16 flex flex-col ">
                    <span className="type-display-sm text-gray font-dince header-text">
                        Lorem ipsum.
                    </span>
                    <span
                        className={`type-display-sm text-pretty text-${fg} font-dince header-text`}
                    >
                        Dolor seek amit sapien quis.
                    </span>
                    <span className={`type-body-lg mt-4 text-${fg} `}>
                        Sed eleifend sapien eget velit elementum.
                    </span>
                    <div className="mt-8">
                        <CTAButton />
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
