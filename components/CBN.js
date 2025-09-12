"use client";
import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useInView,
    useTransform,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import SplitType from "split-type";
import Image from "next/image";
import RenderCard from "./RenderCard";
import HorizontalGallery from "./HorizontalGallery";
import Interior from "./Interior";

const CBN = () => {
    const scrollRef = useRef(null);
    const textRef = useRef(null);
    const [wordCount, setWordCount] = useState(0);

    const isInView = useInView(scrollRef, { amount: 0.3, once: true });

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start center", "end center"],
    });

    const modelY = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);

    // Split words on mount
    useEffect(() => {
        if (textRef.current) {
            const split = new SplitType(textRef.current, { types: "words" });
            setWordCount(split.words.length);
        }
    }, []);

    // Active word index MotionValue
    const activeWord = useTransform(
        scrollYProgress,
        [0, 1],
        [0, wordCount || 1]
    );

    // Sync MotionValue → class toggling
    useMotionValueEvent(activeWord, "change", (latest) => {
        const container = textRef.current;
        if (!container) return;
        const words = container.querySelectorAll(".word");
        const activeIndex = Math.floor(latest);

        words.forEach((w, i) => {
            w.classList.toggle("is-active", i <= activeIndex);
        });
    });

    return (
        <section className="min-h-screen">
            {/* Karoake text */}

            <motion.div
                className="w-full p-2 flex items-center justify-center"
                initial="hidden"
                ref={scrollRef}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            >
                <div className="row-container flex flex-col gap-8 sm:flex-row relative justify-center py-48 items-start">
                    {/* Left column */}
                    <motion.div
                        className="col-left sm:w-1/2 h-screen sm:relative relative sm:top-24 w-full flex items-center flex-col hidden sm:block"
                        style={{ height: "fit-content", y: modelY }}
                    >
                        <Image
                            src="/images/cbn_iso.png"
                            width={600}
                            height={600}
                            alt="cbn"
                        />
                        <div className="text-center mt-4">
                            ****** 3d placeholder ******
                        </div>
                    </motion.div>

                    {/* Right column text */}
                    <div
                        ref={textRef}
                        className="karaoke-text col-right sm:w-1/2 w-full max-w-2xl lg:text-3xl text-2xl leading-[1.2] h-auto lg:translate-y-1/2"
                    >
                        M-Shltr creates architect-designed modular homes that
                        combine timeless design with modern efficiency. Every
                        home is crafted with precision, built in weeks instead
                        of years, and designed to stand for generations.
                        <br />
                        <br />
                        Our process blends the artistry of architecture with the
                        intelligence of modular construction. From curated
                        finishes to fully customizable options, we ensure every
                        detail reflects your lifestyle and taste. With M-Shltr,
                        you don’t compromise on design or durability, you gain a
                        home that’s both exceptional and attainable.
                    </div>
                </div>
            </motion.div>

            {/* Gallery */}
            <HorizontalGallery />
            {/* <div className="gallery-container flex flex-col gap-4 items-center justify-center h-[100vh]">
                <div className="mono text-center">CBN IN VIVO</div>
                <motion.div className="track w-full">
                    <div className="row flex flex-row gap-2 w-full overflow-x-scroll">
                        <RenderCard
                            src={"/images/render2.png"}
                            desc={"BIG SUR, CA"}
                        />
                        <RenderCard
                            src={"/images/render2.png"}
                            desc={"MISSOULA, MT"}
                        />
                        <RenderCard
                            src={"/images/render2.png"}
                            desc={"NORTH SHORE, HI"}
                        />
                        <RenderCard
                            src={"/images/render2.png"}
                            desc={"HUDSON VALLEY, NY"}
                        />
                    </div>
                </motion.div>
            </div> */}
            <Interior />
        </section>
    );
};

export default CBN;
