"use client";
import Hero from "@/components/Hero";
import Introducing from "@/components/Introducing";
import ProductBanner from "@/components/ProductBanner";
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
                <h1 className="text-3xl text-center">
                    Hero text + accessories laoreet at enim sed and malesuada,
                    laoreet.
                </h1>
                <ProductBanner />
            </section>
        </div>
    );
};

export default CBN;
