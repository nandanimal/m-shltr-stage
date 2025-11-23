import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import React from "react";

const faq = () => {
    return (
        <div>
            <section className="flex items-center justify-center p-2 py-48">
                <FAQ />
            </section>
            <Footer />
        </div>
    );
};

export default faq;
