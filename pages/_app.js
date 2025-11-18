import NavbarV2 from "@/components/NavbarV2";
import { ScrollProvider } from "@/context/ScrollContext";
import { CtaFlowProvider } from "@/context/CtaFlowProvider";
import "@/styles/globals.css";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

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

    return (
        <main className={`${ibmPlexMono.variable} ${dince.variable}`}>
            <CtaFlowProvider>
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
            </CtaFlowProvider>
        </main>
    );
}
