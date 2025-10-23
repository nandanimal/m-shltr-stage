"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCtaFlow } from "@/context/CtaFlowProvider";
import CTAButton from "./CTAButton";

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
                className={`navbar w-full rounded-sm  backdrop-blur-lg transition ${
                    menuOpen
                        ? "bg-[rgba(242, 242, 238, 0.70)]  shadow-[0_0_8px_0_rgb(255,255,255)_inset,0_4px_10px_0_rgba(0,0,0,0.04)]"
                        : ""
                }`}
                style={
                    {
                        // background: "rgba(242, 242, 238, 0.70)",
                        // border: "1px solid #F2F2EE",
                    }
                }
            >
                {/* Top level contents */}
                <div className="navbar-contents flex flex-row justify-between items-center p-1 w-full sm:max-w-[none]">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="logo-container leading-none ml-1"
                    >
                        <img
                            src="/images/wordmark_black.svg"
                            className="h-[16px]"
                            alt="M-SHLTR"
                        />
                    </Link>

                    {/* desktop contents */}
                    <div className="desktop-link flex flex-row gap-4 items-center justify-center hidden sm:flex">
                        <Link
                            className="menu-item hover:bg-[#ffffff47] transition rounded-sm p-1 transition mx-1 pt-2"
                            href="/about"
                            onClick={closeMenu}
                        >
                            {" "}
                            About
                        </Link>
                        <Link
                            className="menu-item hover:bg-[#ffffff47] transition rounded-sm p-1 transition mx-1 pt-2"
                            href="/cbn"
                            onClick={closeMenu}
                        >
                            {" "}
                            CBN
                        </Link>

                        <div className="ml-8">
                            <CTAButton />
                        </div>
                    </div>

                    {/* Hamburger menu */}
                    <div
                        className="hamburger-menu p-2 rounded-sm w-[40px] h-[auto] gap-1 flex items-center flex-col justify-center cursor-pointer sm:hidden"
                        onClick={toggleMenu}
                    >
                        <motion.div
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-[1px] bg-black"
                        ></motion.div>
                        <div className="w-full h-[1px] bg-black"></div>
                        <motion.div
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-full h-[1px] bg-black"
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
                    className={`menu-contents flex flex-col gap-0 sm:hidden ${
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

                    <div className="m-2">
                        <CTAButton />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Navbar;
