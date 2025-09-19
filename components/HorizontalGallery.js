"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RenderCard from "./RenderCard"; // your component

export default function HorizontalGallery() {
    const containerRef = useRef(null);

    // track scroll progress relative to container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // translate X across scroll progress
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
    // ^ -300% = (numCards - 1) * -100%

    return (
        <section ref={containerRef} className="relative h-[200vh] w-full">
            {/* sticky viewport */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="mono text-center mb-4">FEATURES</div>
                <motion.div
                    style={{ x }}
                    className="flex flex-row gap-2 md:gap-4 h-fit"
                >
                    <RenderCard
                        src={"/images/render1.png"}
                        desc={"BIG SUR, CA"}
                    />
                    <RenderCard
                        src={"/images/render2.png"}
                        desc={"MISSOULA, MT"}
                    />
                    <RenderCard
                        src={"/images/render3.png"}
                        desc={"NORTH SHORE, HI"}
                    />
                    <RenderCard
                        src={"/images/render2.png"}
                        desc={"HUDSON VALLEY, NY"}
                    />
                </motion.div>
            </div>
        </section>
    );
}
