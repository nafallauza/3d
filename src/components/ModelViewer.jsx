import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Precise 3D key poses and Catmull-Rom spline trajectory across scenes
// Deliberately composed corridors so model NEVER overlaps typography
// Model actively exits (scale: 0, z: -8) during Tentang, Filosofi, Layanan, Proses, Mitra, and Contact
// so that transitions, geometric logo reveals, horizontal storytelling, and forms have 100% unimpeded space.
const SECTION_POSITIONS = [
  // 01 Hero: Dedicated right-hand visual corridor (x: 1.38), scaled gracefully (0.82)
  { id: 'hero', x: 1.38, y: -0.05, z: 0.15, scale: 0.82, rotYOffset: 0 },
  // 02 Manifesto: Left-hand visual corridor (x: -1.35), identical constant scale (0.82)
  { id: 'manifesto', x: -1.35, y: -0.05, z: 0.15, scale: 0.82, rotYOffset: 0.6 },
  // 03 Tentang: Smoothly recedes under the white horizon wave
  { id: 'tentang', x: -1.35, y: -0.05, z: -4.0, scale: 0.0, rotYOffset: 1.3 },
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

    // 7. Mouse, Touch & Orbit Handlers
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (dragRef.current.isDragging) {
        // Clear any text selection that might happen during drag
        if (window.getSelection) {
          const sel = window.getSelection();
          if (sel && sel.rangeCount > 0) sel.removeAllRanges();
        }

        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        dragRef.current.targetRotationY += deltaX * 0.007;
        dragRef.current.targetRotationX += deltaY * 0.007;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
      }
    };

    const handleMouseDown = (e) => {
      // Ignore interactive controls
      if (e.target.closest('button, input, select, a, textarea')) {
        return;
      }

      // Do NOT start 3D rotation if clicking on interactive controls or editorial text columns
      if (e.target.closest('#hero-editorial-column, #manifesto-editorial-column')) {
        return;
      }

      // Allow 3D rotation everywhere as long as model is on-screen (before Tentang white surface completely covers the screen)
      const tentangEl = document.getElementById('tentang');
      if (tentangEl) {
        const tRect = tentangEl.getBoundingClientRect();
        if (tRect.top <= 0) {
          return;
        }
      }

      dragRef.current.isDragging = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;

      // Prevent native browser text selection gesture
      e.preventDefault();
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      }
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    };

    const handleMouseUp = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (e.target.closest('button, input, select, a, textarea, #hero-editorial-column, #manifesto-editorial-column')) return;

        const tentangEl = document.getElementById('tentang');
        if (tentangEl) {
          const tRect = tentangEl.getBoundingClientRect();
          if (tRect.top <= 0) return;
        }

        dragRef.current.isDragging = true;
        dragRef.current.startX = touch.clientX;
        dragRef.current.startY = touch.clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (dragRef.current.isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - dragRef.current.startX;
        const deltaY = touch.clientY - dragRef.current.startY;
        dragRef.current.targetRotationY += deltaX * 0.007;
        dragRef.current.targetRotationX += deltaY * 0.007;
        dragRef.current.startX = touch.clientX;
        dragRef.current.startY = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      dragRef.current.isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

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

        // Continuous Dynamic Stage Tracking & Corridor Interpolation
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const heroEl = document.getElementById('hero');
        const manifestoEl = document.getElementById('manifesto');
        const tentangEl = document.getElementById('tentang');

        const manifestoRect = manifestoEl ? manifestoEl.getBoundingClientRect() : null;
        const tentangRect = tentangEl ? tentangEl.getBoundingClientRect() : null;

        const BASE_SCALE = 0.82;
        let targetX = 1.38;
        let targetY = -0.05 + idleBob;
        let targetZ = 0.15;
        let targetScale = BASE_SCALE;
        let targetRotYOffset = 0;

        // Check if white section (Tentang) has completely enveloped the viewport
        const isTentangArrived = tentangRect && tentangRect.top <= 0;

        if (isTentangArrived) {
          targetScale = 0;
          targetZ = -4.0;
        } else if (!manifestoRect || manifestoRect.top >= vh) {
          // 100% in Hero: Anchor model firmly in right corridor
          targetX = 1.38;
          targetY = -0.05 + idleBob;
          targetZ = 0.15;
          targetScale = BASE_SCALE;
          targetRotYOffset = 0;
        } else if (manifestoRect.top > 0) {
          // Smooth glide across from Hero (right) to Manifesto (left)
          // Progress t from 0 (manifesto enters bottom) to 1 (manifesto reaches top)
          const t = (vh - manifestoRect.top) / vh;
          const smoothT = t * t * (3 - 2 * t);

          targetX = 1.38 + (-1.35 - 1.38) * smoothT;
          targetScale = BASE_SCALE; // Exactly same size!
          targetZ = 0.15;
          targetY = -0.05 + idleBob;
          targetRotYOffset = 0.6 * smoothT;
        } else {
          // Inside Manifesto section and following all the way to the white section!
          // Model stays in left corridor at EXACT SAME SIZE (BASE_SCALE 0.82):
          targetX = -1.35;
          targetScale = BASE_SCALE; // Exactly same size!
          targetZ = 0.15;
          targetY = -0.05 + idleBob;
          targetRotYOffset = 0.6;

          // As the white transition curve scrolls into view near the bottom,
          // the model stays at full size and perfectly interactive until the white curve covers it:
          if (tentangRect && tentangRect.top < vh * 0.35) {
            const exitProgress = Math.max(0, Math.min(1, (vh * 0.35 - tentangRect.top) / (vh * 0.35)));
            const smoothExit = exitProgress * exitProgress * (3 - 2 * exitProgress);
            targetZ = 0.15 + (-3.5 - 0.15) * smoothExit;
            targetScale = BASE_SCALE * (1 - smoothExit);
          }
        }

        if (!isDesktop) {
          targetZ = -2.6;
          targetScale = (manifestoRect && manifestoRect.top < vh * 0.5) ? 0.32 : 0.38;
          targetX = 0;
          targetY = -0.2 + idleBob * 0.5;
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
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';

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