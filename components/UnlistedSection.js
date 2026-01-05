import { React, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import CTAButton from "./CTAButton";
import { useScroll } from "@/context/ScrollContext";
import CTAMinimal from "./CTAMinimal";

const UnlistedSection = () => {
    const { y, vh, progress, scrollYProgress } = useScroll();
    const sectionRef = useRef(null);
    const [compact, setCompact] = useState(false);

    // When the bottom of this section hits the viewport bottom, compact the wrapper.
    useEffect(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight =
            typeof window !== "undefined" && window.innerHeight
                ? window.innerHeight
                : vh || 0;
        const atEnd = rect.bottom <= viewportHeight;
        setCompact(atEnd);
    }, [y, vh]);

    return (
        <motion.div
            ref={sectionRef}
            layout
            initial={false}
            animate={
                compact
                    ? {
                          padding: "0rem",
                          borderRadius: "0rem",
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
            className=""
        >
            <div className="bg-[#000] rounded-sm mt-48">
                <img
                    src="/images/m_black_gradient.webp"
                    alt="m-shltr catalog"
                    className=""
                />
                <div className="w-full p-2 text-white text-center flex flex-col gap-2 -mt-8">
                    <span className="type-eyebrow-lg">launching 2026</span>
                    <span className="type-h2 font-dince header-text">
                        A module lineup for home, hospitality, and retreat
                        destinations.
                    </span>
                </div>

                {/*  */}
                <div className="modern-padding">
                    {/* <img src="/images/tent.png" className="rounded-sm" /> */}
                    <div className="grid grid-cols-5 gap-8 mt-2">
                        {/* Image first on mobile; details first on lg */}
                        <div className="col-span-5 lg:col-span-3 order-1 lg:order-2">
                            <img
                                src="/images/tent.png"
                                className="rounded-sm"
                            />
                        </div>
                        <div className="lg:flex-col flex p-4 sm:p-0 lg:gap-0 gap-24 sm:flex-row flex-col col-span-5 lg:col-span-2 justify-center order-2 lg:order-1">
                            <div className="">
                                <h2 className="type-title text-regular text-white mb-4 font-dince header-text">
                                    Studio Malek Alqadi
                                </h2>
                                <div className="type-body text-white">
                                    M-SHLTR designed by Studio Malek Alqadi has
                                    a variety of modules, floor plans,
                                    assemblies and options available. Reach out
                                    to discuss how you can work with us about
                                    your specific needs. ​
                                    <br />
                                    <br />
                                    For those who imagine something entirely
                                    their own, an intimate café, an experiential
                                    spa, a learning environment, or a singular
                                    architectural concept. M-SHLTR grows with
                                    your family and business, as you develop and
                                    expand your day to day, we can curate
                                    modules for placement and growth without
                                    compromising design.
                                </div>
                            </div>
                            <div className="pricing-container text-white flex flex-col gap-0 mt-8">
                                <CTAMinimal
                                    text={"inquire"}
                                    className=""
                                    width={"w-fit"}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Press row */}

                    <div className="featured-banner flex flex-col gap-4 p-4 sm:p-16 items-center justify-center w-full my-24">
                        <div className="type-eyebrow text-gray text-center mb-1 w-full">
                            FEATURED IN
                        </div>
                        <div className="press-row w-full gap-8 flex-row flex items-center justify-center flex-wrap">
                            <img
                                src="/images/press-logos/cn.svg"
                                alt="Conde Nast"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/ad.svg"
                                alt="Architectural Digest"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/dez.svg"
                                alt="Dezeen"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/gq.svg"
                                alt="GQ"
                                className="h-[32px] w-auto object-contain"
                            />
                            <img
                                src="/images/press-logos/wallpaper_400.png"
                                alt="wallpaper"
                                className="h-[32px] w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UnlistedSection;
