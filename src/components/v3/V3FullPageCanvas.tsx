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
    // No fog - transparent background

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Central Hero Wireframe (Enhanced Orange Torus Knot) - THE STAR
    const torusGeo = new THREE.TorusKnotGeometry(8, 2, 120, 24, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusMesh);

    // 2. Glowing outer rim for the torus knot
    const outerRimGeo = new THREE.TorusKnotGeometry(8.5, 2.1, 120, 24, 2, 3);
    const outerRimMat = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerRim = new THREE.Mesh(outerRimGeo, outerRimMat);
    scene.add(outerRim);

    // 3. Inner core glow
    const innerCoreGeo = new THREE.TorusKnotGeometry(7.5, 1.8, 120, 24, 2, 3);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffaa00,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    scene.add(innerCore);

    // 4. Ambient particle field - subtle, orange/amber theme
    const starCount = 400;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const colAmber = new THREE.Color(0xff5500);
    const colOrange = new THREE.Color(0xff8800);
    const colGold = new THREE.Color(0xffaa00);
    const colIvory = new THREE.Color(0xededed);

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = 15 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = radius * Math.cos(phi) - 20;

      const rnd = Math.random();
      let col: THREE.Color;
      let size = 0.3 + Math.random() * 0.5;
      if (rnd > 0.7) {
        col = colGold;
        size = 0.6 + Math.random() * 0.6;
      } else if (rnd > 0.4) {
        col = colOrange;
      } else {
        col = colAmber;
      }
      starColors[i] = col.r;
      starColors[i + 1] = col.g;
      starColors[i + 2] = col.b;
      starSizes[i / 3] = size;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. Orbital rings around the torus knot
    const ringCount = 3;
    const orbitalRings: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(14 + i * 4, 14.5 + i * 4, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xff5500,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2 + (i * 0.3);
      ring.rotation.z = i * 0.5;
      scene.add(ring);
      orbitalRings.push(ring);
    }

    // 6. Subtle geometric line grid in background
    const gridHelper = new THREE.GridHelper(100, 40, 0xff5500, 0xff5500);
    gridHelper.material.opacity = 0.03;
    gridHelper.material.transparent = true;
    gridHelper.position.y = -30;
    scene.add(gridHelper);

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
        // Main torus knot - smooth continuous rotation with scroll influence
        torusMesh.rotation.x = elapsed * 0.25 + scrollProgress * 3.0;
        torusMesh.rotation.y = elapsed * 0.35 + scrollProgress * 4.0;
        torusMesh.rotation.z = elapsed * 0.15;

        // Outer rim - counter rotation
        outerRim.rotation.x = -elapsed * 0.15 + scrollProgress * 2.0;
        outerRim.rotation.y = -elapsed * 0.25 + scrollProgress * 3.0;

        // Inner core - faster rotation
        innerCore.rotation.x = elapsed * 0.4 + scrollProgress * 5.0;
        innerCore.rotation.y = elapsed * 0.5 + scrollProgress * 6.0;

        // Subtle scale breathing
        const breath = 1 + Math.sin(elapsed * 0.8) * 0.02;
        torusMesh.scale.setScalar(breath);
        outerRim.scale.setScalar(breath * 1.01);
        innerCore.scale.setScalar(breath * 0.99);

        // Camera flight interpolation along Z-axis based on scroll
        const targetCamZ = 30 - scrollProgress * 100;
        camera.position.z += (targetCamZ - camera.position.z) * 0.06;
        camera.position.x += (mouse.x * 6 - camera.position.x) * 0.04;
        camera.position.y += (mouse.y * 4 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, targetCamZ - 50);

        // Orbital rings rotation
        orbitalRings.forEach((ring, idx) => {
          ring.rotation.z = elapsed * (0.02 + idx * 0.01) + scrollProgress * (1.0 + idx * 0.5);
          ring.rotation.x = -Math.PI / 2 + (idx * 0.3) + Math.sin(elapsed * 0.5 + idx) * 0.05;
        });

        // Star field subtle rotation
        starField.rotation.y = elapsed * 0.02 + scrollProgress * 1.5;
        starField.rotation.x = scrollProgress * 0.5;

        // Grid subtle movement
        gridHelper.position.z = -scrollProgress * 50;
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
      outerRimGeo.dispose();
      outerRimMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      orbitalRings.forEach(r => { r.geometry.dispose(); (r.material as THREE.Material).dispose(); });
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      // No opacity - fully visible
    />
  );
}