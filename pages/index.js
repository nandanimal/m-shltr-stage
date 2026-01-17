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
import { useCtaFlow } from "@/context/CtaFlowProvider";
import HeroMain from "@/components/HeroMain";
import Link from "next/link";
import Object3DViewer from "@/components/Object3DViewer";
import AttrCardLg from "@/components/AttrCardLg";
import CTAButton from "@/components/CTAButton";
import ProcessCards from "@/components/ProcessCards";
import Livingroom from "@/components/Livingroom";
import UnlistedSection from "@/components/UnlistedSection";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import ProcessOverview from "@/components/ProcessOverview";
import Head from "next/head";

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const [ctaOpen, setCTAOpen] = useState(false);
    const { openCta } = useCtaFlow();

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const toggleCTA = () => {
        setCTAOpen(!ctaOpen);
    };

    return (
        <>
            <Head>
                <title>
                    Luxury Prefab Modular Homes &amp; ADUs in California |
                    M‑SHLTR
                </title>
                <meta
                    name="description"
                    content="Designed by Malek Alqadi. Luxury prefab modular homes, ADUs and hospitality builds in California. Fire‑resilient, precision‑built, turnkey delivery."
                />
            </Head>
            <FadeIn>
                <section data-nav-theme="dark">
                    <HeroMain />
                </section>
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
                <section className="w-full min-h-screen flex  flex-col justify-center mt-32 relative">
                    <div className="">
                        <FadeIn>
                            <div
                                className="max-w-6xl m-auto mb-16 sm:mb-0 sm:px-12 px-6 header-text"
                                data-nav-theme="light"
                            >
                                <div className="span flex flex-col gap-2">
                                    <div className="font-mono text-xs uppercase">
                                        launching 2026
                                    </div>
                                    <h1 className="type-display text-pretty font-dince">
                                        Introducing M-SHLTR,
                                    </h1>
                                </div>
                                <div className="type-display text-pretty font-dince">
                                    a fire‑resilient, precision‑built home for
                                    any setting. Designed with intention, built
                                    with factory accuracy, delivered turnkey to
                                    your land.
                                </div>
                                <div className="span flex flex-col gap-4 mt-16">
                                    <h2 className="type-title text-regular text-gray text-pretty">
                                        Designed by Malek Alqadi, as seen in
                                    </h2>
                                    <div className="featured-banner flex flex-col gap-0">
                                        {/* <div className="type-eyebrow text-gray mb-2">
                                            FEATURED IN
                                        </div> */}
                                        <div className="press-row gap-4 flex-row flex flex-wrap">
                                            <img
                                                src="/images/press-logos/cn.svg"
                                                alt="Conde Nast"
                                                className="h-[16px] w-auto object-contain"
                                            />
                                            <img
                                                src="/images/press-logos/ad.svg"
                                                alt="Architectural Digest"
                                                className="h-[16px] w-auto object-contain"
                                            />
                                            <img
                                                src="/images/press-logos/dez.svg"
                                                alt="Dezeen"
                                                className="h-[16px] w-auto object-contain"
                                            />
                                            <img
                                                src="/images/press-logos/gq.svg"
                                                alt="GQ"
                                                className="h-[16px] w-auto object-contain"
                                            />
                                            <img
                                                src="/images/press-logos/wallpaper_400.png"
                                                alt="wallpaper"
                                                className="h-[16px] w-auto object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="" data-nav-theme="light">
                        <Object3DViewer />
                    </div>
                </section>
            </FadeIn>

            <section>
                <div className="" data-nav-theme="dark">
                    <Livingroom />
                </div>
                <div
                    className="min-h-[100svh] flex items-center justify-center flex-col"
                    data-nav-theme="light"
                >
                    <ProductBanner is3d={true} />
                </div>
            </section>

            <section className="mb-32 modern-padding" data-nav-theme="dark">
                <AttrCardLg />
                <div className="">
                    <img src="/images/kitchen1.webp" className="rounded-sm" />
                    <div className="grid grid-cols-5 mt-2">
                        <div className="col-span-5 lg:col-span-3">
                            <img
                                src="/images/Kitchen24K.webp"
                                className="rounded-sm"
                            />
                        </div>
                        <div className="lg:flex-col flex lg:gap-0 gap-24 flex-col col-span-5 lg:col-span-2 justify-between modern-padding">
                            <div className="mt-8 md:mt-0">
                                <h2 className="type-eyebrow-lg text-regular text-gray mb-4">
                                    The M-SHLTR Ecosystem
                                </h2>
                                <div className="type-body">
                                    Every M-SHLTR begins with the site: sun,
                                    wind, views, access, and fire exposure. Our
                                    modular framework lets you start simple and
                                    expand over time, while systems are
                                    integrated from day one for performance,
                                    comfort, and resilience.
                                </div>
                            </div>
                            <div className="pricing-container flex flex-col gap-0">
                                <span className="type-eyebrow-lg text-gray">
                                    Starting at
                                </span>
                                <span className="type-h2 text-gray mb-8 mt-2">
                                    $289,000<sup>1</sup>
                                </span>
                                <div
                                    onClick={openCta}
                                    className="w-[fit-content] order-now flex flex-row gap-2 cursor-pointer leading-none items-center justify-center whitespace-nowrap hover:opacity-80 transition font-mono"
                                >
                                    RESERVE A BUILD SLOT
                                    <img
                                        className=""
                                        src="/icons/arrow-up-right.svg"
                                    />
                                </div>{" "}
                                <div className="text-xs text-gray mt-4">
                                    <sup>1</sup>Site work, permits, and delivery
                                    not included.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section data-nav-theme="light">
                <ProcessOverview />
            </section>

            {/* Built fast section */}
            {/* <FadeIn>
                <section className="min-h-screen flex items-center flex-col justify-center mt-32">
                    <h2 className="text-3xl text-center leading-none mb-2 max-w-[90%] text-pretty">
                        Built fast meets <strong>built to last.</strong>
                    </h2>
                    <Link
                        href="/process"
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
            </FadeIn> */}

            {/* Custom section */}
            <section className="bg-[#000]" data-nav-theme="dark">
                <section>
                    <UnlistedSection />
                </section>

                <BigCTA theme={"dark"} />

                <Footer theme={"dark"} />
            </section>

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
