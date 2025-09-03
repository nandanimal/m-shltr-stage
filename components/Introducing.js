"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useScroll } from "@/context/ScrollContext";
import Image from "next/image";

const container = {
    hidden: { opacity: 1 }, // keep parent visible; children handle their own timing
    visible: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0 },
    }, // no built-in stagger
};

// Variant as a function -> uses `custom` to compute delay
const item = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
        opacity: 1,

        transition: { delay: i * 0.6, duration: 0.8, ease: "easeOut" },
    }),
};

export default function Introducing() {
    const { y, vh, progress, scrollYProgress } = useScroll();

    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.8, once: false });

    return (
        <section
            ref={ref}
            className="relative h-screen p-2 flex items-center justify-center"
        >
            <motion.div
                className="w-full grid grid-cols-3 gap-4"
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Play order: 1st (custom=0), then 3rd (custom=1), then 2nd (custom=2) */}
                <motion.div
                    variants={item}
                    custom={0}
                    className="flex items-center justify-center"
                >
                    Introducing
                </motion.div>

                <motion.div
                    variants={item}
                    custom={2}
                    className="flex items-center justify-center"
                >
                    <Image
                        src="/images/cbn_iso.png"
                        alt="CBN iso"
                        width={100}
                        height={100}
                    />
                </motion.div>

                <motion.div
                    variants={item}
                    custom={1}
                    className="flex items-center justify-center"
                >
                    CBN
                </motion.div>
            </motion.div>
        </section>
    );
}
