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
import SizeToggleCard from "@/components/SizeToggleCard";
import InteriorTrims from "@/components/InteriorTrims";
import ExteriorTrims from "@/components/ExteriorTrims";

const CBN = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Let the full introducing animation play before fading out the loader
        const INTRO_MS = 2600; // last item finishes ~2.0s; add padding
        const EXIT_BUFFER_MS = 300;
        const timer = setTimeout(
            () => setLoading(false),
            INTRO_MS + EXIT_BUFFER_MS
        );
        return () => clearTimeout(timer);
    }, []);

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
            <section
                data-theme="light"
                className="w-full flex  flex-col justify-center mt-32"
            >
                <div className="max-w-6xl m-auto mb-16 p-2">
                    <h1 className="text-3xl text-regular text-gray mb-4">
                        CBN - MODULE NO. 1172{" "}
                    </h1>
                    <div className="sm:text-4xl lg:text-6xl text-3xl  text-pretty font-dince header-text">
                        Introducing the CBN-MODULE, an integrated approach to
                        your house or hotel.
                    </div>
                    <div className="text-xs font-mono uppercase mt-4">
                        Designed by Studio Malek Alqadi
                    </div>
                </div>
            </section>
            <section className="w-full flex items-center flex-col justify-center">
                {/* <h1 className="text-3xl text-center mb-32">
                    Hero text + accessories laoreet at enim sed and malesuada,
                    laoreet.
                </h1> */}
                <ProductBanner is3d={true} />
            </section>

            {/* <section>
                <SizeToggleCard />
            </section> */}

            {/* <section className="flex items-center flex-col min-h-screen justify-center pt-48 p-2">
                <div className="font-roboto text-xs">Exteriors</div>
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

            <section>
                <div className="img-container modern-padding mb-1">
                    <img
                        src="images/Bedroom1.webp"
                        alt="bedroom view"
                        className="rounded-sm"
                    />
                </div>
                <div className="grid grid-rows-1 modern-padding my-24">
                    <div className="grid grid-cols-3 gap-1">
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/Kitchen24K.webp"
                                alt="kitchen"
                                className="rounded-sm aspect-[4/3] object-cover"
                            />
                            <div className="p-4 text-center">
                                A full kitchen loaded with built-in appliances
                                and pantry wall.
                            </div>
                        </div>
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/Bedroom2V2.webp"
                                alt="Bedroom"
                                className="rounded-sm aspect-[4/3] object-cover"
                            />
                            <div className="p-4 text-center">
                                Each suite comes with an exterior view for
                                natural light, access and privacy.
                            </div>
                        </div>
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/Bath.webp"
                                alt="Bathroom"
                                className="rounded-sm aspect-[4/3] object-cover"
                            />
                            <div className="p-4 text-center">
                                A wet room shower with bathtub, shower head and
                                rain head fixtures.
                            </div>
                        </div>
                    </div>
                    <div className="img-container my-24">
                        <img
                            src="images/kitchen1.webp"
                            alt="Kitchen"
                            className="rounded-sm w-full"
                        />
                    </div>
                </div>
                <InteriorTrims />
                <div className="img-container modern-padding">
                    <img
                        src="images/Living4K.webp"
                        alt="Living room"
                        className="rounded-sm w-full"
                    />
                </div>
            </section>

            {/* Exterior trims section */}
            <section>
                <div className="grid grid-rows-1 modern-padding my-24">
                    <div className="grid grid-cols-3 gap-1">
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/smartlock.jpg"
                                alt="Smart lock"
                                className="rounded-sm aspect-[4/3] object-cover"
                            />
                            <div className="p-4 text-center">
                                Smart lock entry system & camera
                            </div>
                        </div>
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/edge.avif"
                                alt="Hot rolled steel edge"
                                className="rounded-sm aspect-[4/3] object-cover"
                            />
                            <div className="p-4 text-center">
                                Hot rolled black steel edge trim details
                            </div>
                        </div>
                        <div className="img-container aspect-[4/3]">
                            <img
                                src="/images/entrylighting.jpg"
                                alt="Entry lighting"
                                className="rounded-sm aspect-[4/3] object-cover "
                            />
                            <div className="p-4 text-center">
                                Thoughtfully integrated entry lighting
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full lg:h-[50svh] h-[30svh] overflow-hidden modern-padding">
                    <img
                        src="/images/CBN3D/CBN25.webp"
                        alt="CBN"
                        className="
      absolute top-1/2 left-1/2
      sm:w-[150%] max-w-none w-[150%]
      -translate-x-1/2 -translate-y-1/2
      h-auto block
    "
                    />
                </div>

                <ExteriorTrims />
            </section>

            {/* <section className="lg:mt-48">
                <FadeIn>
                    <div className="sm:text-4xl lg:text-6xl text-3xl p-2 mt-48 text-pretty ">
                        Thoughtfully considered interiors from premium finishes
                        to integrated millwork
                    </div>
                    <div className="w-full p-2">
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
                    </div>
                </FadeIn>
            </section> */}
            <SpecSection />

            <BigCTA />

            <Footer />
        </div>
    );
};

export default CBN;
