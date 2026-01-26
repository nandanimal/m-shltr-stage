import { useState, useEffect } from "react";

function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}; max-age=31536000; path=/; SameSite=Lax`;
}

export default function CookieBanner({ onAccept }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!getCookie("cookie_consent")) {
            setVisible(true);
        }
    }, []);

    if (!visible) return null;

    const handleAccept = () => {
        setCookie("cookie_consent", "accepted");
        setVisible(false);
        onAccept();
    };

    const handleDecline = () => {
        setCookie("cookie_consent", "declined");
        setVisible(false);
    };

    return (
        <div className="w-full p-4 fixed bottom-0 left-0 right-0 z-100">
        <div
        className="bg-black/20 backdrop-blur-md rounded-sm w-full justify-start items-start sm:items-center sm:justify-center "
            style={{
                color: "var(--background)",
                padding: "16px 24px",
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                fontFamily: "var(--font-ibmPlexMono)",
                fontSize: "13px",
            }}
        >
            <span>This site uses cookies to measure performance.</span>
            <div style={{ display: "flex", gap: "8px" }}>
                <button
                    onClick={handleAccept}
                    style={{
                        background: "var(--background)",
                        color: "var(--foreground)",
                        border: "none",
                        padding: "6px 24px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                    }}
                >
                    Accept
                </button>
                <button
                    onClick={handleDecline}
                    style={{
                        background: "transparent",
                        color: "var(--background)",
                        border: "1px solid var(--background)",
                        padding: "6px 24px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                    }}
                >
                    Decline
                </button>
            </div>
        </div>
        </div>
    );
}
