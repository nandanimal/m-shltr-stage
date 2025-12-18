import Link from "next/link";
import React from "react";
import FadeIn from "./FadeIn";

const ProcessOverview = () => {
    return (
        <div>
            <section
                className="w-full min-h-screen items-center justify-center flex flex-col"
                data-nav-theme="dark"
            >
                <div className="header-container w-full mb-8  modern-padding header-text">
                    <div className="type-title font-dince text-gray mb-2 md:mb-4 text-pretty">
                        Process overview
                    </div>
                    <h2 className="type-display text-pretty font-dince">
                        From land to keys,{" "}
                        <span className="font-bold">simplified</span>
                    </h2>
                </div>
                <FadeIn>
                    <div className="grid grid-cols-1 p-2 sm:p-0 space-y-24 sm:space-y-0 sm:grid-cols-3 sm:border-t border-[#bcb5af]">
                        {/* Card 1 */}
                        <div className="flex flex-col sm:p-6">
                            <img
                                src="/images/string.webp"
                                alt="Integrated design icon"
                                className="w-full mb-8 aspect-[16/9] rounded-sm"
                            />
                            <div className="type-h2 font-bold mb-2 font-dince header-text">
                                Site review and design
                            </div>
                            <div className="type-body text-gray">
                                We start with your land, goals, and timeline,
                                then map the clearest path to a build-ready
                                plan.
                            </div>
                            <Link
                                className={`cta-button uppercase z-20 font-mono flex flex-row gap-2 mt-8`}
                                href="/about"
                            >
                                Our process
                                <img
                                    className="w-[12px]"
                                    src="/icons/arrow-up-right-white.svg"
                                />
                            </Link>
                        </div>
                        {/* Card 2 */}
                        <div className="flex flex-col sm:p-6 sm:border-l border-[#bcb5af]">
                            <img
                                src="/images/crane.webp"
                                alt="Modular Build icon"
                                className="w-full mb-8 aspect-[16/9] rounded-sm"
                            />
                            <div className="type-h2 font-bold mb-2 font-dince header-text">
                                Factory build
                            </div>
                            <div className="type-body text-gray">
                                We coordinate engineering, permits, and
                                production so your home is built in a controlled
                                environment for accuracy and consistent quality.
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col sm:p-6 sm:border-l border-[#bcb5af]">
                            <img
                                src="/images/plant.webp"
                                alt="Turn-Key icon"
                                className="w-full mb-8 aspect-[16/9] rounded-sm"
                            />
                            <div className="type-h2 font-bold mb-2 font-dince header-text">
                                Delivery and set
                            </div>
                            <div className="type-body text-gray">
                                We manage shipping, set, and finishing so you
                                step into a complete home, ready to live in.
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
};

export default ProcessOverview;
