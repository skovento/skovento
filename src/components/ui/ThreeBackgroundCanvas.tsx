'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackgroundCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check device capability gate (reduced motion, low memory)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Particle Cloud (Stars / Cyber Constellation)
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color('#8A2B88');
    const colorGold = new THREE.Color('#C88770');
    const colorNavy = new THREE.Color('#16203D');

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const mixFactor = Math.random();
      let color = colorViolet.clone();
      if (mixFactor > 0.6) color = colorGold;
      else if (mixFactor < 0.2) color = colorNavy;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. Floating 3D Geometric Meshes (Wireframe Torus Knot & Octahedrons)
    const meshGroup = new THREE.Group();

    // Wireframe TorusKnot
    const knotGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 100, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x8a2b88,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    torusKnot.position.set(18, 5, -10);
    meshGroup.add(torusKnot);

    // Floating Icosahedrons
    const icoGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xc88770,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const ico1 = new THREE.Mesh(icoGeo, icoMat);
    ico1.position.set(-20, -10, -5);
    meshGroup.add(ico1);

    const ico2 = new THREE.Mesh(icoGeo, icoMat);
    ico2.position.set(15, -18, -12);
    ico2.scale.set(0.7, 0.7, 0.7);
    meshGroup.add(ico2);

    scene.add(meshGroup);

    // Mouse Tracking with Smoothing (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop
    let animationFrameId: number;

    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate particle cloud gently
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;

      // Rotate 3D geometry meshes
      torusKnot.rotation.x += 0.004;
      torusKnot.rotation.y += 0.006;

      ico1.rotation.x -= 0.005;
      ico1.rotation.z += 0.003;

      ico2.rotation.y += 0.005;

      // Parallax camera displacement based on mouse movement
      camera.position.x = targetX * 3;
      camera.position.y = -targetY * 3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      particleMaterial.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
