import React from "react";
import BeforeCard from "@/components/BeforeCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BigCTA from "@/components/BigCTA";
import GetStartedCTA from "@/components/GetStartedCTA";
import MStudio from "@/components/MStudio";
import MStudioStatic from "@/components/MStudioStatic";
import FadeIn from "@/components/FadeIn";
import AnimatedTimeline from "@/components/AnimatedTimeline";

const about = () => {
    return (
        <div data-nav-theme="light">
            <section>
                {" "}
                <MStudioStatic />
            </section>
            {/* <section
                id="about-hero"
                className="w-full min-h-screen py-[40%] md:py-[25%] lg:py-[15%]"
            >
                <div className="font-mono w-full text-center mb-3 uppercase text-sm">
                    How it works
                </div>
                <h1 className="text-3xl text-center leading-none mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing.
                </h1>
                <div className="w-full flex items-center justify-center mt-16 p-2">
                    {" "}
                    <BeforeCard
                        rightSrc="/images/xray-shltr-1.webp"
                        leftSrc="/images/xray-shltr-2.webp"
                    />
                </div>
            </section> */}

            <FadeIn>
                <section className="p-2">
                    <div>
                        <div className="max-w-6xl m-auto">
                            <h1 className="type-h2 text-regular text-gray mb-4">
                                Our Process
                            </h1>
                            <div className="type-display mb-32 text-pretty">
                                From first call to move-in, here’s what to
                                expect when working with SHLTR.
                            </div>
                        </div>
                        <div className="text-center w-full"></div>
                    </div>
                </section>
            </FadeIn>

            <section className="min-h-[100svh]">
                <AnimatedTimeline />
            </section>
            {/* <section className="w-full h-screen flex items-center justify-center p-2 mt-48">
                <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-2 w-full text-3xl h-full">
                    <div className="leading-none flex items-center justify-center">
                        <div className="p-0 lg:p-4">
                            <span className="font-bold ">
                                We only partner with the best.
                            </span>{" "}
                            A curated network of modular specialists who meet
                            our standards and build to local codes - ensuring
                            quality, safety, and timelines stay on track.
                        </div>
                    </div>
                    <div className="h-full rounded-md overflow-hidden object-cover">
                        <img
                            src="/images/partners.png"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section> */}

            {/* <MStudio /> */}

            <div className="my-48">
                <BigCTA />
            </div>

            <Footer />
        </div>
    );
};

export default about;
