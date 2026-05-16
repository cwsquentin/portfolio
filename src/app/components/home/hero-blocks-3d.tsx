"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";

const PALETTE = {
  oat: "#EBE2CD",
  walnut: "#1B1814",
  rust: "#A8533A",
  cobalt: "#3F5466",
  ocre: "#D29A3B",
} as const;

interface BlockConfig {
  color: string;
  size: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  mass: number;
}

const BLOCKS: BlockConfig[] = [
  { color: PALETTE.rust,    size: [1.5, 1.0, 1.1], position: [-3.0, 1.0,  0.3], rotation: [ 0.10,  0.30,  0.08], mass: 1.2 },
  { color: PALETTE.cobalt,  size: [1.3, 1.3, 1.2], position: [ 3.0, 2.6, -0.4], rotation: [ 0.18, -0.42,  0.00], mass: 1.0 },
  { color: PALETTE.ocre,    size: [1.2, 1.0, 1.2], position: [-1.5, 4.0,  0.5], rotation: [-0.12,  0.18, -0.20], mass: 1.0 },
  { color: PALETTE.walnut,  size: [1.0, 1.1, 1.3], position: [ 1.5, 5.4,  0.2], rotation: [ 0.22, -0.14,  0.10], mass: 0.9 },
  { color: PALETTE.oat,     size: [1.7, 0.8, 1.1], position: [ 0.0, 6.8,  0.6], rotation: [-0.05,  0.10,  0.00], mass: 1.3 },
];

const BODY_TYPE_DYNAMIC = 0;
const BODY_TYPE_KINEMATIC_POSITION = 2;

interface DraggableBlockProps {
  config: BlockConfig;
  reducedMotion: boolean;
}

function DraggableBlock({ config, reducedMotion }: DraggableBlockProps) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, gl, raycaster, pointer } = useThree();

  const isDraggingRef = useRef(false);
  const dragPlaneRef = useRef(new THREE.Plane());
  const intersectionRef = useRef(new THREE.Vector3());
  const offsetRef = useRef(new THREE.Vector3());
  const cameraDirRef = useRef(new THREE.Vector3());
  const blockPositionRef = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!isDraggingRef.current || !bodyRef.current) return;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.ray.intersectPlane(
      dragPlaneRef.current,
      intersectionRef.current,
    );
    if (!hit) return;
    bodyRef.current.setNextKinematicTranslation({
      x: intersectionRef.current.x + offsetRef.current.x,
      y: intersectionRef.current.y + offsetRef.current.y,
      z: intersectionRef.current.z + offsetRef.current.z,
    });
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const release = () => {
      if (!isDraggingRef.current || !bodyRef.current) return;
      isDraggingRef.current = false;
      bodyRef.current.setBodyType(BODY_TYPE_DYNAMIC, true);
      document.body.style.cursor = "";
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (reducedMotion) return;
      if (!bodyRef.current || !meshRef.current) return;
      event.stopPropagation();

      bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      bodyRef.current.setBodyType(BODY_TYPE_KINEMATIC_POSITION, true);

      gl.domElement.setPointerCapture?.(event.pointerId);

      meshRef.current.getWorldPosition(blockPositionRef.current);
      camera.getWorldDirection(cameraDirRef.current);
      dragPlaneRef.current.setFromNormalAndCoplanarPoint(
        cameraDirRef.current,
        blockPositionRef.current,
      );

      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(
        dragPlaneRef.current,
        intersectionRef.current,
      );
      offsetRef.current.subVectors(
        blockPositionRef.current,
        intersectionRef.current,
      );

      isDraggingRef.current = true;
      document.body.style.cursor = "grabbing";
    },
    [camera, gl, pointer, raycaster, reducedMotion],
  );

  const handlePointerOver = useCallback(() => {
    if (reducedMotion || isDraggingRef.current) return;
    document.body.style.cursor = "grab";
  }, [reducedMotion]);

  const handlePointerOut = useCallback(() => {
    if (isDraggingRef.current) return;
    document.body.style.cursor = "";
  }, []);

  const halfExtents: [number, number, number] = [
    config.size[0] / 2,
    config.size[1] / 2,
    config.size[2] / 2,
  ];

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={config.position}
      rotation={config.rotation}
      mass={config.mass}
      ccd
      restitution={0.15}
      friction={0.7}
      linearDamping={0.25}
      angularDamping={0.4}
    >
      <CuboidCollider args={halfExtents} />
      <mesh
        ref={meshRef}
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry args={config.size} />
        <meshStandardMaterial
          color={config.color}
          roughness={0.72}
          metalness={0.06}
        />
      </mesh>
    </RigidBody>
  );
}

function Stage() {
  return (
    <>
      <RigidBody type="fixed" friction={0.9}>
        <CuboidCollider args={[12, 2, 12]} position={[0, -4.5, 0]} />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider args={[0.5, 6, 6]} position={[-6, 0, 0]} />
      </RigidBody>
      <RigidBody type="fixed">
        <CuboidCollider args={[0.5, 6, 6]} position={[6, 0, 0]} />
      </RigidBody>

      <RigidBody type="fixed">
        <CuboidCollider args={[10, 6, 0.5]} position={[0, 0, -3]} />
      </RigidBody>
    </>
  );
}

export function HeroBlocks3D() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const [physicsReady, setPhysicsReady] = useState(false);
  useEffect(() => {
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setPhysicsReady(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      if (id2) cancelAnimationFrame(id2);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 35 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows="percentage"
      >
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight
          position={[-5, 3, -3]}
          intensity={0.4}
          color="#EBE2CD"
        />

        <Suspense fallback={null}>
          <Physics
            gravity={[0, -9.81, 0]}
            paused={reducedMotion || !physicsReady}
            interpolate={false}
          >
            <Stage />
            {BLOCKS.map((config, index) => (
              <DraggableBlock
                key={index}
                config={config}
                reducedMotion={reducedMotion}
              />
            ))}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroBlocks3D;
