// components/Marquee.js
export default function TickerFM({ speed = 10, children }) {
    return (
        <div className="marquee" aria-hidden="true">
            <div className="track">
                <div className="row">{children}</div>
                <div className="row" aria-hidden="true">
                    {children}
                </div>
            </div>
            <style jsx>{`
                .marquee {
                    overflow: hidden;
                    white-space: nowrap;
                    mask-image: linear-gradient(
                        to right,
                        transparent,
                        black 10%,
                        black 90%,
                        transparent
                    );
                }
                .track {
                    display: inline-flex;
                }
                .row {
                    display: inline-flex;
                    gap: 24px;
                    padding-right: 24px; /* match gap */
                    animation: scroll linear infinite;
                    animation-duration: ${Math.max(
                        8,
                        200 / speed
                    )}s; /* tune speed */
                }
                .row + .row {
                    animation-delay: calc(${Math.max(8, 200 / speed)}s / -2);
                }
                @keyframes scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
}
