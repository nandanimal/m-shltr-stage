"use client";
import { React, useState, useEffect, useRef } from "react";
import { useScroll } from "@/context/ScrollContext";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import { motion, useTransform } from "framer-motion";
import CTAButton from "./CTAButton";

const HeroMain = () => {
    const { openCta } = useCtaFlow();
    const { y, vh, progress, scrollYProgress } = useScroll();
    const ref = useRef(null);

    const [hero, setHero] = useState(false);

    useEffect(() => {
        if (y > 10 && !hero) {
            setHero(true);
        } else if (y <= 10 && hero) {
            setHero(false);
        }
    }, [y, hero]);

    const bgY = useTransform(scrollYProgress, [0, 1], ["0", "80%"]);
    const mgY = useTransform(scrollYProgress, [0, 1], ["0%", "-110%"]);
    const fgY = useTransform(scrollYProgress, [0, 1], ["0", "-120%"]);

    return (
        <section ref={ref} data-theme="light">
            {/* <div className="text-center  px-8 py-16 flex flex-col gap-4 justify-center items-center">
                <div className="text-xl">
                    2026 build slots are limited. Apply now for early access.
                </div>
                <CTAButton text="APPLY FOR EARLY ACCESS" width="w-fit" />
            </div> */}
            <motion.div
                layout
                initial={false}
                animate={
                    hero
                        ? {
                              padding: "0.5rem",
                              borderRadius: "0.375rem",
                              transition: {
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 30,
                                  restDelta: 0.001,
                              },
                          }
                        : {
                              padding: "0",
                              borderRadius: "0",
                              transition: {
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 30,
                                  restDelta: 0.001,
                              },
                          }
                }
                className="h-screen w-full flex items-center justify-center p-2 overflow-hidden relative "
            >
                {/* Specs */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="absolute z-30 left-10 text-white flex flex-col gap-1 text-sm leading-none bottom-40"
                >
                    <span>
                        <strong>M-SHLTR</strong> /\\ CBN
                    </span>
                    <span>2 BED/2.5 BATH</span>
                    <span className="text-xs">
                        1,172<sup>2</sup> ft
                    </span>
                </motion.div>{" "} */}
                <div className="absolute bottom-20 z-100">
                    <CTAButton />
                </div>
                <div className="image-container w-full h-full relative flex items-center justify-center overflow-hidden rounded-md">
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-10"
                        style={{
                            backgroundImage: "url('/images/hero_bush.webp')",
                            y: fgY,
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 1.1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-20"
                        style={{
                            backgroundImage: "url('/images/hero_main.webp')",
                            y: mgY,
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 1.1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-30"
                        style={{
                            backgroundImage: "url('/images/hero_sky.webp')",
                            y: bgY,
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 1.1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                    >
                        <div className="absolute w-full h-[80svh] top-0 left-0 flex items-center p-2 justify-center flex-col gap-2">
                            {/* <img
                                src="/images/wordmark-white.svg"
                                className=" max-w-[78px]"
                            /> */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { delay: 0.4 },
                                }}
                                className="img-container w-[70%] sm:w-[60%] md:w-[50%] md:mb-16"
                            >
                                {/* <img
                                    src="/images/hero-message.svg"
                                    className="w-full"
                                /> */}
                            </motion.div>
                            <h1 className="text-pretty text-2xl md:text-4xl leading-[103%] max-w-[80%] lg:text-5xl text-center text-white md:max-w-[55%] lg:mb-16 mx-auto px-2">
                                Considered. Crafted.{" "}
                                <span className="font-bold">Complete.</span>
                            </h1>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroMain;
