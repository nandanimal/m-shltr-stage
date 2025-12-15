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
                    <div className="text-2xl md:text-3xl font-dince text-gray mb-2 md:mb-4 text-pretty">
                        Process overview
                    </div>
                    <h2 className="sm:text-4xl lg:text-6xl text-3xl  text-pretty leading-[1.1] font-dince">
                        Building made{" "}
                        <span className="font-bold">clear and simple.</span>
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
                            <div className="text-3xl font-bold mb-2 font-dince header-text">
                                Integrated design
                            </div>
                            <div className="text-gray text-base ">
                                We begin with a simple conversation to
                                understand your site, goals, and timeline. From
                                there, we review feasibility, visit your
                                property when needed, and map out the clearest
                                path from vision to build-ready design.
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
                            <div className="text-3xl font-bold mb-2 font-dince header-text">
                                Modular Build
                            </div>
                            <div className="text-gray text-base">
                                Once your design is finalized, we handle the
                                details—permits, site preparation, coordination
                                with local officials, and factory construction.
                                Your home is built in a controlled environment
                                for accuracy, efficiency, and consistent quality
                                from start to finish.
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="flex flex-col sm:p-6 sm:border-l border-[#bcb5af]">
                            <img
                                src="/images/plant.webp"
                                alt="Turn-Key icon"
                                className="w-full mb-8 aspect-[16/9] rounded-sm"
                            />
                            <div className="text-3xl font-bold mb-2 font-dince header-text">
                                Turn-Key
                            </div>
                            <div className="text-gray text-base">
                                When fabrication is complete, we manage shipping
                                and on-site installation. Most homes are placed
                                and finished in a matter of days. You receive
                                your keys and step into a fully completed space,
                                ready to enjoy.
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>
        </div>
    );
};

export default ProcessOverview;
