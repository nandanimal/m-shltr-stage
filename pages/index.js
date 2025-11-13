"use client";
import AttrCard from "@/components/AttrCard";
import CBN from "@/components/CBN";
import Hero from "@/components/Hero";
import Introducing from "@/components/Introducing";
import ModelDetail from "@/components/ModelDetail";
import SpecSection from "@/components/SpecSection";
import BigCTA from "@/components/BigCTA";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Footer from "@/components/Footer";
import ModalCTA from "@/components/ModalCTA";
import HeroHome from "@/components/HeroHome";
import MStudio from "@/components/MStudio";
import ProductBanner from "@/components/ProductBanner";
import BeforeCard from "@/components/BeforeCard";
import FlexibleLayouts from "@/components/FlexibleLayouts";
import FadeIn from "@/components/FadeIn";
import HeroMain from "@/components/HeroMain";

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [ctaOpen, setCTAOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleCTA = () => {
        setCTAOpen(!ctaOpen);
    };

    return (
        <>
            <FadeIn>
                <HeroMain />
            </FadeIn>

            <FadeIn>
                <section
                    className="flex items-center flex-col min-h-screen justify-center pt-48 p-1"
                    data-theme="dark"
                >
                    <div className="font-mono uppercase text-xs">exteriors</div>
                    <h2 className="text-3xl text-center mt-2 mb-8">
                        Designed by the goats,{" "}
                        <strong>customized by you.</strong>
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
            </FadeIn>

            <FadeIn>
                <section
                    data-theme="light"
                    className="w-full min-h-screen flex items-center flex-col justify-center"
                >
                    <h1 className="text-3xl text-center mb-32 p-1">
                        <strong>Introducing CBN.</strong> Perfect as an ADU or a
                        standalone residence, CBN adapts effortlessly from dense
                        urban lots to open landscapes.
                    </h1>
                    <ProductBanner />
                </section>
            </FadeIn>

            <FadeIn>
                <section>
                    <h2 className="text-3xl text-center leading-none mb-2">
                        Built fast meets <strong>built to last.</strong>
                    </h2>
                    <div className="mt-8 order-now flex font-mono flex-row gap-2 text-black cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition">
                        OUR PROCESS
                        <img className="" src="/icons/arrow-up-right.svg" />
                    </div>
                    <div className="w-full flex items-center justify-center mt-16 p-2">
                        {" "}
                        <BeforeCard
                            leftSrc="/images/after.png"
                            rightSrc="/images/before.png"
                            data-theme="light"
                        />
                    </div>
                </section>
            </FadeIn>

            <FlexibleLayouts />

            <BigCTA />

            <Footer />

            {/* Model detail handler */}
            <AnimatePresence>
                {modalOpen && (
                    <ModelDetail
                        toggleHandler={toggleModal}
                        model={"CHMBR"}
                        bb={"1 BED/1 BATH"}
                        sqFt={960}
                        mainImgSrc={"/images/render1.png"}
                        outlineImgSrc={"/images/outline.png"}
                        description={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet ex scelerisque, convallis risus sodales, ullamcorper est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet ex scelerisque, convallis risus sodales, ullamcorper est."
                        }
                    />
                )}
            </AnimatePresence>

            {/* CTA Handler */}
            <AnimatePresence>
                {ctaOpen && <ModalCTA toggleHandler={toggleCTA} />}
            </AnimatePresence>
        </>
    );
}
