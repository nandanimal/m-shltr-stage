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
import Link from "next/link";
import Object3DViewer from "@/components/Object3DViewer";
import AttrCardLg from "@/components/AttrCardLg";

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

            {/* <FadeIn>
                <section
                    className="flex items-center flex-col min-h-screen justify-center pt-48 p-2"
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
            </FadeIn> */}

            <FadeIn>
                <section
                    data-theme="light"
                    className="w-full min-h-screen flex  flex-col justify-center mt-32 p-2"
                >
                    <div className="max-w-6xl m-auto">
                        <h1 className="text-3xl text-regular text-gray mb-4">
                            Introducing CBN
                        </h1>
                        <div className="sm:text-6xl text-3xl mb-32 text-pretty ">
                            Perfect as an ADU or a standalone residence, CBN
                            adapts effortlessly from dense urban lots to open
                            landscapes.
                        </div>
                    </div>

                    <Object3DViewer />

                    <ProductBanner is3d={true} />
                </section>
            </FadeIn>

            <section className="my-32">
                <AttrCardLg />
                <img src="/images/Bedroom2V2.webp" />
            </section>

            <FadeIn>
                <section className="min-h-screen flex items-center flex-col justify-center mt-32">
                    <h2 className="text-3xl text-center leading-none mb-2 max-w-[90%] text-pretty">
                        Built fast meets <strong>built to last.</strong>
                    </h2>
                    <Link
                        href="about"
                        className="mt-8 order-now flex font-mono flex-row gap-2 text-black cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition"
                    >
                        OUR PROCESS
                        <img className="" src="/icons/arrow-up-right.svg" />
                    </Link>
                    <div className="w-full flex items-center justify-center mt-16 p-2">
                        {" "}
                        <BeforeCard
                            rightSrc="/images/xray-shltr-1.webp"
                            leftSrc="/images/xray-shltr-2.webp"
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
