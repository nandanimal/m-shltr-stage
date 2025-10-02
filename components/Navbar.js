"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCtaFlow } from "@/context/CtaFlowProvider";

const Navbar = () => {
    const { openCta } = useCtaFlow();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div className="nav-container w-full p-2 items-center justify-center flex fixed z-100">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                className={`navbar w-full max-w-xl rounded-sm backdrop-blur-md hover:shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)] transition ${
                    menuOpen
                        ? "shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)]"
                        : "shadow"
                }`}
                style={{
                    background: "rgba(242, 242, 238, 0.70)",
                    border: "1px solid #F2F2EE",
                }}
            >
                {/* Top level contents */}
                <div className="navbar-contents flex flex-row justify-between items-center p-1">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="logo-container leading-none ml-1"
                    >
                        <img
                            src="/images/logo_black.svg"
                            className="h-[16px]"
                            alt="M-SHLTR"
                        />
                    </Link>
                    <div
                        className="hamburger-menu p-2 rounded-sm w-[40px] h-[auto] gap-1 flex items-center flex-col justify-center cursor-pointer"
                        onClick={toggleMenu}
                    >
                        <motion.div
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-[1px] bg-gray-500"
                        ></motion.div>
                        <div className="w-full h-[1px] bg-gray-500"></div>
                        <motion.div
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-[1px] bg-gray-500"
                        ></motion.div>
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
                    className={`menu-contents flex flex-col gap-0 ${
                        menuOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                    <Link
                        className="menu-item hover:bg-[#ffffff47] transition rounded-sm p-1 transition mx-1"
                        href="/"
                        onClick={closeMenu}
                    >
                        {" "}
                        Home
                    </Link>
                    <Link
                        className="menu-item hover:bg-[#ffffff47] transition rounded-sm p-1 transition mx-1"
                        href="/about"
                        onClick={closeMenu}
                    >
                        {" "}
                        About
                    </Link>
                    <Link
                        className="menu-item hover:bg-[#ffffff47] transition rounded-sm p-1 transition mx-1"
                        href="/cbn"
                        onClick={closeMenu}
                    >
                        {" "}
                        CBN
                    </Link>

                    <div
                        onClick={() => openCta({ source: "home_hero" })}
                        className="cta-button m-2"
                    >
                        CTA Button
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Navbar;
