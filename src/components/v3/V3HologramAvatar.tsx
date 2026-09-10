"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { 
  Sparkles, 
  Eye, 
  Box, 
  RefreshCw, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Layers, 
  Cpu, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Laptop
} from "lucide-react";

const USER_PHOTOS = [
  {
    src: "/kabish.jpg",
    title: "Official Passport Identity",
    desc: "Primary frontal passport photo & identity record.",
  },
];

export default function V3HologramAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"fullbody" | "cartoon" | "photo">("fullbody");
  const [styleMode, setStyleMode] = useState<"real" | "cyber">("real");
  const [autoRotate, setAutoRotate] = useState(true);
  const [coords, setCoords] = useState({ yaw: 0, pitch: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);

  const modelGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const originalMaterialsRef = useRef<Map<string, THREE.Material>>(new Map());
  const cyberMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    cyberMaterialRef.current = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x004422,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
    });
  }, []);

  useEffect(() => {
    if (viewMode !== "fullbody") return;

    const container = containerRef.current;
    if (!container) return;

    setIsLoaded(false);

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    cameraRef.current = camera;

    if (viewMode === "fullbody") {
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

    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaf0, 2.6);
    keyLight.position.set(2.5, 3.5, 4.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb0d8ff, 1.5);
    fillLight.position.set(-3.0, 1.8, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xff8c42, 2.8);
    rimLight.position.set(0.0, 3.0, -3.5);
    scene.add(rimLight);

    const groundLight = new THREE.HemisphereLight(0xffffff, 0x1a202c, 1.0);
    scene.add(groundLight);

    // Pedestal
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

    const screenGlow = new THREE.PointLight(0x38bdf8, 1.8, 1.2);
    screenGlow.position.set(0, 0.15, 0.25);
    scene.add(screenGlow);

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      "/kabish_avatar.glb",
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        
        model.position.x = -center.x;
        model.position.y = -box.min.y - 0.54;
        model.position.z = -center.z;

        originalMaterialsRef.current.clear();
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              originalMaterialsRef.current.set(mesh.name || `mesh_${mesh.id}`, mat);

              if (styleMode === "cyber" && cyberMaterialRef.current) {
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
        pitch: Math.round(((currentPitch * 180) / Math.PI)),
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
            pitch: Math.round(((currentPitch * 180) / Math.PI)),
          });
        }

        modelGroupRef.current.rotation.y = currentYaw;
        modelGroupRef.current.rotation.x = currentPitch;

        const breath = Math.sin(elapsedTime * 2.0) * 0.003;
        modelGroupRef.current.position.y = breath;
      }

      ring.rotation.z += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      modelGroupRef.current = null;
    };
  }, [viewMode, zoomLevel]);

  useEffect(() => {
    if (cameraRef.current) {
      const cam = cameraRef.current;
      if (viewMode === "fullbody") {
        cam.position.set(0, 0.22, 2.30 / zoomLevel);
        cam.lookAt(0, 0.06, 0);
      }
    }
  }, [viewMode, zoomLevel]);

  useEffect(() => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name.toLowerCase().includes("screen")) {
          return;
        }

        if (styleMode === "real") {
          const original = originalMaterialsRef.current.get(mesh.name || `mesh_${mesh.id}`);
          if (original) mesh.material = original;
        } else {
          if (cyberMaterialRef.current) {
            mesh.material = cyberMaterialRef.current;
          }
        }
      }
    });
  }, [styleMode]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setZoomLevel(1.0);
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
      setCoords({ yaw: 0, pitch: 0 });
    }
  };

  return (
    <div className="relative w-full max-w-sm border border-blue-500/50 bg-tactical-surface/95 backdrop-blur-2xl p-4 font-mono-tech shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3">
      
      {/* Top Header Strip */}
      <div className="flex items-center justify-between pb-2 border-b border-tactical-border text-[10px]">
        <span className="text-blue-400 font-bold flex items-center gap-1.5">
          <Laptop className="w-3.5 h-3.5 text-blue-400" />
          CODING WORKSPACE // KABISH SRIDAR
        </span>
        <span className="text-tactical-green font-bold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-tactical-green" />
          LIVE CODING RIG
        </span>
      </div>

      {/* Main Viewport Container */}
      <div className="relative aspect-4/5 w-full bg-tactical-base border border-tactical-border overflow-hidden flex items-center justify-center rounded-sm">
        {viewMode === "fullbody" ? (
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
        ) : viewMode === "cartoon" ? (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-tactical-surface">
            <div className="relative w-full h-full">
              <Image
                src="/kabish_cartoon.jpg"
                alt="Kabish Sridar — Stylized Cartoon Character"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 340px"
                priority
              />
            </div>

            {/* Cartoon Badge */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-tactical-base/95 border border-tactical-border p-3 text-[9px] space-y-1 backdrop-blur-md">
              <div className="flex items-center justify-between font-bold text-tactical-ivory">
                <span className="text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  STYLIZED 3D CARTOON AVATAR
                </span>
                <span className="px-1.5 py-0.5 border border-purple-500/40 bg-purple-500/10 text-purple-400 text-[8px] font-mono-tech">
                  DIGITAL ART
                </span>
              </div>
              <p className="text-tactical-dim text-[8px] leading-tight font-mono-tech">
                Stylized 3D character illustration of Kabish Sridar with signature textured quiff and tailored blazer.
              </p>
            </div>
          </div>
        ) : (
          /* Plain Passport Photo View — Pure clean image with NO green squares or reticles */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-tactical-base">
            <div className="relative w-full h-full flex items-center justify-center p-3">
              <div className="relative w-full h-full">
                <Image
                  src={USER_PHOTOS[0].src}
                  alt={USER_PHOTOS[0].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 340px"
                  priority
                />
              </div>
            </div>

            {/* Clean, simple caption */}
            <div className="absolute bottom-2.5 inset-x-2.5 bg-tactical-base/90 border border-tactical-border p-2.5 text-[9px] backdrop-blur-md flex items-center justify-between">
              <span className="text-tactical-ivory font-bold uppercase tracking-wider">
                KABISH SRIDAR // PASSPORT PHOTO
              </span>
              <span className="text-tactical-dim text-[8px] font-mono-tech">
                ORIGINAL ID
              </span>
            </div>
          </div>
        )}

        {/* Telemetry Overlays for 3D viewport */}
        {viewMode === "fullbody" && (
          <>
            <div className="absolute top-2.5 left-2.5 text-[8px] text-blue-400 font-bold bg-tactical-base/85 px-2 py-0.5 border border-tactical-border backdrop-blur-sm">
              YAW: {coords.yaw}° | PITCH: {coords.pitch}°
            </div>

            <div className="absolute top-2.5 right-2.5 text-[8px] text-tactical-green font-bold bg-tactical-base/85 px-2 py-0.5 border border-tactical-border backdrop-blur-sm flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5" />
              <span>DEV METROLOGY</span>
            </div>

            {/* Zoom / Reset Quick Buttons */}
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1">
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
                title="Reset View"
              >
                RESET
              </button>
            </div>

            {/* Auto Rotation Toggle Button */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="absolute bottom-2.5 right-2.5 text-[8px] font-bold bg-tactical-base/85 px-2 py-1 border border-tactical-border text-tactical-ivory hover:text-blue-400 transition-colors flex items-center gap-1 backdrop-blur-sm"
              title="Toggle Auto Rotation"
            >
              <RotateCw className={`w-2.5 h-2.5 ${autoRotate ? "animate-spin" : ""}`} />
              <span>{autoRotate ? "SPIN: ON" : "SPIN: PAUSED"}</span>
            </button>
          </>
        )}
      </div>

      {/* Primary 3-Way Mode Switchers: FULL RIG, CARTOON ME, PASSPORT ID */}
      <div className="grid grid-cols-3 gap-1.5 text-xs">
        <button
          onClick={() => setViewMode("fullbody")}
          className={`py-1.5 px-1 border flex items-center justify-center space-x-1 transition-all text-[10px] font-bold uppercase ${
            viewMode === "fullbody"
              ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.35)]"
              : "border-tactical-border bg-tactical-base text-tactical-muted hover:text-tactical-ivory"
          }`}
        >
          <Box className="w-3 h-3" />
          <span>FULL RIG</span>
        </button>

        <button
          onClick={() => setViewMode("cartoon")}
          className={`py-1.5 px-1 border flex items-center justify-center space-x-1 transition-all text-[10px] font-bold uppercase ${
            viewMode === "cartoon"
              ? "border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.35)]"
              : "border-tactical-border bg-tactical-base text-tactical-muted hover:text-tactical-ivory"
          }`}
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>CARTOON ME</span>
        </button>

        <button
          onClick={() => setViewMode("photo")}
          className={`px-2.5 py-1.5 border transition-all text-[10px] font-bold flex items-center justify-center gap-1 uppercase ${
            viewMode === "photo"
              ? "border-tactical-amber bg-tactical-amber/20 text-tactical-amber shadow-[0_0_10px_rgba(255,170,0,0.25)]"
              : "border-tactical-border bg-tactical-base text-tactical-muted hover:text-tactical-ivory"
          }`}
        >
          <Eye className="w-3 h-3 text-tactical-amber" />
          <span>PASSPORT ID</span>
        </button>
      </div>

      {/* Shading Mode Controls (Only in 3D views) */}
      {viewMode === "fullbody" && (
        <div className="flex items-center justify-between pt-1 border-t border-tactical-border/60 text-[10px]">
          <span className="text-tactical-dim uppercase font-bold flex items-center gap-1">
            <Layers className="w-3 h-3 text-blue-400" />
            SHADER MODE:
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setStyleMode("real")}
              className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
                styleMode === "real"
                  ? "border-blue-400 bg-blue-500/20 text-blue-300"
                  : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
              }`}
            >
              REAL ATTIRE (PBR)
            </button>
            <button
              onClick={() => setStyleMode("cyber")}
              className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
                styleMode === "cyber"
                  ? "border-tactical-green bg-tactical-green/20 text-tactical-green"
                  : "border-tactical-border text-tactical-muted hover:text-tactical-ivory"
              }`}
            >
              CYBER MESH
            </button>
          </div>
        </div>
      )}

      <div className="text-[9px] text-tactical-dim text-center">
        CLICK &amp; DRAG TO ROTATE 360° IN 3D SPACE
      </div>
    </div>
  );
}
