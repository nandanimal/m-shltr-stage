import Navbar from "@/components/Navbar";
import { ScrollProvider } from "@/context/ScrollContext";
import { CtaFlowProvider } from "@/context/CtaFlowProvider";
import "@/styles/globals.css";

import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";

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

export default function App({ Component, pageProps }) {
    return (
        <main className={`${ibmPlexMono.variable} ${dince.variable}`}>
            <CtaFlowProvider>
                <ScrollProvider>
                    <Navbar />
                    <Component {...pageProps} />
                </ScrollProvider>
            </CtaFlowProvider>
        </main>
    );
}
