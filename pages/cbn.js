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
import { React, useEffect, useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";
import TopdownMobile from "@/components/TopdownMobile";
import SizeToggleCard from "@/components/SizeToggleCard";
import InteriorTrims from "@/components/InteriorTrims";
import ExteriorTrims from "@/components/ExteriorTrims";
import GalleryHeader from "@/components/GalleryHeader";
import Head from "next/head";

const CBN = () => {
    const [loading, setLoading] = useState(true);
    const bodyOverflowRef = useRef(null);
    const htmlOverflowRef = useRef(null);
    const modelOptions = [
        {
            key: "CBN 1172",
            label: "1172 ft²",
            floorplan: "/images/floorplan_updated.webp",
            floorplanMobile: "/images/floorplan_updated_rotated.webp",
            tooltips: [
                {
                    textBody: "Integrated bed and sofa",
                    leftPct: 22,
                    bottomPct: 25,
                },
                {
                    textBody: "Utility cabinet + tankless water heater",
                    leftPct: 32,
                    bottomPct: 64,
                },
                {
                    textBody:
                        "Living and dining areas with built-in seating and twin xl beds",
                    leftPct: 38,
                    bottomPct: 20,
                },
                {
                    textBody: "Sliding glass doors and covered terrace",
                    leftPct: 20,
                    bottomPct: 75,
                },
                {
                    textBody: "Built-in appliance island",
                    leftPct: 52,
                    bottomPct: 55,
                },
                {
                    textBody: 'Standard 24" dishwasher with white oak facade',
                    leftPct: 40,
                    bottomPct: 68,
                },
                {
                    textBody:
                        'Spa ensuite with a 63" × 56" shower and soaking tub. Optional steam shower upgrade.',
                    leftPct: 85,
                    bottomPct: 68,
                },
                {
                    textBody: "Optimized wardrobe and 11' storage wall",
                    leftPct: 87,
                    bottomPct: 45,
                },
                {
                    textBody: "Separate en-suite toilets / W.C.",
                    leftPct: 8,
                    bottomPct: 18,
                },
                { textBody: "Laundry", leftPct: 34, bottomPct: 80 },
            ],
            tooltipsMobile: [
                {
                    textBody: "Custom king bed and headboard",
                    leftPct: 80,
                    bottomPct: 80,
                },
                {
                    textBody:
                        "Living and dining areas with built-in seating and twin xl beds",
                    leftPct: 58,
                    bottomPct: 25,
                },
                {
                    textBody: "Sliding glass doors and covered terrace",
                    leftPct: 20,
                    bottomPct: 85,
                },
                {
                    textBody: "Built-in appliance island",
                    leftPct: 44,
                    bottomPct: 50,
                },
                {
                    textBody: 'Standard 24" dishwasher with white oak facade',
                    leftPct: 34,
                    bottomPct: 62,
                },
                {
                    textBody:
                        'Spa ensuite with a 63" × 56" shower and soaking tub. Optional steam shower upgrade.',
                    leftPct: 25,
                    bottomPct: 5,
                },
                {
                    textBody: "Optimized wardrobe and 11' storage wall",
                    leftPct: 55,
                    bottomPct: 86,
                },
                {
                    textBody: "Separate en-suite toilets / W.C.",
                    leftPct: 80,
                    bottomPct: 10,
                },
                { textBody: "Laundry", leftPct: 18, bottomPct: 34 },
            ],
        },
        {
            key: "CBN 640",
            label: "640 ft²",
            floorplan: "/images/640_treated.webp",
            floorplanMobile: "/images/640_treated_rotated.webp",
            tooltips: [
                {
                    textBody: "Panel Ready 24\" dishwasher",
                    
                    leftPct: 49,
                    bottomPct: 66,
                },
                {
                    textBody: "Built-in cooktop",
                    leftPct: 53,
                    bottomPct: 68,
                },
                {
                    textBody: "Laundry",
                    leftPct: 65,
                    bottomPct: 65,
                },
                {
                    textBody: "Sliding glass doors",
                    leftPct: 14,
                    bottomPct: 72,
                },
                {
                    textBody: "Living and dining areas with built-in seating and twin xl beds",
                    leftPct: 55,
                    bottomPct: 39,
                },
                {
                    textBody: "Integrated queen bed",
                    leftPct: 78,
                    bottomPct: 42,
                },
                { textBody: "Utility cabinet + tankless water heater", leftPct: 34, bottomPct: 72 },
                { textBody: "Separe en-suite water closet", leftPct: 27, bottomPct: 29 },
                { textBody: "Home/work office option", leftPct: 23, bottomPct: 45 },
            ],
            tooltipsMobile: [
                {
                    textBody: "Panel Ready 24\" dishwasher",
                    
                    leftPct: 28,
                    bottomPct: 48,
                },
                {
                    textBody: "Built-in cooktop",
                    leftPct: 26,
                    bottomPct: 52,
                },
                {
                    textBody: "Laundry",
                    leftPct: 30,
                    bottomPct: 62,
                },
                {
                    textBody: "Sliding glass doors",
                    leftPct: 23,
                    bottomPct: 15,
                },
                {
                    textBody: "Living and dining areas with built-in seating and twin xl beds",
                    leftPct: 55,
                    bottomPct: 55,
                },
                {
                    textBody: "Integrated queen bed",
                    leftPct: 50,
                    bottomPct: 75,
                },
                { textBody: "Utility cabinet + tankless water heater", leftPct: 25, bottomPct: 34 },
                { textBody: "Separe en-suite water closet", leftPct: 70, bottomPct: 29 },
                { textBody: "Home/work office option", leftPct: 50, bottomPct: 20 },
            ],
        },
    ];
    const [activeModelKey, setActiveModelKey] = useState(modelOptions[0].key);
    const activeModel =
        modelOptions.find((model) => model.key === activeModelKey) ||
        modelOptions[0];

    useEffect(() => {
        // Skip loading animation if already played this session or scrolled down
        const hasPlayed = sessionStorage.getItem("cbn-intro-played");
        if (hasPlayed || window.scrollY > 100) {
            setLoading(false);
            return;
        }

        // Let the full introducing animation play before fading out the loader
        const INTRO_MS = 4000; // last item finishes ~2.0s; add padding
        const EXIT_BUFFER_MS = 300;
        const timer = setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("cbn-intro-played", "true");
        }, INTRO_MS + EXIT_BUFFER_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        if (!body || !html) return;

        if (loading) {
            if (bodyOverflowRef.current === null) {
                bodyOverflowRef.current = body.style.overflow;
            }
            if (htmlOverflowRef.current === null) {
                htmlOverflowRef.current = html.style.overflow;
            }
            body.style.overflow = "hidden";
            html.style.overflow = "hidden";
        } else {
            if (bodyOverflowRef.current !== null) {
                body.style.overflow = bodyOverflowRef.current;
            }
            if (htmlOverflowRef.current !== null) {
                html.style.overflow = htmlOverflowRef.current;
            }
        }

        return () => {
            if (bodyOverflowRef.current !== null) {
                body.style.overflow = bodyOverflowRef.current;
            }
            if (htmlOverflowRef.current !== null) {
                html.style.overflow = htmlOverflowRef.current;
            }
        };
    }, [loading]);

    const modelToggle = (
        <>
            <div className="type-eyebrow text-gray">Available in 2 sizes</div>
            <div className="flex items-center gap-2 bg-white/70 border border-white/20 rounded-full p-1 backdrop-blur-sm">
                {modelOptions.map((model) => {
                    const isActive = model.key === activeModelKey;
                    return (
                        <button
                            key={model.key}
                            type="button"
                            onClick={() => setActiveModelKey(model.key)}
                            className={`px-4 py-1 rounded-full type-caption font-medium transition ${
                                isActive
                                    ? "bg-black text-white"
                                    : "bg-transparent text-black/70 hover:text-black cursor-pointer"
                            }`}
                        >
                            {model.label}
                        </button>
                    );
                })}
            </div>
        </>
    );

    return (
        <div>
            <Head>
                <title>
                    CBN No. 1172 | Luxury Prefab ADU &amp; Modular Home |
                    M‑SHLTR
                </title>
                <meta
                    name="description"
                    content="Explore CBN No. 1172: a 2 bed / 2.5 bath luxury modular home designed to expand. Premium interiors and fire‑resilient detailing for California living."
                />
            </Head>
            <section>
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            className="absolute z-20 w-full h-screen bg-white"
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
                data-nav-theme="light"
                className="w-full flex  flex-col justify-center mt-32 modern-padding"
            >
                <div className="max-w-6xl m-auto mb-16">
                    <h1 className="type-h2 text-regular text-gray mb-4">
                        CBN NO. 1172{" "}
                    </h1>
                    <div className="type-display text-pretty font-dince header-text">
                        A two‑bed flagship module designed to expand from a
                        quiet retreat to a full-time home or boutique suite.
                    </div>
                    {/* <div className="text-body mt-8">
                        This cabin module comes in two sizes 640 sqft and 1172
                        sqft structures that offer an architecturally designed 2
                        bed 2 bath modules that can support your vision for
                        starter home, a guest house, or a standalone short term
                        rental for sustainable living.
                    </div> */}
                    <div className="type-eyebrow mt-8">
                        Designed by Studio Malek Alqadi
                    </div>
                </div>
            </section>
            <section className="w-full flex items-center flex-col justify-center overflow-hidden">
                <ProductBanner is3d={true} explore={false} />
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

            <section
                className="flex items-center flex-col min-h-screen justify-center pt-48"
                data-nav-theme="light"
            >
                {/* Show Topdown only on desktop, TopdownMobile only on mobile */}
                <div className="hidden sm:block w-full">
                    <Topdown
                        modelName={activeModel.key}
                        floorplan={activeModel.floorplan}
                        tooltips={activeModel.tooltips}
                        controls={modelToggle}
                    />
                </div>
                <div className="block sm:hidden w-full">
                    <TopdownMobile
                        modelName={activeModel.key}
                        floorplan={activeModel.floorplanMobile}
                        tooltips={activeModel.tooltipsMobile}
                        controls={modelToggle}
                    />
                </div>
            </section>

            <GalleryHeader
                title={"THE CBN EXPERIENCE"}
                body={
                    "The M-SHLTR experience is a sanctuary of quiet luxury, grounded in a symmetry-based wabi-sabi aesthetic that balances architectural order with organic warmth. Defined by rigorous clean lines and expansive openings, the structure dissolves the boundaries between SHLTR and landscape, allowing light and nature to become primary materials. The interior is a seamless composition of integrated millwork and tactile finishes, curated in a subtle, monochromatic palette that evokes the meditative serenity of a wellness retreat. It is a space where precision meets peace—a grounded environment designed not just to be looked at, but to be deeply felt."
                }
            />

            <section>
                <div
                    data-nav-theme="dark"
                    className="img-container modern-padding flex flex-col gap-2"
                >
                    <img
                        src="images/cbn_alt.webp"
                        alt="CBN with conversation pit"
                        className="rounded-sm"
                    />
                    <div className="flex flex-row gap-2 w-full max-w-full overflow-x-auto">
                        <div className="flex-1 min-w-0">
                            <img
                                src="images/cbn_detail.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <img
                                src="images/cbn_gallery/cbn_3.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover aspect-square h-full max-w-full"
                            />
                        </div>
                    </div>
                    <div className="text-xs mt-4 sm:max-w-1/2 text-gray">
                        The CBN modules open living areas dissolve boundaries
                        through expansive floor-to-ceiling windows and glass
                        sliding doors, inviting seamless connection with the
                        surrounding landscape.
                    </div>
                </div>
            </section>

            <GalleryHeader
                title={"A PLAN THAT ADAPTS"}
                body={
                    "The CBN Module embodies an architectural design between the SHLTRs interiors and its surrounding environment. Offered in an expansive 1,172 sq ft configuration or a more intimate 640 sq ft layout. Whether shared with  companions or embraced in solitary reflection, this architecturally refined modules inspires a gentle pause—to breathe deeply and immerse fully in a starter home, a guest house or even as a hotel suite for personal or business use."
                }
            />

            <section>
                <div
                    data-nav-theme="dark"
                    className="img-container modern-padding flex flex-col gap-2"
                >
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_26.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/Living4K.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/Kitchen24K.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_14.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_16.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/cbn_17.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="text-xs mt-4 sm:max-w-1/2 text-gray">
                        A seamless open-plan design unites kitchen, dining, and
                        living spaces in a seamless flow. Expansive
                        floor-to-ceiling glazing quietly frames the
                        ever-changing landscape, while carefully chosen natural
                        materials—warm wood, soft stone, subtle
                        textures—cultivate an atmosphere of profound calm and
                        understated harmony.
                    </div>
                </div>
            </section>

            <GalleryHeader
                title={"GATHERING RITUALS"}
                body={
                    "The kitchen experience of this space is framed by expansive openings for optimal views. The full kitchen, with its retracting doors, and equipped island allow for shared meals to become moments of connection. A floating, wall-to-wall counter, distinguished by a deeply appointed sink. Every element, from the built-in furnishings to the thoughtful placement of the living area within the bedroom suite, is curated to enhance the sense of effortless dwelling."
                }
            />

            <section>
                <div
                    data-nav-theme="dark"
                    className="img-container modern-padding flex flex-col gap-2"
                >
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_20.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/kitchen1.webp"
                                alt="CBN kitchen shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/Closet.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_6.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/Pantry.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/kitchen_detail.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="text-xs mt-4 sm:max-w-1/2 text-gray">
                        Left – A counter-level appliance garage, strategically
                        placed power, deep drawer storage, and accessible open
                        shelving serve every culinary need; Right – Designed for
                        effortless use, the all-encompassing kitchen island
                        thoughtfully conceals essential functions: a hidden
                        hood, integrated cooktop, and discreet surface outlets,
                        complemented by a concealed dishwasher, oven, dedicated
                        utensil drawers, and concealed waste bins. Every element
                        serves its purpose, yet remains out of sight.
                    </div>
                </div>
            </section>

            <GalleryHeader
                title={"PRIVATE SANCTUARIES"}
                body={
                    "The bedroom suites are located either on either end of the CBN Module, offering views of the surrounding environment. Paying homage to the traditional wabi sabi aesthetic, the suites feature natural woods, floor-to-ceiling doors, built in floor to ceiling cabinetry. A serene bedroom and seating space experience. The  suites can be outfitted as dual master suites or one can be a home office."
                }
            />

            <section>
                <div
                    data-nav-theme="dark"
                    className="img-container modern-padding flex flex-col gap-2"
                >
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_10.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/Bedroom.webp"
                                alt="CBN kitchen shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/cbn_15.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_22.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-1 h-full">
                            <img
                                src="images/cbn_gallery/cbn_8.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-4 h-full">
                            <img
                                src="images/Bedroom2V2.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="text-xs mt-4 sm:max-w-1/2 text-gray">
                        Left – Each suite with an exterior view for natural
                        light, access and privacy. Right – Every detail is
                        considered—from the placement of furniture and the
                        discreet pivot TV mount to the dedicated closet space
                        within each private suite.
                    </div>
                </div>
            </section>

            <GalleryHeader
                title={"A SPACE FOR RENEWAL"}
                body={
                    "A dedicated wet room envelops the senses, featuring a rain shower alongside a deep soaking tub—spaces crafted for  restorative calm. Discreetly separated, a private water closet ensures utmost privacy, while a natural stone and warm woods vanity, invites mindful daily rituals in a serene atmosphere."
                }
            />

            <section>
                <div
                    data-nav-theme="dark"
                    className="img-container modern-padding flex flex-col gap-2"
                >
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_7.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/Restroom.webp"
                                alt="CBN kitchen shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/cbn_15.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_13.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 w-full max-w-full">
                        <div className="min-w-0 col-span-2 h-full">
                            <img
                                src="images/cbn_gallery/cbn_24.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover h-full max-w-full"
                            />
                        </div>
                        <div className="min-w-0 col-span-3 h-full">
                            <img
                                src="images/cbn_gallery/cbn_2.webp"
                                alt="CBN detail shot"
                                className="rounded-sm w-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <div className="text-xs mt-4 sm:max-w-1/2 text-gray">
                        Left – Each Suite with an exterior view for natural
                        light, access and privacy. Right – Every detail is
                        considered—from the placement of furniture and the
                        discreet pivot TV mount to the dedicated closet space
                        within each private suite.
                    </div>
                </div>
            </section>

            {/* Architect */}
            <section className="mt-8" data-nav-theme="light">
                <div className="min-h-[40svh] flex items-center justify-center modern-padding">
                    <div className="grid grid-cols-1 sm:grid-cols-2 rounded-md bg-[#FFF]/30 p-2 md:gap-4 gap-4 items-stretch max-w-6xl">
                        <div className="img-container w-full sm:relative sm:h-full sm:min-h-0">
                            <img
                                src="/images/malek.webp"
                                alt="malek alqadi"
                                className="rounded-sm w-full h-auto object-cover object-bottom sm:absolute sm:inset-0 sm:h-full"
                            />
                        </div>
                        <div className="text-container md:p-4 space-y-2 flex-2">
                            <div className="font-mono uppercase text-xs">
                                pre-fab modular design
                            </div>
                            <h2 className="font-bold uppercase text-xl">
                                The architect&apos;s perspective
                            </h2>
                            <div className="text-body text-xs md:text-sm mb-4 ">
                                My design roots lie in the world of high-end
                                residences and experience-based hospitality.
                                With M-SHLTR, I have distilled the energy,
                                detail, and rigorous thought process of that
                                world into a high-performance modular system.
                                <br />
                                <br />
                                We are moving beyond the concept of the
                                &apos;static home.&apos; M-SHLTR is a premium
                                architectural product defined by spatial
                                efficiency, curated design moments, and flexible
                                open plans. It is universally adaptive: whether
                                deployed as a scalable suite for a boutique
                                hotel, a luxury guest house (ADU), or a primary
                                residence that grows from a bachelor pad to a
                                family home, the quality remains constant.
                                <br />
                                <br />
                                This is a system of &apos;living&apos; assets.
                                It allows owners—from developers to first-time
                                buyers—to invest in architecturally significant
                                structures that build equity and adapt over
                                time. We aren&apos;t just building boxes; we are
                                providing access to a considered way of
                                living—stripped of the inefficiencies of
                                traditional construction, yet retaining factory
                                precision and architectural integrity.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="my-24">
                <div className="" data-nav-theme="light">
                    <InteriorTrims />
                </div>
                <div
                    className="img-container modern-padding"
                    data-nav-theme="dark"
                >
                    <img
                        src="images/Living4K.webp"
                        alt="Living room"
                        className="rounded-sm w-full"
                    />
                </div>
            </section>

            {/* Exterior trims section */}
            <section>
                <div
                    className="grid grid-rows-1 modern-padding my-24"
                    data-nav-theme="light"
                >
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
                <div
                    className="relative w-full lg:h-[50svh] h-[30svh] overflow-hidden modern-padding"
                    data-nav-theme="light"
                >
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
            {/* <SpecSection /> */}

            <BigCTA />

            <Footer />
        </div>
    );
};

export default CBN;
