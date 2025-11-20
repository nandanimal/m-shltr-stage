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
        <section
            ref={ref}
            className="w-full min-h-[100vh] grid place-items-center"
        >
            <div className="w-full max-w-6xl p-2 rounded-sm">
                <div className="relative w-full max-w-6xl sm:aspect-[16/9] aspect-[9/16] rounded-sm overflow-hidden p-2">
                    {/* CONTENT */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center flex-col">
                        <div className="text-center sm:text-3xl text-xl text-white p-4 md:max-w-[60ch] mx-auto leading-none">
                            A seamless journey from concept to move-in.
                        </div>
                        <CTAButton text="BUILD WITH M-SHLTR" />
                    </div>

                    {/* IMAGE (parallax) */}

                    <motion.div
                        className="absolute inset-0 z-0"
                        style={{ y: bgY, willChange: "transform" }}
                    >
                        <Image
                            src="/images/render3.png"
                            alt=""
                            fill
                            className="object-cover rounded-md scale-[1.2]"
                            priority
                        />
                    </motion.div>

                    {/* OVERLAY ON TOP OF IMAGE */}
                    <div className="absolute inset-0 bg-black/50 z-10 rounded-sm pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
