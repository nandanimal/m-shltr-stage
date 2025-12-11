import React from "react";
import FadeIn from "./FadeIn";
import HowItWorksCard from "./HowItWorksCard";
import GetStartedCTA from "./GetStartedCTA";

const ProcessCards = () => {
    return (
        <div>
            <FadeIn>
                <section className="p-2">
                    <div className="text-3xl leading-none">
                        <div className="max-w-6xl m-auto px-2">
                            <h1 className="text-3xl text-regular text-gray mb-4">
                                Our Process
                            </h1>
                            <div className="sm:text-6xl text-3xl mb-32 text-pretty ">
                                From first call to move-in, here’s what to
                                expect when working with SHLTR.
                            </div>
                        </div>
                        <div className="text-center w-full"></div>
                        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2">
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
                                    "Your design package is tailored to your site, including 3D visuals, floor plans, and pricing, and finalized for submission to local authorities. "
                                }
                                chips={["10% Reservation Deposit"]}
                            />
                            <HowItWorksCard
                                step={4}
                                title={"Permitting & Final Order"}
                                iconSrc={"/icons/permitting.svg"}
                                delay={0}
                                desc={
                                    "We handle all permitting on your behalf and finalize your order for production. "
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
            </FadeIn>
        </div>
    );
};

export default ProcessCards;
