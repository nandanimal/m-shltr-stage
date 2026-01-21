"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 100;
const BASE_PATH = "/images/CBN3D/";
const BASE_NAME = "CBN";
const EXT = ".webp";

const Object3DViewerContext = createContext({
    images: [],
    loaded: false,
    frameCount: TOTAL_FRAMES,
});

async function loadFrame(src) {
    const img = new Image();
    img.src = src;

    await new Promise((resolve) => {
        const done = () => resolve();

        if (img.complete) {
            if (img.decode) img.decode().then(done).catch(done);
            else done();
        } else {
            img.onload = () => {
                if (img.decode) img.decode().then(done).catch(done);
                else done();
            };
            img.onerror = done;
        }
    });

    return img;
}

export function Object3DViewerProvider({ children }) {
    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);
    const loadingStartedRef = useRef(false);

    useEffect(() => {
        if (loadingStartedRef.current) return;
        loadingStartedRef.current = true;

        let cancelled = false;

        (async () => {
            const loadedImages = [];

            // Load frames sequentially to reduce network pressure
            for (let idx = 0; idx < TOTAL_FRAMES; idx++) {
                if (cancelled) return;
                const frame = await loadFrame(
                    `${BASE_PATH}${BASE_NAME}${idx + 1}${EXT}`
                );
                loadedImages.push(frame);
            }

            if (cancelled) return;
            setImages(loadedImages);
            setLoaded(true);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <Object3DViewerContext.Provider
            value={{
                images,
                loaded,
                frameCount: TOTAL_FRAMES,
            }}
        >
            {children}
        </Object3DViewerContext.Provider>
    );
}

export function useObject3DViewer() {
    return useContext(Object3DViewerContext);
}
