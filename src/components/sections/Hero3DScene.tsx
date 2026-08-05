'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x8a2b88, 3.5);
    mainLight.position.set(5, 8, 5);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xc88770, 4, 20);
    accentLight.position.set(-5, -5, 5);
    scene.add(accentLight);

    const blueLight = new THREE.PointLight(0x16203d, 3, 20);
    blueLight.position.set(0, 5, -5);
    scene.add(blueLight);

    // 3D Glass Crystal Octahedron Mesh
    const geometry = new THREE.OctahedronGeometry(3.2, 2);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xFAF8F5,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.88, // Glass effect
      ior: 1.5,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const crystalMesh = new THREE.Mesh(geometry, material);
    scene.add(crystalMesh);

    // Wireframe Outer Cage
    const cageGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x8a2b88,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    scene.add(cageMesh);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Render loop
    let animId: number;
    const animate = () => {
      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Continuous 3D rotation + mouse response
      crystalMesh.rotation.x += 0.005;
      crystalMesh.rotation.y += 0.008;

      crystalMesh.rotation.x = targetY * 0.8;
      crystalMesh.rotation.y = targetX * 0.8;

      cageMesh.rotation.x -= 0.003;
      cageMesh.rotation.y -= 0.004;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[400px] sm:h-[480px]">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

      {/* Ambient Glow Aura */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-[#8A2B88]/20 via-transparent to-[#C88770]/20 rounded-full blur-3xl" />

      {/* Floating 3D Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card absolute top-4 left-0 sm:left-4 rounded-2xl px-4 py-3 shadow-2xl z-10 border border-white/40 backdrop-blur-xl hover:scale-105 transition-transform"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex items-center gap-2.5">
          <Zap className="w-4 h-4 text-[#C88770]" />
          <div className="text-[11px] leading-tight">
            <div className="font-extrabold text-[#16203D]">
              Under {siteConfig.standards.lcpSeconds}s on 4G
            </div>
            <div className="text-[#8A2B88] font-semibold">Written into the contract</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-card absolute bottom-6 right-0 sm:right-4 rounded-2xl px-4 py-3 shadow-2xl z-10 border border-white/40 backdrop-blur-xl hover:scale-105 transition-transform"
        style={{ transform: 'translateZ(60px)' }}
      >
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#8A2B88]" />
          <div className="text-[11px] leading-tight">
            <div className="font-extrabold text-[#16203D]">
              Live in {siteConfig.standards.fastestDeliveryDays} working days
            </div>
            <div className="text-[#8A2B88] font-semibold">Or you don&apos;t pay</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
