"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function V2CyberneticCore() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Outer Torus Knot Wireframe
    const torusGeo = new THREE.TorusKnotGeometry(7.5, 2.2, 128, 24, 2, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeo, wireMat);
    scene.add(torusMesh);

    // Inner Icosahedron Core
    const icoGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icoMesh);

    // Orbiting particle points
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 10 + Math.random() * 5;
      particlePositions[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const pointMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xededed,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeo, pointMat);
    scene.add(particleSystem);

    // Scroll & Mouse Tracking
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
        // Continuous rotation influenced by scroll depth
        const scrollFactor = 1 + scrollProgress * 3.5;
        torusMesh.rotation.x = elapsed * 0.25 * scrollFactor + mouse.y * 0.4;
        torusMesh.rotation.y = elapsed * 0.35 * scrollFactor + mouse.x * 0.4;

        icoMesh.rotation.x = -elapsed * 0.4 * scrollFactor + mouse.y * 0.3;
        icoMesh.rotation.y = -elapsed * 0.5 * scrollFactor + mouse.x * 0.3;

        particleSystem.rotation.y = elapsed * 0.08 * scrollFactor;

        // Dynamic scale deformation on scroll
        const targetScale = 1 - scrollProgress * 0.35;
        torusMesh.scale.set(targetScale, targetScale, targetScale);
        icoMesh.scale.set(targetScale, targetScale, targetScale);

        // Core camera displacement
        camera.position.x = mouse.x * 2.5;
        camera.position.y = mouse.y * 2.5;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
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
      icoGeo.dispose();
      particleGeo.dispose();
      wireMat.dispose();
      icoMat.dispose();
      pointMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-75"
      style={{ zIndex: 1 }}
    />
  );
}
