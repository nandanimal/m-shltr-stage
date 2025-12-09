"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CTAButton from "./CTAButton";

export default function BigCTA() {
    const ref = useRef(null);

    // progress: 0 when section enters, 1 when it leaves
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // subtle parallax (image moves slower than scroll)
    const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]); // px

    return (
        <section ref={ref} className="w-full grid place-items-center p-2">
            <div className="max-w-[1440px] rounded-sm bg-[#000] shadow-sm grid grid-cols-8 overflow-hidden">
                <div className="md:col-span-4 col-span-8 p-16 flex flex-col ">
                    <span className="text-5xl text-gray">Lorem ipsum.</span>
                    <span className="text-5xl text-pretty text-white">
                        Dolor seek amit sapien quis.
                    </span>
                    <span className="font-mono uppercase text-xs mt-4 text-white">
                        Sed eleifend sapien eget velit elementum.
                    </span>
                    <div className="mt-8">
                        <CTAButton />
                    </div>
                </div>
                <div className="md:col-span-4 col-span-8 mt-8 sm:mt-0">
                    <img
                        src="/images/cbn_detail.webp"
                        className="w-full h-full object-cover"
                        alt="CBN detail shot"
                    />
                </div>
            </div>
        </section>
    );
}
