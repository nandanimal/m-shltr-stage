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

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <Hero />
            {/* <Introducing /> */}
            <CBN />

            {/* Finishes */}
            <section className="md:p-4 p-2 flex flex-col items-center justify-center">
                <div className="w-full">
                    <div className="luxury-finishes w-2/3 pb-48 md:w-1/2 flex flex-col justify-end items-end gap-4">
                        <Image
                            src="/images/tub.png"
                            width={150}
                            height={100}
                            className="rounded-sm"
                        />
                        <div className="text-3xl text-right max-w-xl leading-none">
                            Luxury finishes + accessories laoreet at enim sed
                            malesuada, laoreet at enim enim sed malesuada.{" "}
                        </div>
                    </div>
                </div>
                <AttrCard
                    items={{
                        "Attr Name 1": "/images/render1.png",
                        "Attr Name 2": "/images/render2.png",
                        "Attr Name 3": "/images/render3.png",
                    }}
                    initialKey="Attr Name 1"
                />
            </section>

            <SpecSection />

            <BigCTA />

            <Footer />

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
        </>
    );
}
