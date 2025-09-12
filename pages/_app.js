import Navbar from "@/components/Navbar";
import { ScrollProvider } from "@/context/ScrollContext";
import "@/styles/globals.css";

import localFont from "next/font/local";

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
});

export default function App({ Component, pageProps }) {
    return (
        <main className={dince.className}>
            <ScrollProvider>
                <Navbar />
                <Component {...pageProps} />
            </ScrollProvider>
        </main>
    );
}
