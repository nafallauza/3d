import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Compass, Eye, Sparkles, Move, Maximize2 } from 'lucide-react';

const SECTION_POSITIONS = [
  { id: 'hero', x: 0.85, y: -0.15, z: 0.1, scale: 0.95 },
  { id: 'tentang', x: -1.35, y: 0.0, z: 0.15, scale: 0.88 },
  { id: 'filosofi', x: 1.35, y: -0.1, z: 0.15, scale: 0.92 },
  { id: 'layanan', x: -1.3, y: 0.0, z: 0.1, scale: 0.86 },
  { id: 'visi-misi', x: 1.3, y: 0.0, z: 0.2, scale: 0.88 },
  { id: 'mitra', x: 0, y: -0.6, z: -2.2, scale: 0.45 },
  { id: 'kontak', x: -1.2, y: 0.0, z: 0.1, scale: 0.85 },
];

export default function ModelViewer({ scrollProgress }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // References
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const baseScaleRef = useRef(1);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    rotationX: 0,
    rotationY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);
    cameraRef.current = camera;

    // 3. Ultra-Crisp High-Performance Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Subtle Studio HDRI Environment Reflections (Natural, Non-Bleaching)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Clean, Neutral Studio Lighting (Preserves authentic Blender material colors)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(5, 8, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.4);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 1.6);
    rimLight.position.set(0, -4, -5);
    scene.add(rimLight);

    // Soft Top Key Light (Balanced white to preserve native hue)
    const topKeyLight = new THREE.PointLight(0xffffff, 1.5, 12);
    topKeyLight.position.set(0, 4, 2);
    scene.add(topKeyLight);

    // Soft Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.8;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Load GLB Model preserving Blender's native materials, colors & textures
    const loader = new GLTFLoader();
    loader.load(
      '/model.glb',
      (gltf) => {
        const model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.7 / maxDim;
        baseScaleRef.current = targetScale;
        model.scale.setScalar(targetScale);

        // Keep Blender's authentic colors, vertex colors, textures, and roughness intact
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const preserveMat = (mat) => {
                mat.envMapIntensity = 0.35;
                mat.needsUpdate = true;
              };
              if (Array.isArray(child.material)) {
                child.material.forEach(preserveMat);
              } else {
                preserveMat(child.material);
              }
            }
          }
        });

        // Clean pivot mount
        const pivot = new THREE.Group();
        pivot.add(model);
        scene.add(pivot);
        modelRef.current = pivot;

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load 3D model:', error);
        setLoading(false);
      }
    );

    // 7. Mouse & Orbit Handlers
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (dragRef.current.isDragging) {
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        dragRef.current.targetRotationY += deltaX * 0.008;
        dragRef.current.targetRotationX += deltaY * 0.008;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      if (!e.target.closest('button, input, select, a, textarea')) {
        dragRef.current.isDragging = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Flawless DOM-Section Dynamic Targeting Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let currentScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      dragRef.current.rotationX += (dragRef.current.targetRotationX - dragRef.current.rotationX) * 0.1;
      dragRef.current.rotationY += (dragRef.current.targetRotationY - dragRef.current.rotationY) * 0.1;

      if (modelRef.current) {
        const idleBob = Math.sin(elapsedTime * 0.8) * 0.04;
        const isDesktop = window.innerWidth >= 1024;

        // Accurate Section Tracking via Document Coordinates
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const viewCenter = scrollY + vh * 0.45;

        let activeTarget = SECTION_POSITIONS[0];
        let nextTarget = SECTION_POSITIONS[0];
        let blendFactor = 0;

        for (let i = 0; i < SECTION_POSITIONS.length; i++) {
          const el = document.getElementById(SECTION_POSITIONS[i].id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const height = rect.height;
          const bottom = top + height;

          if (viewCenter >= top && viewCenter <= bottom) {
            activeTarget = SECTION_POSITIONS[i];
            const nextIdx = Math.min(i + 1, SECTION_POSITIONS.length - 1);
            nextTarget = SECTION_POSITIONS[nextIdx];
            blendFactor = Math.max(0, Math.min(1, (viewCenter - top) / height));
            break;
          } else if (viewCenter < top && i === 0) {
            activeTarget = SECTION_POSITIONS[0];
            nextTarget = SECTION_POSITIONS[0];
            blendFactor = 0;
            break;
          }
        }

        // Interpolate between current section and next section
        const rawX = activeTarget.x + (nextTarget.x - activeTarget.x) * blendFactor;
        const rawY = activeTarget.y + (nextTarget.y - activeTarget.y) * blendFactor;
        const rawZ = activeTarget.z + (nextTarget.z - activeTarget.z) * blendFactor;
        const rawScale = activeTarget.scale + (nextTarget.scale - activeTarget.scale) * blendFactor;

        // Apply desktop vs mobile column offset so model NEVER obscures typography
        const targetX = isDesktop ? rawX : rawX * 0.35;
        const targetY = rawY + idleBob;
        const targetZ = isDesktop ? rawZ : (rawZ < -1.5 ? rawZ : -1.8);
        const targetScale = isDesktop ? rawScale : rawScale * 0.62;

        // Base continuous rotation + drag + mouse parallax
        const baseRotY = scrollY * 0.0018 + elapsedTime * 0.1;
        const baseRotX = mouseRef.current.y * 0.12;

        // Smooth spatial lerp
        modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.07;
        modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.07;
        modelRef.current.position.z += (targetZ - modelRef.current.position.z) * 0.07;

        currentScale += (targetScale - currentScale) * 0.07;
        modelRef.current.scale.setScalar(currentScale);

        modelRef.current.rotation.y += (baseRotY + dragRef.current.rotationY + mouseRef.current.x * 0.2 - modelRef.current.rotation.y) * 0.08;
        modelRef.current.rotation.x += (baseRotX + dragRef.current.rotationX - modelRef.current.rotation.x) * 0.08;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m?.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
        scene.remove(modelRef.current);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="ROTATE 360°"
      className="fixed inset-0 z-10 overflow-hidden cursor-grab active:cursor-grabbing pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
}
