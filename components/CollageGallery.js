export default function CollageGallery({
    images = [
        { src: "/images/chmbr_iso.png", alt: "Front elevation" },
        { src: "/images/5.jpeg", alt: "Side detail" },
        { src: "/images/render1.png", alt: "Entry corner" },
        { src: "/images/4.jpeg", alt: "Three-quarter view" },
    ],
    rounded = "rounded-sm",
    className = "",
}) {
    const [a, b, c, d] = images.slice(0, 4);

    return (
        <section className={`w-full ${className}`}>
            <div className="mx-auto max-w-[1440px]  space-y-1">
                {/* Row height controls equal height across rows */}
                <Row>
                    <Figure
                        img={a}
                        className={`basis-1/3 min-w-0 ${rounded}`}
                    />
                    <Figure
                        img={b}
                        className={`basis-2/3 min-w-0 ${rounded}`}
                    />
                </Row>

                <Row>
                    <Figure
                        img={c}
                        className={`basis-2/3 min-w-0 ${rounded}`}
                    />
                    <Figure
                        img={d}
                        className={`basis-1/3 min-w-0 ${rounded}`}
                    />
                </Row>
            </div>
        </section>
    );
}

// A row with fixed height (same for all rows) and responsive tweaks
function Row({ children }) {
    return (
        <div className="flex gap-1 items-stretch sm:flex-row flex-col">
            {children}
        </div>
    );
}

function Figure({ img, className = "" }) {
    if (!img?.src) return null;
    return (
        <figure className={`relative overflow-hidden ${className}`}>
            {/* Make the figure take the row's full height */}
            <div className="h-full w-full">
                <img
                    src={img.src}
                    alt={img.alt || ""}
                    loading="lazy"
                    className="h-full w-full object-cover block"
                />
            </div>
        </figure>
    );
}
