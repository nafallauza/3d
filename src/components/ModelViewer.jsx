import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Precise 3D key poses and Catmull-Rom spline trajectory across scenes
// Deliberately composed corridors so model NEVER overlaps typography
// Model actively exits (scale: 0, z: -8) during Tentang, Filosofi, Layanan, Proses, Mitra, and Contact
// so that transitions, geometric logo reveals, horizontal storytelling, and forms have 100% unimpeded space.
const SECTION_POSITIONS = [
  // 01 Hero: Dedicated right-hand visual corridor (x: 1.35), completely free from left-hand headline
  { id: 'hero', x: 1.35, y: -0.05, z: 0.25, scale: 0.95, rotYOffset: 0 },
  // 02 Manifesto: Far right corridor (x: 1.85), ensuring > 220px perceived negative space from text column
  { id: 'manifesto', x: 1.85, y: 0.05, z: -0.25, scale: 0.68, rotYOffset: 0.6 },
  // 03 Tentang: Smoothly recedes into depth as organic white horizon wave envelops the screen
  { id: 'tentang', x: 1.85, y: -0.6, z: -5.0, scale: 0.0, rotYOffset: 1.3 },
  // 04 Filosofi: Completely hidden so the layered geometric logo reveal commands 100% focal attention
  { id: 'filosofi', x: 0.0, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 2.2 },
  // 05 Layanan: Exited completely from interactive index
  { id: 'layanan', x: -1.6, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 3.1 },
  // 06 Proses: Completely hidden so horizontal panels move unimpeded without visual competition
  { id: 'proses', x: 1.2, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 3.9 },
  // 07 Visi-Misi: Exited
  { id: 'visi-misi', x: -1.2, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 4.7 },
  // 08 Mitra: Exited so partner collaboration text and marquee breathe freely
  { id: 'mitra', x: 0.0, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 5.3 },
  // 09 Kontak: Exited so consultation form has zero obstruction
  { id: 'kontak', x: 1.2, y: -0.8, z: -8.0, scale: 0.0, rotYOffset: 5.9 },
];

const SPLINE_POINTS = SECTION_POSITIONS.map(p => new THREE.Vector3(p.x, p.y, p.z));
const spatialSpline = new THREE.CatmullRomCurve3(SPLINE_POINTS, false, 'catmullrom', 0.2);

