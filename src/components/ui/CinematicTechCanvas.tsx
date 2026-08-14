'use client';

import React, { useEffect, useRef } from 'react';

export const CinematicTechCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 3D Warp Grid Lines
    const gridLines = 24;
    
    // 3D Particles
    const particleCount = width < 768 ? 45 : 85;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: (Math.random() - 0.5) * width * 1.8,
      y: (Math.random() - 0.5) * height * 1.8,
      z: Math.random() * 1000 + 10,
      sz: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#8A2B88' : '#C88770'
    }));

    const speed = 2.5;
    let time = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(5, 8, 17, 0.28)'; // Deep motion blur
      ctx.fillRect(0, 0, width, height);

      time += 0.02;
      const fov = 350;
      const cx = width / 2;
      const cy = height / 2;

      // 1. Draw 3D Cyberpunk Radial Tunnel Lines
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = 'rgba(138, 43, 136, 0.12)';
      ctx.lineWidth = 1;

      for (let i = 0; i < gridLines; i++) {
        const rad = (i / gridLines) * Math.PI * 2 + time * 0.1;
        const x2 = Math.cos(rad) * width * 1.2;
        const y2 = Math.sin(rad) * height * 1.2;
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 2. Draw 3D Expanding Energy Rings (Quantum Wave Pulse)
      for (let r = 1; r <= 8; r++) {
        const radius = ((r * 110 + time * 60) % 700) + 10;
        const alpha = Math.max(0, 1 - radius / 700) * 0.25;
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 1.6, radius * 0.8, time * 0.15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 135, 112, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Render 3D Quantum Stars & Particle Tunnel
      particles.forEach((p) => {
        p.z -= speed;
        if (p.z <= 0) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.8;
          p.y = (Math.random() - 0.5) * height * 1.8;
        }

        const k = fov / p.z;
        const px = p.x * k + cx;
        const py = p.y * k + cy;
        const size = Math.max(0.5, p.sz * k);

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = p.z < 400 ? 10 : 0;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};
