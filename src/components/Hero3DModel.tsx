"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import {
  Sparkles,
  Box,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Terminal as TerminalIcon,
  Shirt,
  UserCheck,
  Briefcase
} from "lucide-react";

interface Hero3DModelProps {
  initialMode?: "3d" | "cyber" | "photo";
}

const REFERENCE_PHOTOS = [
  {
    src: "/kabish.jpg",
    title: "OFFICIAL PASSPORT // IDENTITY VERIFICATION",
    desc: "Primary frontal facial landmark & identity biometric record.",
  },
];

export default function Hero3DModel({ initialMode = "3d" }: Hero3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"3d" | "cyber" | "photo">(initialMode);
  const [frameMode, setFrameMode] = useState<"fullbody" | "laptop">("fullbody");
  const [autoRotate, setAutoRotate] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [coords, setCoords] = useState({ yaw: 0, pitch: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const modelGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const originalMaterialsRef = useRef<Map<string, THREE.Material>>(new Map());
  const cyberMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Initialize Cyber Wireframe Material
  useEffect(() => {
    cyberMaterialRef.current = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x004422,
      wireframe: true,
      roughness: 0.15,
      metalness: 0.85,
    });
  }, []);

  // Three.js Scene Setup & Model Loading
  useEffect(() => {
    if (viewMode === "photo") return;

    const container = containerRef.current;
    if (!container) return;

    setIsLoaded(false);

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;

    // Camera framing based on full body vs laptop close-up
    if (frameMode === "fullbody") {
      camera.position.set(0, 0.22, 2.30 / zoomLevel);
      camera.lookAt(0, 0.06, 0);
    } else {
      camera.position.set(0, 0.28, 1.30 / zoomLevel);
      camera.lookAt(0, 0.16, 0);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.45);
    scene.add(ambientLight);

    // Front Key Light
    const keyLight = new THREE.DirectionalLight(0xfffaf0, 2.6);
    keyLight.position.set(2.5, 3.5, 4.0);
    scene.add(keyLight);

    // Cool Fill Light
    const fillLight = new THREE.DirectionalLight(0xb0d8ff, 1.5);
    fillLight.position.set(-3.0, 1.8, 2.5);
    scene.add(fillLight);

    // Warm Amber Rim Light
    const rimLight = new THREE.DirectionalLight(0xff8c42, 2.8);
    rimLight.position.set(0.0, 3.0, -3.5);
    scene.add(rimLight);

    // Soft Ground Light
    const groundLight = new THREE.HemisphereLight(0xffffff, 0x1a202c, 1.0);
    scene.add(groundLight);

    // Sleek Holographic Turntable Pedestal Base
    const pedestalGeo = new THREE.CylinderGeometry(0.68, 0.72, 0.02, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0b1320,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x002244,
      emissiveIntensity: 0.35,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.56;
    scene.add(pedestal);

    // Rotating Glowing Neon Ring around pedestal
    const ringGeo = new THREE.RingGeometry(0.69, 0.71, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.55;
    scene.add(ring);

    // Floating Code Hologram Disc underneath
    const subRingGeo = new THREE.RingGeometry(0.50, 0.52, 48);
    const subRingMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const subRing = new THREE.Mesh(subRingGeo, subRingMat);
    subRing.rotation.x = -Math.PI / 2;
    subRing.position.y = -0.548;
    scene.add(subRing);

    // Additional Screen Accent Light
    const screenGlow = new THREE.PointLight(0x38bdf8, 1.8, 1.2);
    screenGlow.position.set(0, 0.15, 0.25);
    scene.add(screenGlow);

    // Load Pre-Baked High-Poly Coding Avatar GLB with MeshoptDecoder
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      "/kabish_avatar.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Center feet on pedestal base
        model.position.x = -center.x;
        model.position.y = -box.min.y - 0.54;
        model.position.z = -center.z;

        // Store original materials & configure meshes
        originalMaterialsRef.current.clear();
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              originalMaterialsRef.current.set(mesh.name || `mesh_${mesh.id}`, mat);

              // Apply cyber mode if active
              if (viewMode === "cyber" && cyberMaterialRef.current) {
                // Keep screen emitting light
                if (!mesh.name.toLowerCase().includes("screen")) {
                  mesh.material = cyberMaterialRef.current;
                }
              }
            }
          }
        });

        const rootGroup = new THREE.Group();
        rootGroup.add(model);
        scene.add(rootGroup);
        modelGroupRef.current = rootGroup;
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading GLB avatar:", err);
      }
    );

    // Mouse & Touch Drag Rotation
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let currentYaw = 0;
    let currentPitch = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      currentYaw += deltaX * 0.015;
      currentPitch = Math.max(-0.35, Math.min(0.35, currentPitch + deltaY * 0.01));

      setCoords({
        yaw: Math.round(((currentYaw * 180) / Math.PI) % 360),
        pitch: Math.round((currentPitch * 180) / Math.PI),
      });
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      currentYaw += deltaX * 0.015;
      currentPitch = Math.max(-0.35, Math.min(0.35, currentPitch + deltaY * 0.01));

      setCoords({
        yaw: Math.round(((currentYaw * 180) / Math.PI) % 360),
        pitch: Math.round((currentPitch * 180) / Math.PI),
      });
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroupRef.current) {
        if (autoRotate && !isDragging) {
          currentYaw -= 0.007;
          setCoords({
            yaw: Math.round(((currentYaw * 180) / Math.PI) % 360),
            pitch: Math.round((currentPitch * 180) / Math.PI),
          });
        }

        modelGroupRef.current.rotation.y = currentYaw;
        modelGroupRef.current.rotation.x = currentPitch;

        // Subtle realistic breathing micro-motion
        const breath = Math.sin(elapsedTime * 2.0) * 0.003;
        modelGroupRef.current.position.y = breath;
      }

      // Rotate subtle holographic rings
      ring.rotation.z += 0.005;
      subRing.rotation.z -= 0.008;

      renderer.render(scene, camera);
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

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      modelGroupRef.current = null;
    };
  }, [viewMode]);

  // Update Camera dynamically on zoomLevel or frameMode changes without re-initializing scene
  useEffect(() => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    if (frameMode === "fullbody") {
      camera.position.set(0, 0.22, 2.30 / zoomLevel);
      camera.lookAt(0, 0.06, 0);
    } else {
      camera.position.set(0, 0.28, 1.30 / zoomLevel);
      camera.lookAt(0, 0.16, 0);
    }
  }, [zoomLevel, frameMode]);

  // Handle Shader Mode Change
  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name.toLowerCase().includes("screen")) {
          return;
        }

        if (viewMode === "3d") {
          const original = originalMaterialsRef.current.get(mesh.name || `mesh_${mesh.id}`);
          if (original) mesh.material = original;
        } else if (viewMode === "cyber" && cyberMaterialRef.current) {
          mesh.material = cyberMaterialRef.current;
        }
      }
    });
  }, [viewMode]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoomLevel(1.0);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
      setCoords({ yaw: 0, pitch: 0 });
    }
  };

  return (
    <div className="w-full space-y-2.5 font-mono-tech">
      
      {/* Top Header Controls: 3D vs Cyber vs Cartoon vs Photo */}
      <div className="flex items-center justify-between pb-2 border-b border-tactical-border text-[10px]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setViewMode("3d")}
            className={`px-2 py-1 border transition-all text-[9px] font-bold flex items-center gap-1 ${
              viewMode === "3d"
                ? "border-blue-400 bg-blue-500/20 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
            }`}
          >
            <Laptop className="w-3 h-3 text-blue-400" />
            <span>CODING 3D</span>
          </button>

          <button
            onClick={() => setViewMode("cyber")}
            className={`px-2 py-1 border transition-all text-[9px] font-bold flex items-center gap-1 ${
              viewMode === "cyber"
                ? "border-tactical-green bg-tactical-green/20 text-tactical-green shadow-[0_0_10px_rgba(0,255,102,0.3)]"
                : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
            }`}
          >
            <Box className="w-3 h-3 text-tactical-green" />
            <span>CYBER MESH</span>
          </button>

          <button
            onClick={() => setViewMode("cartoon" as any)}
            className={`px-2 py-1 border transition-all text-[9px] font-bold flex items-center gap-1 ${
              (viewMode as any) === "cartoon"
                ? "border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>CARTOON ME</span>
          </button>

          <button
            onClick={() => setViewMode("photo")}
            className={`px-2 py-1 border transition-all text-[9px] font-bold flex items-center gap-1 ${
              viewMode === "photo"
                ? "border-tactical-amber bg-tactical-amber/20 text-tactical-amber"
                : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
            }`}
          >
            <Eye className="w-3 h-3 text-tactical-amber" />
            <span>PASSPORT ID</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Frame */}
      <div className="relative aspect-4/5 w-full bg-tactical-base border border-tactical-border overflow-hidden flex items-center justify-center rounded-sm">
        {viewMode === "3d" || viewMode === "cyber" ? (
          <div
            ref={containerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none touch-none"
          >
            {!isLoaded && (
              <div className="text-[11px] text-blue-400 animate-pulse font-bold flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                LOADING CODING 3D RIG &amp; LAPTOP...
              </div>
            )}
          </div>
        ) : (viewMode as any) === "cartoon" ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-tactical-surface">
            <div className="relative w-full h-full">
              <Image
                src="/kabish_cartoon.jpg"
                alt="Kabish Sridar — Stylized Cartoon Character"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
                priority
              />
            </div>

            <div className="absolute bottom-2 inset-x-2 bg-tactical-base/90 border border-tactical-border p-2.5 text-[9px] backdrop-blur-md flex items-center justify-between">
              <span className="text-purple-400 uppercase tracking-wider font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                STYLIZED 3D CARTOON AVATAR
              </span>
              <span className="text-tactical-dim text-[8px] font-mono-tech">
                DIGITAL ART
              </span>
            </div>
          </div>
        ) : (
          /* Plain Passport Photo View — Pure clean image with NO green squares or reticles */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-tactical-base">
            <div className="relative w-full h-full flex items-center justify-center p-3">
              <div className="relative w-full h-full">
                <Image
                  src={REFERENCE_PHOTOS[0].src}
                  alt={REFERENCE_PHOTOS[0].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 350px"
                  priority
                />
              </div>
            </div>

            <div className="absolute bottom-2 inset-x-2 bg-tactical-base/90 border border-tactical-border p-2.5 text-[9px] backdrop-blur-md flex items-center justify-between">
              <span className="text-tactical-ivory font-bold uppercase tracking-wider">
                KABISH SRIDAR // PASSPORT PHOTO
              </span>
              <span className="text-tactical-dim text-[8px] font-mono-tech">
                ORIGINAL ID
              </span>
            </div>
          </div>
        )}

        {/* Floating Telemetry Badges */}
        {viewMode !== "photo" && (
          <>
            <div className="absolute top-2 left-2 text-[8px] text-blue-400 font-bold bg-tactical-base/85 px-2 py-0.5 border border-tactical-border backdrop-blur-sm flex items-center gap-1">
              <TerminalIcon className="w-2.5 h-2.5 text-blue-400" />
              <span>YAW: {coords.yaw}° | PITCH: {coords.pitch}°</span>
            </div>

            <div className="absolute top-2 right-2 text-[8px] text-tactical-green font-bold bg-tactical-base/85 px-2 py-0.5 border border-tactical-border backdrop-blur-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tactical-green animate-pulse" />
              <span>LIVE CODING RIG</span>
            </div>

            {/* Quick Zoom & Reset Controls */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <button
                onClick={handleZoomIn}
                className="bg-tactical-base/85 border border-tactical-border text-tactical-ivory hover:text-blue-400 p-1 text-[9px]"
                title="Zoom In"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
              <button
                onClick={handleZoomOut}
                className="bg-tactical-base/85 border border-tactical-border text-tactical-ivory hover:text-blue-400 p-1 text-[9px]"
                title="Zoom Out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <button
                onClick={handleReset}
                className="bg-tactical-base/85 border border-tactical-border text-tactical-muted hover:text-tactical-ivory px-1.5 py-0.5 text-[8px] font-bold"
                title="Reset Rotation"
              >
                RESET
              </button>
            </div>

            {/* Auto-Rotation Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="absolute bottom-2 right-2 text-[8px] font-bold bg-tactical-base/85 px-2 py-1 border border-tactical-border text-tactical-ivory hover:text-blue-400 transition-colors flex items-center gap-1 backdrop-blur-sm"
              title="Toggle Auto Rotation"
            >
              <RotateCw className={`w-2.5 h-2.5 ${autoRotate ? "animate-spin" : ""}`} />
              <span>{autoRotate ? "SPIN: ON" : "PAUSED"}</span>
            </button>
          </>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between text-[8px] text-tactical-dim px-1">
        <span>CLICK &amp; DRAG TO ROTATE 360° AROUND WORKSPACE</span>
        <span className="text-blue-400 font-semibold">AI VISION &amp; EMBEDDED IDE</span>
      </div>
    </div>
  );
}
