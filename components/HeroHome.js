"use client";
import Image from "next/image";
import { React, useState, useEffect, useRef } from "react";
import { useScroll } from "@/context/ScrollContext";
import { motion, useTransform } from "framer-motion";

const HeroHome = () => {
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

    // Parallax mappings (tweak to taste)
    // Background moves less (slower)
    const bgY = useTransform(scrollYProgress, [0, 1], ["0", "-10%"]);
    const mgY = useTransform(scrollYProgress, [0, 1], ["-5%", "-12%"]);
    const fgY = useTransform(scrollYProgress, [0, 1], ["0", "-60%"]);

    return (
        <section
            ref={ref}
            className="flex items-center justify-center h-screen"
        >
            <div className="cta-button z-100 absolute bottom-20 sm:bottom-40 mx-auto">
                Order now
            </div>
            <div
                onClick={() => {
                    const nextSection = ref.current.nextElementSibling;
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth" });
                    }
                }}
                className="ml-4 sm:ml-0 absolute bottom-5 sm:right-10 order-now flex flex-row gap-2 text-white cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition"
            >
                LEARN MORE
                <img className="mb-1" src="/icons/arrow-down-gray.svg" />
            </div>
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
                className="h-screen w-full flex items-center justify-center p-2 overflow-hidden relative -z-10"
            >
                {/* <motion.div
                    style={{ y: mgY }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 1, delay: 1 },
                    }}
                    className="absolute z-30 left-10 bottom-10 text-white flex flex-col gap-1 text-sm leading-none"
                >
                    <span>
                        <strong>M-SHLTR</strong> /\\ CBN
                    </span>
                    <span>1 BED/1 BATH</span>
                    <span className="text-xs">
                        960<sup>2</sup> ft
                    </span>
                </motion.div> */}
                {/* <motion.div
                    className="cta-button absolute right-4 bottom-4"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        transition: { duration: 1, delay: 1 },
                    }}
                    style={{ y: mgY }}
                >
                    Get started
                </motion.div> */}
                <div className="image-container w-full h-full relative flex items-center justify-center overflow-hidden rounded-md">
                    <motion.div
                        className="absolute w-full -z-10 h-[110vh] object-cover overflow-hidden"
                        priority
                        initial={{ scale: 1.1 }}
                        animate={{
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 100,
                            },
                        }}
                        style={{ y: fgY }}
                    >
                        <Image
                            src="/images/hero_render.jpeg"
                            className="object-cover h-full rounded-md"
                            priority
                            fill
                            unoptimized={true}
                            quality={100}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-full -z-20 h-[110vh] flex items-center justify-center object-cover overflow-hidden"
                        style={{ y: mgY }}
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
                        <Image
                            src="/images/mg.svg"
                            className="object-contain rounded-md p-4 opacity-70 -translate-y-16 sm:block hidden"
                            fill
                        />
                        <Image
                            src="/images/mg_2.png"
                            className="object-cover rounded-md"
                            fill
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-full -z-30 h-[110vh] object-cover overflow-hidden"
                        style={{ y: bgY }}
                    >
                        <Image
                            src="/images/bg_2.png"
                            className="object-cover h-full rounded-md"
                            fill
                            quality={100}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroHome;
