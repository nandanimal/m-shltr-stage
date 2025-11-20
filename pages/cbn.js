"use client";
import AttrCard from "@/components/AttrCard";
import CollageGallery from "@/components/CollageGallery";
import Hero from "@/components/Hero";
import Introducing from "@/components/Introducing";
import ProductBanner from "@/components/ProductBanner";
import SpecSection from "@/components/SpecSection";
import BigCTA from "@/components/BigCTA";
import Footer from "@/components/Footer";
import Topdown from "@/components/Topdown";
import { AnimatePresence, motion } from "framer-motion";
import { React, useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import TopdownMobile from "@/components/TopdownMobile";

const CBN = () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 3000);

    return (
        <div>
            <section>
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            className="absolute z-10 w-full h-screen bg-white"
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Introducing />
                        </motion.div>
                    )}
                </AnimatePresence>
                <Hero />
            </section>
            <section className="w-full min-h-screen flex items-center flex-col justify-center">
                {/* <h1 className="text-3xl text-center mb-32">
                    Hero text + accessories laoreet at enim sed and malesuada,
                    laoreet.
                </h1> */}
                <ProductBanner />
            </section>
            <section>
                <FadeIn>
                    <CollageGallery />
                </FadeIn>
            </section>
            {/* <section className="flex items-center flex-col min-h-screen justify-center pt-48 p-2">
                <div className="font-mono uppercase text-xs">exteriors</div>
                <h2 className="text-3xl text-center mt-2 mb-8">
                    Designed by the goats, <strong>customized by you.</strong>
                </h2>
                <AttrCard
                    items={{
                        "Attr Name 1": "/images/render1.png",
                        "Attr Name 2": "/images/render2.png",
                        "Attr Name 3": "/images/render3.png",
                    }}
                    initialKey="Attr Name 1"
                />
            </section> */}

            <section className="flex items-center flex-col min-h-screen justify-center pt-48">
                {/* Show Topdown only on desktop, TopdownMobile only on mobile */}
                <div className="hidden sm:block w-full">
                    <Topdown />
                </div>
                <div className="block sm:hidden w-full">
                    <TopdownMobile />
                </div>
            </section>

            <section className="lg:mt-48">
                <FadeIn>
                    <CollageGallery
                        images={[
                            {
                                src: "/images/Bath.webp",
                                alt: "Bathroom details",
                            },
                            {
                                src: "/images/Bedroom2V2.webp",
                                alt: "View from bedroom",
                            },
                            {
                                src: "/images/Living4k.webp",
                                alt: "Living Room",
                            },
                            {
                                src: "/images/Kitchen24k.webp",
                                alt: "Kitchen",
                            },
                        ]}
                    />
                </FadeIn>
            </section>
            <SpecSection />

            <BigCTA />

            <Footer />
        </div>
    );
};

export default CBN;
