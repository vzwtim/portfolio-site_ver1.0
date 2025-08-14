'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime * 0.1;
    ref.current.rotation.y = t;
    ref.current.rotation.x = mouse.y * 0.3;
    ref.current.rotation.z = mouse.x * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} />
    </points>
  );
}

export default function InterestHero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <Canvas className="absolute inset-0" camera={{ position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-6xl md:text-8xl font-bold tracking-widest"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          興味・関心
        </motion.h2>
      </div>
    </div>
  );
}

