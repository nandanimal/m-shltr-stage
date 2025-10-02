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
                <h1 className="text-3xl text-center mb-32">
                    Hero text + accessories laoreet at enim sed and malesuada,
                    laoreet.
                </h1>
                <ProductBanner />
            </section>
            <section>
                <CollageGallery />
            </section>
            <section className="flex items-center flex-col min-h-screen justify-center pt-48">
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
            </section>
            <section className="flex items-center flex-col min-h-screen justify-center pt-48">
                <Topdown />
            </section>
            <section>
                <CollageGallery />
            </section>
            <SpecSection />

            <BigCTA />

            <Footer />
        </div>
    );
};

export default CBN;
