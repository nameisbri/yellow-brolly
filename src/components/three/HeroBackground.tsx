import { useRef, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Subtle floating particles - reduced count for better performance
function FloatingParticles({ count = 30 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  const [geometry, initialPositions] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const initPos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 12 - 4;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Varying particle sizes for more visual interest
      sizes[i] = 0.3 + Math.random() * 0.8;

      // Brand yellow color with more variation
      const brightness = 0.85 + Math.random() * 0.3;
      colors[i * 3] = 0.97 * brightness; // R
      colors[i * 3 + 1] = 0.70 * brightness; // G
      colors[i * 3 + 2] = 0.17 * brightness; // B
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return [geo, initPos];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = initialPositions[i3] + Math.sin(time * 0.15 + i * 0.1) * 1.5;
      positions[i3 + 1] = initialPositions[i3 + 1] + Math.sin(time * 0.2 + i * 0.08) * 2;
      positions[i3 + 2] = initialPositions[i3 + 2] + Math.cos(time * 0.18 + i) * 0.8;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
    mesh.current.rotation.x = Math.sin(time * 0.05) * 0.1;
  });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.25}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Prominent grid with mouse-reactive glow
function InteractiveGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const prefersReducedMotion = useReducedMotion();

  // Create grid lines
  const gridLines = useMemo(() => {
    const lines: THREE.Line[] = [];
    const gridSize = 35;
    const divisions = 18;
    const step = gridSize / divisions;

    // Create horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const y = (i - divisions / 2) * step;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, y, -5),
        new THREE.Vector3(gridSize / 2, y, -5)
      ]);
      const material = new THREE.LineBasicMaterial({
        color: '#F7B32B',
        transparent: true,
        opacity: 0.12
      });
      lines.push(new THREE.Line(geometry, material));
    }

    // Create vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = (i - divisions / 2) * step;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -gridSize / 2, -5),
        new THREE.Vector3(x, gridSize / 2, -5)
      ]);
      const material = new THREE.LineBasicMaterial({
        color: '#F7B32B',
        transparent: true,
        opacity: 0.12
      });
      lines.push(new THREE.Line(geometry, material));
    }

    return lines;
  }, []);

  useFrame((state) => {
    if (!glowRef.current || prefersReducedMotion) return;

    // Smooth mouse following for the glow - faster response
    const targetX = (state.pointer.x * viewport.width) / 2.5;
    const targetY = (state.pointer.y * viewport.height) / 2.5;

    glowRef.current.position.x += (targetX - glowRef.current.position.x) * 0.08;
    glowRef.current.position.y += (targetY - glowRef.current.position.y) * 0.08;

    // Subtle pulsing
    const time = state.clock.getElapsedTime();
    const scale = 6 + Math.sin(time * 0.8) * 1.5;
    glowRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* Grid lines */}
      {gridLines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}

      {/* Mouse-following glow - smaller and lighter */}
      <mesh ref={glowRef} position={[0, 0, -4]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#F7B32B"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary ambient glow - smaller */}
      <mesh position={[0, 0, -6]}>
        <circleGeometry args={[10, 32]} />
        <meshBasicMaterial
          color="#F7B32B"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Third glow for depth - smaller */}
      <mesh position={[0, 0, -8]}>
        <circleGeometry args={[14, 32]} />
        <meshBasicMaterial
          color="#F7B32B"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Animated grid intersection dots - more prominent
function GridDots() {
  const mesh = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const gridSize = 35;
    const divisions = 18;
    const step = gridSize / divisions;
    const positions: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      for (let j = 0; j <= divisions; j++) {
        const x = (i - divisions / 2) * step;
        const y = (j - divisions / 2) * step;
        positions.push(x, y, -3);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current || prefersReducedMotion) return;

    const mouseX = (state.pointer.x * viewport.width) / 2.5;
    const mouseY = (state.pointer.y * viewport.height) / 2.5;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;

    // Update material opacity with more variation
    const material = mesh.current.material as THREE.PointsMaterial;
    const time = state.clock.getElapsedTime();
    material.opacity = 0.4 + Math.sin(time * 0.6) * 0.2;

    // More prominent wave effect
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      const wave = Math.sin(dist * 0.4 - time * 2.5) * 0.25;
      positions[i * 3 + 2] = -3 + wave * Math.max(0, 1 - dist / 10);
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#F7B32B"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#F7B32B" />
      <InteractiveGrid />
      <GridDots />
      <FloatingParticles count={30} />
    </>
  );
}

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(247,179,43,0.5),transparent_50%)]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]} // Reduced from [1, 2] for better performance
        gl={{ antialias: false, alpha: true }} // Disable antialias for mobile performance
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Subtle gradient overlays to blend 3D with background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
