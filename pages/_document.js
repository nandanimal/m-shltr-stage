import { Html, Head, Main, NextScript } from "next/document";
import { motion } from "framer-motion";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="antialiased overscroll-none">
                <Main />
                <div id="modal-root" />
                <NextScript />
            </body>
        </Html>
    );
}
