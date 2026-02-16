import { Html, Head, Main, NextScript } from "next/document";
import { motion } from "framer-motion";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9DBFQKG');`,
                    }}
                />
                {/* End Google Tag Manager */}
                <link rel="icon" href="/images/logo_black.svg" type="image/svg+xml" />
                <meta property="og:image" content="/images/ogimage1.webp" />
                <meta name="twitter:image" content="/images/ogimage1.webp" />
            </Head>
            <body className="antialiased overscroll-none">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-M9DBFQKG"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}
                <Main />
                <div id="modal-root" />
                <NextScript />
            </body>
        </Html>
    );
}
