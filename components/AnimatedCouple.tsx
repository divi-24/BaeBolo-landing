'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

function HeartParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);

  // Create heart shape geometry
  const createHeartGeometry = () => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;

    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y + 0, x + 0, y + 0);
    shape.bezierCurveTo(x - 6, y + 0, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y + 0, x + 10, y + 0);
    shape.bezierCurveTo(x + 7, y + 0, x + 5, y + 5, x + 5, y + 5);

    return new THREE.ShapeGeometry(shape);
  };

  const floatingHearts = 6;

  if (groupRef.current && particlesRef.current.length === 0) {
    for (let i = 0; i < floatingHearts; i++) {
      const geometry = createHeartGeometry();
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0, 1, 0.6 + Math.random() * 0.2),
        emissive: new THREE.Color().setHSL(0, 1, 0.4),
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.userData.floatSpeed = 0.002 + Math.random() * 0.003;
      mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.01;
      mesh.userData.time = Math.random() * Math.PI * 2;
      particlesRef.current.push(mesh);
      groupRef.current.add(mesh);
    }
  }

  useFrame(() => {
    if (groupRef.current) {
      particlesRef.current.forEach((particle) => {
        particle.userData.time += particle.userData.floatSpeed;
        particle.position.y += Math.sin(particle.userData.time) * 0.02;
        particle.rotation.x += particle.userData.rotationSpeed;
        particle.rotation.y += particle.userData.rotationSpeed * 0.8;
      });
    }
  });

  return <group ref={groupRef} />;
}

function CoupleSilhouette() {
  const leftFigureRef = useRef<THREE.Group>(null);
  const rightFigureRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (leftFigureRef.current) {
      leftFigureRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      leftFigureRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
    }
    if (rightFigureRef.current) {
      rightFigureRef.current.position.y = Math.cos(time * 0.5) * 0.3;
      rightFigureRef.current.rotation.z = Math.sin(time * 0.3 + Math.PI) * 0.05;
    }
  });

  return (
    <>
      {/* Left figure */}
      <group ref={leftFigureRef} position={[-3, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshPhongMaterial color="#fe4d89" emissive="#ff6b9d" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.5, 1, 0.3]} />
          <meshPhongMaterial color="#d01554" emissive="#fe4d89" />
        </mesh>
        <mesh position={[-0.3, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshPhongMaterial color="#ac1447" />
        </mesh>
        <mesh position={[0.3, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshPhongMaterial color="#ac1447" />
        </mesh>
      </group>

      {/* Right figure */}
      <group ref={rightFigureRef} position={[3, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshPhongMaterial color="#ff8ab3" emissive="#ffcade" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.5, 1, 0.3]} />
          <meshPhongMaterial color="#ffa1c2" emissive="#ffcade" />
        </mesh>
        <mesh position={[-0.3, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshPhongMaterial color="#ffe4ed" />
        </mesh>
        <mesh position={[0.3, -0.5, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <meshPhongMaterial color="#ffe4ed" />
        </mesh>
      </group>
    </>
  );
}

// Loading skeleton for better UX
function LoadingAnimation() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Heart className="w-12 h-12 text-primary-500 fill-primary-500" />
      </motion.div>
      <div className="text-center">
        <p className="text-gray-400 text-sm">Loading love animation...</p>
        <div className="mt-3 flex gap-1 justify-center">
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-primary-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

interface AnimatedCoupleProps {
  enableOnMobile?: boolean;
}

export default function AnimatedCouple({ enableOnMobile = false }: AnimatedCoupleProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check if device is mobile
    setIsMobile(window.innerWidth < 768);

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
      setHasWebGL(!!gl);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  // Fallback for mobile or no WebGL support
  if (!mounted || (!hasWebGL) || (isMobile && !enableOnMobile)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full h-96 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-black via-primary-950 to-black border border-white/10 flex items-center justify-center"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary-500 rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-accent-light rounded-full mix-blend-screen filter blur-2xl opacity-30 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <Heart className="w-16 h-16 text-primary-500 fill-primary-500" />
              <motion.div
                animate={{ scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-primary-500"
              />
            </div>
          </motion.div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Two Hearts, One Connection
          </h3>
          <p className="text-gray-400 text-sm">
            {isMobile && !enableOnMobile
              ? 'Experience the full animation on desktop'
              : 'Finding your perfect match...'}
          </p>
        </div>

        {/* Glow effect overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary-500/10" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-80 md:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-black via-primary-950 to-black border border-white/10"
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        dpr={isMobile ? 1 : window.devicePixelRatio}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
        <color attach="background" args={['#000000']} />

        {/* Lighting */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b9d" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ff8ab3" />
        <ambientLight intensity={0.3} />

        {/* Objects */}
        <CoupleSilhouette />
        <HeartParticles />

        {/* Environment */}
        <Environment preset="night" />
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>

      {/* Glow effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary-500/10" />
      </div>
    </motion.div>
  );
}