export default function ModelViewer({ scrollProgress }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [webglError, setWebglError] = useState(false);

  // References
  const sceneRef = useRef(null);
  const modelRef = useRef(null);
  const baseScaleRef = useRef(1);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

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
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL support
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebglError(true);
        setLoading(false);
        return;
      }
    } catch (e) {
      setWebglError(true);
      setLoading(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      38,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.6);
    cameraRef.current = camera;

    // 3. Ultra-Crisp Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      setWebglError(true);
      setLoading(false);
      return;
    }

    // 3. Ultra-Crisp ACESFilmic Renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.90;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // 4. Subtle Studio HDRI Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. Option B: Refined Architectural Studio Lighting
    // Controlled neutral illumination that clarifies ribbons & geometric curvature without blowout
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.50);
    sunLight.position.set(5, 7, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 0.55);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 0.85);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    // Soft Ground Shadow
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.16 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.8;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Load GLB Model applying Option B Refined Architectural Baseline
    // Preserves authentic mesh geometry, vertex chain colors, and textures 100%
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

        // Apply Option B PBR Material Calibration across all 39 sub-materials
        // Retains authentic colors while providing restrained satin sheen and edge curvature
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              const applyArchitecturalMat = (mat) => {
                mat.roughness = 0.52;
                mat.metalness = 0.08;
                mat.envMapIntensity = 0.22;
                mat.needsUpdate = true;
              };
              if (Array.isArray(child.material)) {
                child.material.forEach(applyArchitecturalMat);
              } else {
                applyArchitecturalMat(child.material);
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
        setWebglError(true);
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
        dragRef.current.targetRotationY += deltaX * 0.007;
        dragRef.current.targetRotationX += deltaY * 0.007;
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Dynamic Section Interpolation Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let currentScale = 0.2; // Smooth entrance bloom matching headline stagger

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      dragRef.current.rotationX += (dragRef.current.targetRotationX - dragRef.current.rotationX) * 0.08;
      dragRef.current.rotationY += (dragRef.current.targetRotationY - dragRef.current.rotationY) * 0.08;

      if (modelRef.current) {
        const idleBob = Math.sin(elapsedTime * 0.9) * 0.035;
        const isDesktop = window.innerWidth >= 1024;

        // Continuous Section Progress Tracking
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const viewCenter = scrollY + vh * 0.45;

        let currentSectionIdx = 0;
        let blendFactor = 0;
        const numIntervals = SECTION_POSITIONS.length - 1;

        for (let i = 0; i < SECTION_POSITIONS.length; i++) {
          const el = document.getElementById(SECTION_POSITIONS[i].id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const height = rect.height;
          const bottom = top + height;

          if (viewCenter >= top && viewCenter <= bottom) {
            currentSectionIdx = i;
            blendFactor = Math.max(0, Math.min(1, (viewCenter - top) / height));
            break;
          } else if (viewCenter < top && i === 0) {
            currentSectionIdx = 0;
            blendFactor = 0;
            break;
          } else if (i === numIntervals && viewCenter > bottom) {
            currentSectionIdx = i;
            blendFactor = 1;
            break;
          }
        }

        // Normalized Catmull-Rom spline coordinate evaluation (uniform segment parameter t)
        const rawT = Math.max(0, Math.min(1, (currentSectionIdx + blendFactor) / numIntervals));
        const splinePos = spatialSpline.getPoint(rawT);

        // Smooth Hermite blend for scale and rotation offset to eliminate angular jerk
        const activeTarget = SECTION_POSITIONS[currentSectionIdx];
        const nextTarget = SECTION_POSITIONS[Math.min(currentSectionIdx + 1, numIntervals)];
        const smoothBlend = blendFactor * blendFactor * (3 - 2 * blendFactor); // Smoothstep
        const rawScale = activeTarget.scale + (nextTarget.scale - activeTarget.scale) * smoothBlend;
        const targetRotYOffset = (activeTarget.rotYOffset || 0) + ((nextTarget.rotYOffset || 0) - (activeTarget.rotYOffset || 0)) * smoothBlend;

        // Apply column offset on desktop vs mobile so typography is never obscured
        let targetX = splinePos.x;
        let targetY = splinePos.y + idleBob;
        let targetZ = splinePos.z;
        let targetScale = rawScale;

        if (!isDesktop) {
          targetZ = -2.6;
          targetScale = currentSectionIdx === 0 ? rawScale * 0.42 : rawScale * 0.32;

          if (currentSectionIdx === 0) {
            targetX = 0;
            const stageEl = document.getElementById('hero-3d-stage');
            if (stageEl) {
              const rect = stageEl.getBoundingClientRect();
              const stageCenterY = rect.top + rect.height * 0.5;
              // Map screen pixels to 3D camera space (~5.65 units high at z=-2.6)
              targetY = (vh * 0.5 - stageCenterY) * (5.65 / vh) + idleBob * 0.5;
            } else {
              targetY = -1.2;
            }
          } else {
            targetX = splinePos.x * 0.15;
            targetY = splinePos.y * 0.4 - 0.45 + idleBob * 0.5;
          }
        }

        // Base continuous rotation + drag + mouse parallax
        const baseRotY = scrollY * 0.0016 + elapsedTime * 0.08 + targetRotYOffset;
        const baseRotX = mouseRef.current.y * 0.1;

        // Smooth spatial lerp with damped inertia
        modelRef.current.position.x += (targetX - modelRef.current.position.x) * 0.065;
        modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.065;
        modelRef.current.position.z += (targetZ - modelRef.current.position.z) * 0.065;

        currentScale += (targetScale - currentScale) * 0.065;
        if (currentScale < 0.008) {
          modelRef.current.visible = false;
          modelRef.current.scale.setScalar(0);
        } else {
          modelRef.current.visible = true;
          modelRef.current.scale.setScalar(currentScale);
        }

        modelRef.current.rotation.y += (baseRotY + dragRef.current.rotationY + mouseRef.current.x * 0.2 - modelRef.current.rotation.y) * 0.07;
        modelRef.current.rotation.x += (baseRotX + dragRef.current.rotationX - modelRef.current.rotation.x) * 0.07;
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

  if (webglError) {
    return (
      <div className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="bg-[#0D192E]/90 border border-white/10 p-6 max-w-sm text-center">
          <p className="font-mono text-xs text-white/60">
            [ WebGL Accelerated Visualization Offline ]
          </p>
        </div>
      </div>
    );
  }

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