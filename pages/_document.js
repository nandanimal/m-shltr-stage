import { Html, Head, Main, NextScript } from "next/document";
import { motion } from "framer-motion";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/images/logo_black.svg" type="image/svg+xml" />
                <meta property="og:image" content="/images/ogimage1.webp" />
                <meta name="twitter:image" content="/images/ogimage1.webp" />
            </Head>
            <body className="antialiased overscroll-none">
                <Main />
                <div id="modal-root" />
                <NextScript />
            </body>
        </Html>
    );
}
