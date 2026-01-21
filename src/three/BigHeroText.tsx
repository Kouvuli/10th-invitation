import { useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { FontLoader, TextGeometry } from "three-stdlib";
import * as THREE from "three";
import { useMemo, useRef } from "react";

export default function BigHeroText() {
  const groupRef = useRef<THREE.Group>(null!);
  const shadowParams = useRef({ y: -0.95, width: 2.6, height: 1.2 });

  const font = useLoader(FontLoader, "/fonts/helvetiker_regular.typeface.json");

  const geometry = useMemo(() => {
    return new TextGeometry("10th", {
      font,
      size: 1.8,
      height: 0.48,
      curveSegments: 16,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.035,
    });
  }, [font]);

  // compute bounding box once the geometry exists so the shadow can match
  useMemo(() => {
    if (!geometry) return;
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox!;
    const size = new THREE.Vector3();
    bbox.getSize(size);
    // position shadow slightly below the lowest vertex and scale to text width
    shadowParams.current = {
      y: bbox.min.y - 0.06,
      width: Math.max(size.x * 1.2, 1.2),
      height: Math.max(size.y * 0.5, 0.6),
    };
  }, [geometry]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 2) * 0.15; // small bounce
    }
  });

  return (
    <Center>
      <group ref={groupRef} position={[-1.4, 0, 0]}>
        {/* layered additive glow meshes (slightly bigger scales) */}
        {[0.03, 0.07, 0.12].map((s, i) => (
          <mesh key={i} geometry={geometry} scale={[1 + s, 1 + s, 1 + s]}>
            <meshBasicMaterial
              color="#ff7a7a"
              transparent
              opacity={0.14 - i * 0.035}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}

        {/* main metallic text */}
        <mesh geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color="#ff2b2b"
            emissive="#ff2b2b"
            emissiveIntensity={1.0}
            roughness={0.08}
            metalness={0.9}
          />
        </mesh>

        {/* shadow removed per request (keeps only glow + main text) */}
      </group>
    </Center>
  );
}
