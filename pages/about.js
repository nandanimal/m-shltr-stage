import React from "react";
import BeforeCard from "@/components/BeforeCard";
import HowItWorksCard from "@/components/HowItWorksCard";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import BigCTA from "@/components/BigCTA";
import GetStartedCTA from "@/components/GetStartedCTA";
import MStudio from "@/components/MStudio";

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
                        working with SHLTR
                    </div>
                    <div className="mt-24 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2">
                        <HowItWorksCard
                            step={1}
                            title={"Intro Call"}
                            iconSrc={"/icons/phone.svg"}
                            delay={0}
                            desc={
                                "We start with a quick conversation to understand your site, goals, timeline, and budget."
                            }
                        />
                        <HowItWorksCard
                            step={2}
                            title={"On-Site Feasibility Study"}
                            iconSrc={"/icons/onsite.svg"}
                            delay={0}
                            desc={
                                "We meet you at your property to explore your vision, confirm access and utilities, and gather everything needed to begin design."
                            }
                        />
                        <HowItWorksCard
                            step={3}
                            title={"Custom Design Package"}
                            iconSrc={"/icons/design.svg"}
                            delay={0}
                            desc={
                                "Your design package is tailored to your site, including 3D visuals, floor plans, and pricing, and finalized for submission to local authorities. Because requirements vary, we may partner with a local architect to coordinate with building officials and ensure compliance."
                            }
                            chips={["10% Reservation Deposit"]}
                        />
                        <HowItWorksCard
                            step={4}
                            title={"Permitting & Final Order"}
                            iconSrc={"/icons/permitting.svg"}
                            delay={0}
                            desc={
                                "We handle all permitting on your behalf and finalize your order for production. Before fabrication begins, any special requests or custom features are integrated into the engineered package that will produce your CBN home."
                            }
                            chips={["40% Payment upon Contract Signing"]}
                        />
                        <HowItWorksCard
                            step={5}
                            title={"Site Prep & Manufacturing"}
                            iconSrc={"/icons/prep.svg"}
                            delay={0}
                            desc={
                                "We coordinate licensed contractors for site work while your home is built in a vetted factory. Most homes are ready in roughly six months."
                            }
                        />
                        <HowItWorksCard
                            step={6}
                            title={"Shipping & Installation"}
                            iconSrc={"/icons/installation.svg"}
                            delay={0}
                            desc={
                                "With production complete, we confirm shipment and coordinate logistics. Installation typically takes one to seven days, depending on your home’s configuration."
                            }
                            chips={[
                                "30% Payment three weeks before shipping",
                                "20% Final Payment upon delivery",
                            ]}
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

            <MStudio />

            <section className="mt-48 h-fit flex flex-col gap-4 p-2 items-center justify-center relative">
                <FAQ />
            </section>

            <div className="my-48">
                <BigCTA />
            </div>

            <Footer />
        </div>
    );
};

export default about;
