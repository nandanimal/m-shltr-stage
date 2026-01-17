// components/Scene3D.js
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
    OrbitControls,
    Html,
    useGLTF,
    Preload,
    Center,
} from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function Model(props) {
    const { scene } = useGLTF("/models/model-v2.glb");
    return <primitive object={scene} {...props} />;
}

// Logs camera + controls angles
function CameraLogger({ controlsRef }) {
    const frameRef = useRef(0);

    useFrame(({ camera }) => {
        // throttle a bit so console isn't spammed
        if ((frameRef.current = (frameRef.current + 1) % 10)) return;

        const c = controlsRef.current;
        const az = c ? THREE.MathUtils.radToDeg(c.getAzimuthalAngle()) : 0; // yaw
        const pol = c ? THREE.MathUtils.radToDeg(c.getPolarAngle()) : 0; // pitch
        const t = c?.target ?? new THREE.Vector3();
    });
    return null;
}

function SceneContent() {
    const controlsRef = useRef();
    const { scrollYProgress } = useScroll();

    useFrame(() => {
        if (controlsRef.current) {
            const azimuthalAngle = THREE.MathUtils.lerp(
                0,
                Math.PI * 2,
                1.1 * scrollYProgress.get()
            );
            controlsRef.current.setAzimuthalAngle(azimuthalAngle);
            controlsRef.current.update();
        }
    });

    return (
        <>
            <ambientLight intensity={3} color={0xffcc99} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={2}
                color={0xff9966}
                castShadow
            />
            <Suspense fallback={<Html>Loading 3D…</Html>}>
                <Center>
                    <Model scale={0.1} />
                    <Preload all />
                </Center>
            </Suspense>
            <OrbitControls
                ref={controlsRef}
                enableDamping
                enableRotate={false}
                enableZoom={false}
            />
            {/* <CameraLogger controlsRef={controlsRef} /> */}
        </>
    );
}

export default function Scene3D() {
    return (
        <div className="relative w-full aspect-16/9">
            <Canvas
                className="absolute !inset-0 !w-full !h-full"
                dpr={[1, 2]}
                camera={{ position: [31, 5, 38], fov: 45 }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/model-v2.glb");
