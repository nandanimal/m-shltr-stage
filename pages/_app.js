import Navbar from "@/components/Navbar";
import { ScrollProvider } from "@/context/ScrollContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <ScrollProvider>
                <Navbar />
                <Component {...pageProps} />
            </ScrollProvider>
        </>
    );
}
