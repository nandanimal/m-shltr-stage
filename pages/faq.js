import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import React from "react";
import Head from "next/head";

const faq = () => {
    return (
        <div>
            <Head>
                <title>
                    FAQ | M‑SHLTR Luxury Prefab Homes &amp; ADUs in California
                </title>
                <meta
                    name="description"
                    content="Answers on pricing, customization, permitting, timelines and warranty for M‑SHLTR luxury prefab modular homes in California, from ADUs to hospitality."
                />
            </Head>
            <section
                className="flex items-center justify-center p-2 py-48"
                data-nav-theme="light"
            >
                <FAQ />
            </section>
            <Footer />
        </div>
    );
};

export default faq;
