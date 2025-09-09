import React from "react";
import BeforeCard from "@/components/BeforeCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BigCTA from "@/components/BigCTA";
import GetStartedCTA from "@/components/GetStartedCTA";

const about = () => {
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
                    <div className="mt-24 grid grid-rows-4 grid-cols-1 md:grid-rows-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        <HowItWorksCard
                            step={1}
                            title={"Free Intro Call"}
                            iconSrc={"/icons/phone.svg"}
                            delay={0}
                            desc={
                                "We start with a quick conversation to understand your site, goals, timeline, and budget. If it’s a good fit, we’ll walk you through the next steps."
                            }
                        />
                        <HowItWorksCard
                            step={2}
                            title={"On-Site Feasibility Study"}
                            iconSrc={"/icons/onsite.svg"}
                            delay={0}
                            desc={
                                "We meet you at your property to explore your vision and gather everything we need to begin design."
                            }
                        />
                        <HowItWorksCard
                            step={3}
                            title={"Custom Design Package"}
                            iconSrc={"/icons/design.svg"}
                            delay={0}
                            desc={
                                "Within days, we deliver tailored designs based on your site — including 3D visuals, floor plans, and transparent, fixed pricing."
                            }
                        />
                        <HowItWorksCard
                            step={4}
                            title={"Permitting"}
                            iconSrc={"/icons/permitting.svg"}
                            delay={0}
                            desc={
                                "We handle all permitting on your behalf. If permits can’t be approved, you’ll receive a full refund."
                            }
                        />
                        <HowItWorksCard
                            step={5}
                            title={"Site Prep & Manufacturing"}
                            iconSrc={"/icons/prep.svg"}
                            delay={0}
                            desc={
                                "We coordinate licensed contractors for site work while your home is built in a vetted factory. M-shltr manages the entire process — keeping everything on track. Most homes are ready in ~6 months."
                            }
                        />
                        <HowItWorksCard
                            step={6}
                            title={"Onsite Installation"}
                            iconSrc={"/icons/installation.svg"}
                            delay={0}
                            desc={
                                "Installation typically takes just 1 to 7 days depending on how many modules are in your build."
                            }
                        />
                        <HowItWorksCard
                            step={7}
                            title={"Move In!"}
                            iconSrc={"/icons/phone.svg"}
                            delay={0}
                            desc={
                                "Get the keys and start living — your new space is ready."
                            }
                        />

                        <GetStartedCTA />
                    </div>
                </div>
            </section>

            <section className="w-full h-screen flex items-center justify-center p-2 mt-48">
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

export default about;
