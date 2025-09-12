"use client";
import Image from "next/image";
import { React, useState, useEffect, useRef } from "react";
import { useScroll } from "@/context/ScrollContext";
import { motion, useTransform } from "framer-motion";

const Hero = () => {
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
    const bgY = useTransform(scrollYProgress, [0, 1], ["0", "40%"]);
    const mgY = useTransform(scrollYProgress, [0, 1], ["-10%", "-12%"]);
    const fgY = useTransform(scrollYProgress, [0, 1], ["0", "20%"]);

    return (
        <section ref={ref}>
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
                <div className="image-container w-full h-full relative flex items-center justify-center overflow-hidden rounded-md">
                    <motion.div
                        className="absolute w-full -z-10 h-[110vh] object-cover overflow-hidden"
                        priority
                        style={{ y: fgY }}
                    >
                        <Image
                            src="/images/fg_slate.png"
                            className="object-cover h-full rounded-md"
                            priority
                            fill
                            quality={100}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-full -z-20 h-[110vh] flex items-center justify-center object-cover overflow-hidden"
                        style={{ y: mgY }}
                    >
                        <Image
                            src="/images/mg.png"
                            className="object-contain rounded-md p-4"
                            fill
                        />
                    </motion.div>
                    <motion.div
                        className="absolute w-full -z-30 h-[110vh] object-cover overflow-hidden"
                        style={{ y: bgY }}
                    >
                        <Image
                            src="/images/sky_slate.png"
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

export default Hero;
