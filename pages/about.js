"use client";
import React, { useState } from "react";
import BeforeCard from "@/components/BeforeCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BigCTA from "@/components/BigCTA";

const About = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <div>
            <section
                id="about-hero"
                className="w-full min-h-screen py-[40%] md:py-[25%] lg:py-[15%]"
            >
                <div className="font-mono w-full text-center mb-1">
                    How it works
                </div>
                <h1 className="text-3xl text-center leading-none mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                </h1>
                <div className="w-full flex items-center justify-center mt-16 p-2">
                    {" "}
                    <BeforeCard
                        leftSrc="/images/after.png"
                        rightSrc="/images/before.png"
                    />
                </div>
            </section>

            <section className="p-2">
                <div className="text-3xl leading-none">
                    <div className="text-center w-full">
                        From first call to move-in, here’s what to expect when
                        working with /\\ SHLTR.
                    </div>
                    <div className="mt-24 grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                        <HowItWorksCard
                            step={1}
                            title={"Free Intro Call"}
                            iconSrc={"/icons/phone.svg"}
                            delay={0}
                            desc={
                                "We start with a quick conversation to understand your site, goals, timeline, and budget. If it’s a good fit, we’ll walk you through the next steps."
                            }
                        />

                        <HowItWorksCard />
                        <HowItWorksCard />
                        <HowItWorksCard />
                        <HowItWorksCard />
                        <HowItWorksCard />
                        <HowItWorksCard />
                        <a
                            className="aspect-square leading-none text-3xl text-white font-dince uppercase cursor-pointer rounded-md flex flex-col justify-end bg-cover bg-center relative overflow-hidden"
                            style={{
                                backgroundImage: 'url("/images/render1.png")',
                            }}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <div className="flex flex-row w-full justify-between items-center px-4 py-2 z-30 ">
                                <span>Get started</span>
                                <div className="">
                                    <img
                                        src="/icons/arrow-up-right.svg"
                                        className="max-w-[48px] aspect-square text-white"
                                    />
                                </div>
                            </div>
                            <div
                                className="absolute w-full h-full z-10"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(to top, rgba(0, 0, 0, 1),rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))",
                                }}
                            ></div>
                            <motion.div
                                animate={{ height: hovered ? "100%" : "0%" }}
                                initial={{ height: "0%" }}
                                transition={{
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 80,
                                    damping: 20,
                                }}
                                className="absolute w-full h-full z-20 bg-blue"
                            ></motion.div>
                        </a>
                    </div>
                </div>
            </section>

            <section className="w-full h-screen flex items-center justify-center p-2 mt-48">
                <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2 w-full text-3xl h-full">
                    <div className="leading-none flex items-center justify-center">
                        <div className="p-0 lg:p-4">
                            <span className="font-bold ">
                                We only partner with the best,
                            </span>{" "}
                            lorem ipsum dolor sit amet, consectetur adipiscing
                            lorem.
                        </div>
                    </div>
                    <div className="h-full rounded-md overflow-hidden object-cover">
                        <img
                            src="/images/partners.png"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-48 h-screen flex flex-col gap-4 p-2 items-center justify-center relative">
                <div className="font-mono w-full text-center mb-1">
                    M-STUDIO
                </div>
                <img
                    src="/images/tent.png"
                    alt="tent"
                    className="rounded-md w-full max-w-6xl"
                />
                <h2 className="text-3xl text-center leading-none mt-8">
                    Award winning design made easy.{" "}
                </h2>
                <div className="featured-banner flex flex-col gap-4 absolute bottom-0 p-4 sm:p-16 items-center justify-center">
                    <div className="font-mono w-full uppercase text-gray text-center mb-1">
                        Featured in{" "}
                    </div>
                    <img src="/images/logos.png" className="w-full max-w-4xl" />
                </div>
            </section>

            <section className="mt-48 h-fit mb-48 flex flex-col gap-4 p-2 items-center justify-center relative">
                <FAQ />
            </section>

            <BigCTA />

            <Footer />
        </div>
    );
};

export default About;
