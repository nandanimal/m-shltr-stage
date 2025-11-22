import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import React from "react";

const Custom = () => {
    return (
        <div>
            <section>
                <FadeIn>
                    <div className="min-h-screen flex items-center justify-center bg-gray">
                        <div className="flex flex-col gap-2 p-2">
                            <h1 className="text-3xl">
                                Welcome to Hidden Works
                            </h1>
                            <div className="uppercase text-xs font-mono max-w-xl text-pretty">
                                For those who imagine something entirely their
                                own, Hidden Works is where unconventional ideas
                                take form. We’re looking for projects that
                                challenge what modular can be - an intimate
                                café, an experiential spa, a learning
                                environment, or a singular architectural
                                concept.
                                <br />
                                <br />
                                If your vision pushes boundaries and carries an
                                identity all its own, this is where it belongs.
                                Because M-Shltr’s Hidden Works takes on only a
                                select few custom commissions each year, we ask
                                just one thing: tell us what makes your project
                                impossible to overlook.
                            </div>{" "}
                            <a href="mailto:gordy@m-shltr.com">
                                <div className="cta-button mt-4 max-w-md uppercase leading-none font-mono">
                                    Inquire about Hidden Works
                                </div>
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </section>{" "}
            <Footer />
        </div>
    );
};

export default Custom;
