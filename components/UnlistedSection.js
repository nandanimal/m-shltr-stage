import { React, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import CTAButton from "./CTAButton";
import { useScroll } from "@/context/ScrollContext";

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
            className=""
        >
            <div className="bg-[#000] rounded-sm">
                <img
                    src="/images/m_black_gradient.webp"
                    alt="m-shltr catalog"
                    className=""
                />
                <div className="w-full p-2 text-white text-center flex flex-col gap-2">
                    <span className="font-mono text-sm uppercase ">
                        launching 2026
                    </span>
                    <span className="text-3xl">
                        Module lineup for your house or hotel
                    </span>
                </div>

                {/*  */}
                <div className="p-2">
                    {/* <img src="/images/tent.png" className="rounded-sm" /> */}
                    <div className="grid grid-cols-5 mt-2">
                        <div className="lg:flex-col flex lg:gap-0 gap-24 sm:flex-row flex-col col-span-5 lg:col-span-2 justify-center lg:px-4 py-4">
                            <div className="">
                                <h2 className="text-xl text-regular text-white mb-4">
                                    unlisted dept.
                                </h2>
                                <div className="font-mono text-sm leading-[105%] text-white">
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
                            <div className="pricing-container flex flex-col gap-0 mt-8">
                                <CTAButton text={"inquire"} />
                            </div>
                        </div>

                        <div className="col-span-5 lg:col-span-3">
                            <img
                                src="/images/tentlg.avif"
                                className="rounded-sm"
                            />
                        </div>
                    </div>
                    {/* Press row */}

                    <div className="featured-banner flex flex-col gap-4 p-4 sm:p-16 items-center justify-center w-full">
                        <div className="font-mono w-full uppercase text-gray text-center mb-1 text-xs">
                            FEATURED IN
                        </div>
                        <div className="press-row w-full gap-8 flex-row flex items-center justify-center">
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
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UnlistedSection;
