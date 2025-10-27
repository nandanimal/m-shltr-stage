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

    const bgY = useTransform(scrollYProgress, [0, 1], ["0", "-5%"]);
    const mgY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const fgY = useTransform(scrollYProgress, [0, 1], ["0", "-50%"]);

    return (
        <section ref={ref} data-theme="light">
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-30 left-10 text-white flex flex-col gap-1 text-sm leading-none bottom-40"
                >
                    <span>
                        <strong>M-SHLTR</strong> /\\ CBN
                    </span>
                    <span>1 BED/1 BATH</span>
                    <span className="text-xs">
                        960<sup>2</sup> ft
                    </span>
                </motion.div>{" "}
                <div className="absolute bottom-20 z-100">
                    <CTAButton />
                </div>
                <div className="image-container w-full h-full relative flex items-center justify-center overflow-hidden rounded-md">
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-10"
                        style={{
                            backgroundImage: "url('/images/new-fg.png')",
                            y: fgY,
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                    ></motion.div>
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-20 flex items-center justify-center"
                        style={{
                            backgroundImage: "url('/images/new-mg.png')",
                            y: mgY,
                        }}
                        initial={{ scale: 1 }}
                        animate={{
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                    >
                        {" "}
                        <img
                            src="/images/mg.svg"
                            className="mb-48 opacity-100 hidden sm:block"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-full h-[110vh] bg-cover bg-center -z-30"
                        style={{
                            backgroundImage: "url('/images/new-bg.png')",
                            y: bgY,
                        }}
                    ></motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroMain;
