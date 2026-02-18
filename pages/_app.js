import NavbarV2 from "@/components/NavbarV2";
import CookieBanner from "@/components/CookieBanner";
import { ScrollProvider } from "@/context/ScrollContext";
import { CtaFlowProvider } from "@/context/CtaFlowProvider";
import { Object3DViewerProvider } from "@/context/Object3DViewerContext";
import "@/styles/globals.css";

import Head from "next/head";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

function loadFbPixel() {
    if (typeof window.fbq === "function") return;
    (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", "1414150426869623");
    window.fbq("track", "PageView");
}

const dince = localFont({
    src: [
        { path: "../public/fonts/DnCeLt_.ttf", weight: "400", style: "light" },
        { path: "../public/fonts/DnCeMd_.ttf", weight: "400", style: "medium" },
        {
            path: "../public/fonts/DnCeRg_.ttf",
            weight: "400",
            style: "regular",
        },
    ],
    variable: "--font-dince",
});

const ibmPlexMono = IBM_Plex_Mono({
    weight: "300", // Light weight
    style: "normal",
    subsets: ["latin"],
    variable: "--font-ibmPlexMono",
});

const pageVariants = {
    initial: { opacity: 0, y: 24 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function App({ Component, pageProps }) {
    const router = useRouter();
    const lenisRef = useRef(null);

    // Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Scroll to top immediately on route change
    useEffect(() => {
        const handleRouteStart = () => {
            lenisRef.current?.scrollTo(0, { immediate: true });
        };
        router.events.on("routeChangeStart", handleRouteStart);
        return () => router.events.off("routeChangeStart", handleRouteStart);
    }, [router.events]);

    useEffect(() => {
        const classNames = [ibmPlexMono.variable, dince.variable];
        document.body.classList.add(...classNames);
        return () => {
            document.body.classList.remove(...classNames);
        };
    }, []);

    // Load Facebook Pixel if consent was previously given
    useEffect(() => {
        if (document.cookie.match(/(^| )cookie_consent=accepted(;|$)/)) {
            loadFbPixel();
        }
    }, []);

    // Track Facebook Pixel PageView on client-side route changes
    useEffect(() => {
        const handleRouteChange = () => {
            if (typeof window.fbq === "function") {
                window.fbq("track", "PageView");
            }
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <main className={`${ibmPlexMono.variable} ${dince.variable}`}>
            <Head>
                <title>M-SHLTR</title>
            </Head>
            <CtaFlowProvider>
                <Object3DViewerProvider>
                    <ScrollProvider>
                        <NavbarV2 />
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={router.asPath}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={pageVariants}
                                style={{ minHeight: "100vh" }}
                            >
                                <Component {...pageProps} />
                            </motion.div>
                        </AnimatePresence>
                    </ScrollProvider>
                </Object3DViewerProvider>
            </CtaFlowProvider>
            <CookieBanner onAccept={loadFbPixel} />
        </main>
    );
}
