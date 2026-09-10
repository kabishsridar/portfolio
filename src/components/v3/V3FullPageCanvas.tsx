"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function V3FullPageCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090a, 0.018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Central Hero Wireframe (Torus Knot)
    const torusGeo = new THREE.TorusKnotGeometry(7, 1.8, 100, 20, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusMesh);

    // 2. Cybernetic Tunnel Lattice (for scroll flight)
    const tunnelCount = 18;
    const tunnelRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.TorusGeometry(12, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.25,
    });

    for (let i = 0; i < tunnelCount; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.z = -i * 12;
      scene.add(ring);
      tunnelRings.push(ring);
    }

    // 3. 3D Particle Cloud Field (600 Stars / Cyber Nodes)
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colAmber = new THREE.Color(0xff5500);
    const colGreen = new THREE.Color(0x00ff66);
    const colIvory = new THREE.Color(0xededed);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = (Math.random() - 0.5) * 180;

      const rnd = Math.random();
      const col = rnd > 0.6 ? colGreen : rnd > 0.3 ? colAmber : colIvory;
      starColors[i] = col.r;
      starColors[i + 1] = col.g;
      starColors[i + 2] = col.b;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Mouse Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Lerp mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous rotation influenced by scroll velocity
        torusMesh.rotation.x = elapsed * 0.3 + scrollProgress * 4.0;
        torusMesh.rotation.y = elapsed * 0.4 + scrollProgress * 5.0;

        // Camera flight interpolation along Z-axis based on scroll
        const targetCamZ = 30 - scrollProgress * 90;
        camera.position.z += (targetCamZ - camera.position.z) * 0.08;
        camera.position.x += (mouse.x * 4 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, targetCamZ - 40);

        // Tunnel pulse
        tunnelRings.forEach((ring, idx) => {
          ring.rotation.z = elapsed * 0.2 + idx * 0.1;
          const scale = 1 + Math.sin(elapsed * 2 + idx) * 0.04;
          ring.scale.set(scale, scale, 1);
        });

        starField.rotation.z = elapsed * 0.04 + scrollProgress * 2.0;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      torusGeo.dispose();
      torusMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-80"
    />
  );
}
