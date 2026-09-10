"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function LidarCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090a, 0.015);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Lidar Point-Cloud Grid
    const cols = 75;
    const rows = 75;
    const count = cols * rows;
    const spacing = 1.2;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorAmber = new THREE.Color("#ff5500");
    const colorDim = new THREE.Color("#22262c");
    const colorGreen = new THREE.Color("#00ff66");

    let idx = 0;
    const halfWidth = (cols * spacing) / 2;
    const halfDepth = (rows * spacing) / 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing - halfWidth;
        const z = j * spacing - halfDepth;
        // Natural topological undulation
        const y = Math.sin(i * 0.15) * Math.cos(j * 0.15) * 2.2;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        basePositions[idx * 3] = x;
        basePositions[idx * 3 + 1] = y;
        basePositions[idx * 3 + 2] = z;

        // Subtle gradient colors based on elevation
        const mixed = colorDim.clone().lerp(colorAmber, (y + 2) / 4.5);
        if (Math.random() < 0.015) {
          // Occasional phosphor green tactical sensor points
          mixed.copy(colorGreen);
        }
        colors[idx * 3] = mixed.r;
        colors[idx * 3 + 1] = mixed.g;
        colors[idx * 3 + 2] = mixed.b;

        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(8, 8, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.65,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Secondary subtle contour wireframe plane below
    const wireGeo = new THREE.PlaneGeometry(cols * spacing, rows * spacing, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x16191d,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.rotation.x = -Math.PI / 2;
    wireMesh.position.y = -3.5;
    scene.add(wireMesh);

    // Mouse tracking & repulsion
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Project mouse into 3D world space
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(plane, hitPoint);

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Update particles
      if (!prefersReducedMotion) {
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const bx = basePositions[i3];
          const by = basePositions[i3 + 1];
          const bz = basePositions[i3 + 2];

          // Wave pulse ripple
          const wave =
            Math.sin(bx * 0.18 + elapsedTime * 1.5) *
            Math.cos(bz * 0.18 + elapsedTime * 1.2) *
            1.4;

          let targetY = by + wave;

          // Mouse distance repulsion
          if (hitPoint) {
            const dx = bx - hitPoint.x;
            const dz = bz - hitPoint.z;
            const distSq = dx * dx + dz * dz;
            const maxDistSq = 85;

            if (distSq < maxDistSq) {
              const force = (1 - distSq / maxDistSq) * 6.5;
              targetY += force;
            }
          }

          // Spring dampening
          posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.12;
        }

        posAttr.needsUpdate = true;

        // Subtle camera orbit based on mouse
        camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03;
        camera.position.y += (18 + mouse.y * 3 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
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
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden opacity-90"
      style={{ zIndex: 1 }}
    />
  );
}
