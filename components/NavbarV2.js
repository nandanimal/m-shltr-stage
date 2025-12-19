"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import CTAButton from "./CTAButton";
import CTAMinimal from "./CTAMinimal";
import Lottie from "lottie-react";
import menuAnimation from "@/public/icons/menu.json";

const Navbar = () => {
    const { openCta } = useCtaFlow();
    const [isAnimating, setIsAnimating] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [navTheme, setNavTheme] = useState("light");

    const menuLottieRef = useRef(null);
    const sectionsRef = useRef([]);
    const navTextClass = navTheme === "light" ? "text-black" : "text-white";
    const logoStyle =
        navTheme === "light"
            ? { filter: "brightness(0)", color: "black" }
            : { filter: "brightness(0) invert(1)", color: "white" };
    const arrowStyle =
        navTheme === "light"
            ? { filter: "brightness(0)" }
            : { filter: "brightness(0) invert(1)" };
    const { scrollY } = useScroll();

    const updateNavThemeForY = useCallback((y) => {
        if (!sectionsRef.current.length) return;
        const focusY = y + 1; // near the top edge
        const active = sectionsRef.current.find(
            (section) => focusY < section.bottom
        );
        if (!active) return;
        setNavTheme((prev) => (active.theme !== prev ? active.theme : prev));
    }, []);

    const toggleMenu = () => {
        if (!menuLottieRef.current) return;

        setIsAnimating(true);

        if (!menuOpen) {
            // opening
            menuLottieRef.current.playSegments([37, 62], true);
        } else {
            // closing
            menuLottieRef.current.playSegments([62, 119], true);
            setTimeout(() => {
                // console.log("setting animate to false");

                // menuLottieRef.current.goToAndStop(0, true);

                setIsAnimating(false);
            }, 2000);
        }
        // When animation completes, allow hover again

        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        if (!menuOpen) return; // don't play close animation if already closed
        menuLottieRef.current?.playSegments([62, 119], true);
        setMenuOpen(false);
    };

    useEffect(() => {
        if (!menuLottieRef.current) return;
        menuLottieRef.current.stop();
        menuLottieRef.current.goToAndStop(0, true);
    }, []);

    const measureSections = useCallback(() => {
        const sections = Array.from(
            document.querySelectorAll("[data-nav-theme]")
        );
        sectionsRef.current = sections
            .map((section) => {
                const rect = section.getBoundingClientRect();
                const theme =
                    section.getAttribute("data-nav-theme") === "dark"
                        ? "dark"
                        : "light";
                return {
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                    theme,
                };
            })
            .sort((a, b) => a.top - b.top);
    }, []);

    useEffect(() => {
        measureSections();
        // Ensure theme is correct on initial render (without requiring a scroll event)
        requestAnimationFrame(() => updateNavThemeForY(scrollY.get()));

        window.addEventListener("resize", measureSections);
        // Some layout shifts (fonts/images) can occur after window load.
        const handleLoad = () => {
            measureSections();
            updateNavThemeForY(scrollY.get());
        };
        window.addEventListener("load", handleLoad);
        return () => {
            window.removeEventListener("resize", measureSections);
            window.removeEventListener("load", handleLoad);
        };
    }, [measureSections, scrollY, updateNavThemeForY]);

    useEffect(() => {
        const body = document.body;
        if (menuOpen) {
            const previousOverflow = body.style.overflow;
            body.style.overflow = "hidden";
            return () => {
                body.style.overflow = previousOverflow;
            };
        }
        // reset when menu closes
        body.style.overflow = "";
        return undefined;
    }, [menuOpen]);

    const handleMenuHoverStart = () => {
        if (menuOpen || isAnimating) return;
        setHovered(true);
        menuLottieRef.current?.playSegments([0, 37], true);
    };

    const handleMenuHoverEnd = () => {
        if (menuOpen || isAnimating) return;
        setHovered(false);
        menuLottieRef.current?.playSegments([37, 0], true); // <-- reverse hover
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        updateNavThemeForY(latest);
    });

    return (
        <motion.div
            animate={menuOpen ? { height: "100svh" } : { height: 0 }}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                type: "tween",
                stiffness: "150",
                damping: "10",
            }}
            layout
            className={`nav-container w-full modern-padding  justify-center flex fixed z-[999] ${
                menuOpen
                    ? "h-screen overflow-y-scroll bg-gray/80 backdrop-blur-xl"
                    : "h-auto"
            }`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className={`navbar w-full rounded-sm  sm:backdrop-blur-[none] transition transition-colors duration-300 ${navTextClass} ${
                    menuOpen ? "bg-[rgba(255, 255, 255, 0.90)]  " : ""
                }`}
                style={
                    {
                        // background: "rgba(242, 242, 238, 0.70)",
                        // border: "1px solid #F2F2EE",
                    }
                }
            >
                {/* Desktop contents */}
                <div className="navbar-contents h-9 sm:h-7 items-stretch min-h-0 items-stretch grid grid-cols-3 sm:grid-cols-4 w-full items-center p-1 sm:p-0 w-full gap-1 sm:max-w-[none] min-h-0">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        aria-pressed={menuOpen}
                        // style={{ height: "-webkit-fill-available" }}
                        className={`hamburger-menu h-full flex items-center gap-2 leading-none  sm:ml-0  h-full rounded-sm overflow-hidden cursor-pointer transition-colors duration-300 ${navTextClass} -ml-[8px] sm:ml-0`}
                        onMouseEnter={handleMenuHoverStart}
                        onMouseLeave={handleMenuHoverEnd}
                    >
                        <div className="h-full w-10 flex items-center">
                            <Lottie
                                lottieRef={menuLottieRef}
                                animationData={menuAnimation}
                                loop={false}
                                style={logoStyle}
                                autoplay={false}
                                rendererSettings={{
                                    preserveAspectRatio: "xMidYMid meet",
                                }}
                            />
                        </div>
                        <div
                            className={`font-mono uppercase transition-colors duration-300 ${navTextClass}`}
                        >
                            Menu
                        </div>
                    </button>

                    <Link
                        href="/"
                        onClick={closeMenu}
                        // style={{ height: "-webkit-fill-available" }}
                        className=" h-full flex items-center leading-none ml-1 sm:ml-0 sm:px-2 h-full rounded-sm overflow-hidden sm:col-span-2 justify-center hover:opacity-50 transition"
                    >
                        <img
                            src="/images/SHLTR.svg"
                            className="h-[16px] transition-[filter] duration-300 ease-in-out"
                            style={logoStyle}
                            alt="M-SHLTR"
                        />
                    </Link>

                    {/* desktop contents */}
                    <div className="desktop-link flex flex-row gap-1 items-center justify-center  flex font-roboto justify-end">
                        <div className="">
                            {/* <div className="block sm:hidden"> */}
                            <CTAMinimal iconStyle={arrowStyle} />
                            {/* </div> */}

                            {/* <div className="hidden sm:block">
                                <CTAButton />
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Mobile contents */}

                <motion.div
                    initial={false}
                    animate={
                        menuOpen
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                    }
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                        type: "tween",
                        stiffness: "150",
                        damping: "10",
                    }}
                    layout
                    className={`menu-contents mt-8 flex flex-col gap-4  ${
                        menuOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                    <Link
                        className="menu-item type-menu hover:opacity-60 transition rounded-sm transition"
                        href="/"
                        onClick={closeMenu}
                    >
                        {" "}
                        Home
                    </Link>
                    <Link
                        className="menu-item type-menu hover:opacity-60 transition rounded-sm transition"
                        href="/cbn"
                        onClick={closeMenu}
                    >
                        {" "}
                        CBN
                    </Link>
                    <Link
                        className="menu-item type-menu hover:opacity-60 transition rounded-sm transition"
                        href="/about"
                        onClick={closeMenu}
                    >
                        {" "}
                        About
                    </Link>
                    <Link
                        className="menu-item type-menu hover:opacity-60 transition rounded-sm transition"
                        href="/faq"
                        onClick={closeMenu}
                    >
                        {" "}
                        FAQ
                    </Link>
                    <Link
                        className="menu-item type-menu hover:opacity-60 transition rounded-sm transition flex flex-row gap-2"
                        href="/faq"
                        onClick={closeMenu}
                    >
                        {" "}
                        Pre-order{" "}
                        <img
                            className="h-full w-[16px]"
                            src="/icons/arrow-up-right.svg"
                            style={arrowStyle}
                            alt=""
                        />
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Navbar;
