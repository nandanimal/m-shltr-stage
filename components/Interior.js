"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Interior() {
    const containerRef = useRef(null);

    // track scroll progress relative to container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // scale across scroll progress
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 0]);
    const height = useTransform(scrollYProgress, [0.3, 0.7], ["30vh", "60vh"]);

    // Determine label visibility based on scroll progress
    const labelOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            {/* sticky viewport */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <motion.div
                    style={{ scale }}
                    className="flex items-center justify-center w-full h-screen relative max-w-5xl"
                >
                    <motion.div className="text-xl absolute z-20 opacity-1">
                        Some info about the home
                    </motion.div>

                    <motion.div
                        style={{ opacity }}
                        className="fg-img-container w-full h-auto aspect-[16/9]  absolute z-10 "
                    >
                        {/* <Image
                            src="/images/facade.svg"
                            fill={true}
                            priority
                            alt="Facade"
                            className="object-contain p-2  "
                        /> */}
                    </motion.div>
                    <motion.div
                        className="bg-img-container absolute w-full rounded-md p-2 aspect-[24/9] "
                        style={{ height }}
                    >
                        <div className="p-2">
                            <Image
                                src="/images/interior_render.jpeg"
                                fill={true}
                                alt="Interior"
                                className="object-cover rounded-md overflow-hidden "
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        style={{ opacity: labelOpacity }}
                        className="absolute z-30 left-10 text-white flex flex-col gap-1 text-sm leading-none"
                    >
                        <span>
                            <strong>M-SHLTR</strong> /\\ CBN
                        </span>
                        <span>1 BED/1 BATH</span>
                        <span className="text-xs">
                            960<sup>2</sup> ft
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
