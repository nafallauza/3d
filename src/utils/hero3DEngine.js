import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize the Relocated /model.glb 3D Viewer in #commissioning
 * Only renders when near the viewport so there is zero competing loop during #hero.
 */
function initRelocatedGlbStage() {
  const canvas = document.querySelector('[data-glb-stage]');
  if (!canvas) return () => {};

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    return () => {};
  }

  const getBounds = () => ({
    w: canvas.clientWidth || 640,
    h: canvas.clientHeight || 480,
  });

  const { w, h } = getBounds();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
  camera.position.set(0, 0.1, 5.2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 7, 5);
  scene.add(dirLight);

  let pivot = null;
  const loader = new GLTFLoader();
  loader.load(
    '/model.glb',
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      model.position.set(-center.x, -center.y, -center.z);
      const maxDim = Math.max(size.x, size.y, size.z);
      model.scale.setScalar(2.6 / maxDim);

      const group = new THREE.Group();
      group.add(model);
      scene.add(group);
      pivot = group;
    },
    undefined,
    () => {}
  );

  let isVisible = false;
  let rafId = null;
  let dragRotY = 0;
  let isDragging = false;
  let prevX = 0;

  const onDown = (e) => {
    isDragging = true;
    prevX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? prevX;
    dragRotY += (x - prevX) * 0.01;
    prevX = x;
  };
  const onUp = () => {
    isDragging = false;
  };

  const previousTouchAction = canvas.style.touchAction;
  canvas.style.touchAction = 'pan-y';
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    canvas.setPointerCapture(event.pointerId);
    onDown(event);
  };
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('lostpointercapture', onUp);

  const clock = new THREE.Clock();
  const loop = () => {
    if (!isVisible) {
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    if (pivot) {
      pivot.rotation.y = t * 0.22 + dragRotY;
      pivot.position.y = Math.sin(t * 1.1) * 0.05;
    }
    renderer.render(scene, camera);
  };

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      isVisible = Boolean(entry && entry.isIntersecting);
      if (isVisible && !rafId) {
        const { w: nw, h: nh } = getBounds();
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh, false);
        rafId = requestAnimationFrame(loop);
      }
    },
    { threshold: 0.01, rootMargin: '150px 0px' }
  );
  io.observe(canvas);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    io.disconnect();
    canvas.style.touchAction = previousTouchAction;
    canvas.removeEventListener('pointerdown', onPointerDown);
    canvas.removeEventListener('pointermove', onMove);
    canvas.removeEventListener('pointerup', onUp);
    canvas.removeEventListener('pointercancel', onUp);
    canvas.removeEventListener('lostpointercapture', onUp);
    renderer.dispose();
  };
}

/**
 * TARA REKAYASA — CINEMATIC CRYSTAL HERO
 * Original 3D Cubic Ionic Lattice Sculpture (inspired by NaCl crystal geometry)
 * + Genuine Scroll-Linked Deconstruction into a Field of Fine Vertical Lines & Geometric Fragments
 */
export function initHero3DModel() {
  const canvas = document.querySelector('[data-scroll-video]');
  const linesCanvas = document.querySelector('[data-crystal-lines]');
  const scrollArea = document.querySelector('.hero-scroll-area');
  if (!canvas) return () => {};

  const cleanupRelocated = initRelocatedGlbStage();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  let renderer = null;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    console.warn('WebGL Crystal Hero using 3D software projection:', e);
    renderer = null;
  }

  const getBounds = () => ({
    w: canvas.clientWidth || window.innerWidth,
    h: canvas.clientHeight || window.innerHeight,
  });

  const { w, h } = getBounds();
  const dpr = Math.min(window.devicePixelRatio || 1, 2.0);
  if (renderer) {
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // Setup 2D High-DPI Overlay Canvas for Vertical Line & Geometric Fragment Deconstruction
  let linesCtx = null;
  const syncLinesCanvasSize = () => {
    if (!linesCanvas) return;
    const bw = linesCanvas.clientWidth || window.innerWidth;
    const bh = linesCanvas.clientHeight || window.innerHeight;
    linesCanvas.width = Math.round(bw * dpr);
    linesCanvas.height = Math.round(bh * dpr);
    linesCtx = linesCanvas.getContext('2d');
    if (linesCtx) linesCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  syncLinesCanvasSize();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, w / h, 0.1, 100);
  camera.position.set(0, -0.04, isMobile ? 8.4 : 6.85);

  // Studio Environment Reflections
  if (renderer) {
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (envErr) {
      console.warn('PMREM environment fallback:', envErr);
    }
  }

  // Controlled Studio Lighting for Refined Satin Materials
  const ambientLight = new THREE.AmbientLight(0xf5f3ee, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.1);
  keyLight.position.set(5, 8, 6);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xdce8f7, 0.9);
  fillLight.position.set(-6, 3, 2);
  scene.add(fillLight);

  const rimLightBlue = new THREE.DirectionalLight(0x0b70ad, 1.15);
  rimLightBlue.position.set(-4, -3, -5);
  scene.add(rimLightBlue);

  const rimLightRed = new THREE.DirectionalLight(0xc91c22, 0.75);
  rimLightRed.position.set(4, -2, -4);
  scene.add(rimLightRed);

  // Soft Ground Contact Shadow on the Warm Off-White Surface
  const shadowGeo = new THREE.PlaneGeometry(14, 14);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.13 });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.72;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // ---------------------------------------------------------------------------
  // BUILD ENGINEERED CUBIC IONIC LATTICE SCULPTURE (NaCl Inspired)
  // ---------------------------------------------------------------------------
  const crystalGroup = new THREE.Group();
  scene.add(crystalGroup);

  // Satin Engineered Materials (Tara Rekayasa Palette)
  const matNavySatin = new THREE.MeshStandardMaterial({
    color: 0x091526,
    roughness: 0.3,
    metalness: 0.26,
    envMapIntensity: 0.9,
  });

  const matAlabasterSatin = new THREE.MeshStandardMaterial({
    color: 0xe2dfd7,
    roughness: 0.34,
    metalness: 0.18,
    envMapIntensity: 0.85,
  });

  const matBlueSatin = new THREE.MeshStandardMaterial({
    color: 0x0b70ad,
    roughness: 0.26,
    metalness: 0.24,
    envMapIntensity: 1.0,
  });

  const matRedSatin = new THREE.MeshStandardMaterial({
    color: 0xc91c22,
    roughness: 0.28,
    metalness: 0.22,
    envMapIntensity: 1.0,
  });

  const matStrutVertical = new THREE.MeshStandardMaterial({
    color: 0x0b192e,
    roughness: 0.35,
    metalness: 0.35,
    envMapIntensity: 0.8,
  });

  const matStrutHorizontal = new THREE.MeshStandardMaterial({
    color: 0x1b3459,
    roughness: 0.4,
    metalness: 0.3,
    envMapIntensity: 0.7,
  });

  const matCollar = new THREE.MeshStandardMaterial({
    color: 0x0b70ad,
    roughness: 0.25,
    metalness: 0.45,
  });

  const N = isMobile ? 3 : 4; // 4x4x4 cubic ionic lattice (64 engineered nodes)
  const spacing = isMobile ? 0.68 : 0.56;
  const offset = ((N - 1) * spacing) / 2;

  const sphereLargeGeo = new THREE.SphereGeometry(0.118, 28, 28);
  const collarGeo = new THREE.TorusGeometry(0.138, 0.011, 10, 28);
  const octaChamferGeo = new THREE.IcosahedronGeometry(0.088, 1);
  const coreCubeGeo = new THREE.BoxGeometry(0.135, 0.135, 0.135);

  const nodesData = [];
  const verticalStruts = [];
  const horizontalStruts = [];

  for (let ix = 0; ix < N; ix++) {
    for (let iy = 0; iy < N; iy++) {
      for (let iz = 0; iz < N; iz++) {
        const bx = ix * spacing - offset;
        const by = iy * spacing - offset;
        const bz = iz * spacing - offset;

        // NaCl alternating ionic coordination parity
        const parity = (ix + iy + iz) % 2;
        const isInnerCore =
          ix >= 1 && ix <= N - 2 && iy >= 1 && iy <= N - 2 && iz >= 1 && iz <= N - 2;
        const isCorner =
          (ix === 0 || ix === N - 1) &&
          (iy === 0 || iy === N - 1) &&
          (iz === 0 || iz === N - 1);

        const nodeHolder = new THREE.Group();
        nodeHolder.position.set(bx, by, bz);

        let mainMesh;
        if (parity === 0) {
          // Cl- inspired structural node: satin sphere + precision equatorial ring
          const mat = (ix + iz) % 2 === 0 ? matNavySatin : matAlabasterSatin;
          mainMesh = new THREE.Mesh(sphereLargeGeo, mat);
          mainMesh.castShadow = true;
          mainMesh.receiveShadow = true;
          nodeHolder.add(mainMesh);

          const ring = new THREE.Mesh(collarGeo, isCorner ? matRedSatin : matCollar);
          ring.rotation.x = Math.PI / 2;
          nodeHolder.add(ring);
        } else {
          // Na+ inspired ionic coordination node: faceted polyhedron / precision cube
          const useRed = isInnerCore && (ix + iy + iz) % 3 === 0;
          const mat = useRed ? matRedSatin : matBlueSatin;
          mainMesh = new THREE.Mesh(isInnerCore ? coreCubeGeo : octaChamferGeo, mat);
          mainMesh.castShadow = true;
          mainMesh.receiveShadow = true;
          nodeHolder.add(mainMesh);
        }

        crystalGroup.add(nodeHolder);

        // Deterministic deconstruction parameters per node
        const colIndex = ix * N + iz;
        const shearDirection = (ix + iz) % 2 === 0 ? 1 : -1;
        const verticalRank = (iy - (N - 1) / 2) / ((N - 1) / 2 || 1);
        const radialX = bx / (offset || 1);
        const radialZ = bz / (offset || 1);

        nodesData.push({
          group: nodeHolder,
          bx,
          by,
          bz,
          ix,
          iy,
          iz,
          parity,
          colIndex,
          shearDirection,
          verticalRank,
          radialX,
          radialZ,
        });
      }
    }
  }

  // Create Connecting Ionic Bonds along X, Y, Z axes
  const strutGeoY = new THREE.CylinderGeometry(0.015, 0.015, spacing, 10);
  const strutGeoXZ = new THREE.CylinderGeometry(0.012, 0.012, spacing, 8);

  for (let ix = 0; ix < N; ix++) {
    for (let iy = 0; iy < N; iy++) {
      for (let iz = 0; iz < N; iz++) {
        const bx = ix * spacing - offset;
        const by = iy * spacing - offset;
        const bz = iz * spacing - offset;

        // Vertical Y-axis bond (stretches into vertical line segments during scroll deconstruction!)
        if (iy < N - 1) {
          const isAccentCol = (ix === 1 && iz === N - 1) || (ix === N - 2 && iz === 0);
          const mesh = new THREE.Mesh(
            strutGeoY,
            isAccentCol ? matBlueSatin : matStrutVertical
          );
          const my = by + spacing * 0.5;
          mesh.position.set(bx, my, bz);
          crystalGroup.add(mesh);
          verticalStruts.push({
            mesh,
            bx,
            by: my,
            bz,
            ix,
            iy,
            iz,
            radialX: bx / (offset || 1),
            shearDir: (ix + iz) % 2 === 0 ? 1 : -1,
          });
        }

        // Horizontal X-axis bond
        if (ix < N - 1) {
          const mesh = new THREE.Mesh(strutGeoXZ, matStrutHorizontal);
          mesh.rotation.z = Math.PI / 2;
          mesh.position.set(bx + spacing * 0.5, by, bz);
          crystalGroup.add(mesh);
          horizontalStruts.push({ mesh, bx: bx + spacing * 0.5, by, bz, axis: 'x' });
        }

        // Horizontal Z-axis bond
        if (iz < N - 1) {
          const mesh = new THREE.Mesh(strutGeoXZ, matStrutHorizontal);
          mesh.rotation.x = Math.PI / 2;
          mesh.position.set(bx, by, bz + spacing * 0.5);
          crystalGroup.add(mesh);
          horizontalStruts.push({ mesh, bx, by, bz: bz + spacing * 0.5, axis: 'z' });
        }
      }
    }
  }

  // Outer Engineered Calibration Frame around the Crystal Lattice
  const frameSize = (N - 1) * spacing + 0.34;
  const frameEdgesGeo = new THREE.EdgesGeometry(
    new THREE.BoxGeometry(frameSize, frameSize, frameSize)
  );
  const frameMat = new THREE.LineBasicMaterial({
    color: 0x0b70ad,
    transparent: true,
    opacity: 0.32,
  });
  const calibrationCage = new THREE.LineSegments(frameEdgesGeo, frameMat);
  crystalGroup.add(calibrationCage);

  // Initial sculpted isometric orientation
  const BASE_ROT_X = 0.42;
  const BASE_ROT_Y = 0.68;
  const BASE_ROT_Z = 0.14;
  crystalGroup.rotation.set(BASE_ROT_X, BASE_ROT_Y, BASE_ROT_Z);

  // ---------------------------------------------------------------------------
  // SCROLL-DRIVEN DECONSTRUCTION ENGINE (Crystal -> Vertical Line Field -> Reveal)
  // ---------------------------------------------------------------------------
  const qaParam = new URLSearchParams(window.location.search).get('qa');
  const initialQaProgress =
    qaParam !== null && !Number.isNaN(parseFloat(qaParam))
      ? Math.max(0, Math.min(1, parseFloat(qaParam)))
      : 0;
  const scrollState = { progress: initialQaProgress };
  const manifesto = document.querySelector('.tara-underlay-content');
  const easeProgress = (value) => {
    const v = Math.max(0, Math.min(1, value));
    return v * v * (3 - 2 * v);
  };

  const renderVerticalLineField = (p) => {
    if (!linesCtx || !linesCanvas) return;
    const cw = linesCanvas.clientWidth || window.innerWidth;
    const ch = linesCanvas.clientHeight || window.innerHeight;
    linesCtx.clearRect(0, 0, cw, ch);
    const reveal = easeProgress((p - 0.12) / 0.55);
    linesCtx.fillStyle = `rgba(245, 243, 238, ${1 - reveal})`;
    linesCtx.fillRect(0, 0, cw, ch);
  };

  let stInstance = null;
  if (scrollArea && !prefersReducedMotion) {
    stInstance = ScrollTrigger.create({
      trigger: scrollArea,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });
  }

  // Interactive 360° Drag & Cursor Parallax
  const pointer = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragX: 0,
    dragY: 0,
    targetDragX: 0,
    targetDragY: 0,
  };

  const onMouseMove = (e) => {
    pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (pointer.isDragging) {
      const dx = e.clientX - pointer.startX;
      const dy = e.clientY - pointer.startY;
      pointer.targetDragY += dx * 0.007;
      pointer.targetDragX = Math.max(-0.55, Math.min(0.55, pointer.targetDragX + dy * 0.006));
      pointer.startX = e.clientX;
      pointer.startY = e.clientY;
    }
  };

  const onMouseDown = (e) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
    if (e.clientY < rect.top || e.clientY > rect.bottom) return;
    const center = crystalGroup.position.clone().project(camera);
    const modelX = rect.left + (center.x + 1) * rect.width / 2;
    if (Math.abs(e.clientX - modelX) > rect.width * 0.25) return;
    if (e.target.closest('a, button, input, [modal-menu-open], [modal-cta-open]')) return;
    pointer.isDragging = true;
    canvas.style.cursor = 'grabbing';
    pointer.startX = e.clientX;
    pointer.startY = e.clientY;
  };

  const onMouseUp = () => {
    pointer.isDragging = false;
    canvas.style.cursor = 'grab';
  };

  const projVecA = new THREE.Vector3();
  const projVecB = new THREE.Vector3();

  const renderSoftwareCrystalProjection = (ctx, cw, ch, dissolve) => {
    if (!ctx || dissolve <= 0.005) return;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();

    const toScreen = (v) => {
      v.project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * cw,
        y: (-v.y * 0.5 + 0.5) * ch,
        z: v.z,
      };
    };

    const focal = ch / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5)));

    // Subtle ground studio shadow beneath crystal
    if (shadowMat.opacity > 0.005) {
      ctx.save();
      ctx.fillStyle = `rgba(7, 14, 26, ${shadowMat.opacity * 0.3})`;
      for (const nd of nodesData) {
        projVecA.set(0, 0, 0).applyMatrix4(nd.group.matrixWorld);
        projVecA.set(projVecA.x - projVecA.y * 0.18, -1.72, projVecA.z - projVecA.y * 0.12);
        const shadow = toScreen(projVecA);
        const radius = Math.max(2, focal * (nd.parity === 0 ? 0.114 : 0.092) / camera.position.z);
        ctx.beginPath();
        if (nd.parity === 0) ctx.ellipse(shadow.x, shadow.y, radius, radius * 0.35, 0, 0, Math.PI * 2);
        else ctx.rect(shadow.x - radius, shadow.y - radius * 0.35, radius * 2, radius * 0.7);
        ctx.fill();
      }
      ctx.restore();
    }

    // 0. Project & draw outer 3D calibration cube cage
    if (frameMat.opacity > 0.01) {
      const fh = frameSize * 0.5;
      const cageCorners = [
        [-fh, -fh, -fh], [fh, -fh, -fh], [fh, fh, -fh], [-fh, fh, -fh],
        [-fh, -fh, fh], [fh, -fh, fh], [fh, fh, fh], [-fh, fh, fh],
      ].map(([cx, cy, cz]) => {
        projVecA.set(cx, cy, cz).applyMatrix4(crystalGroup.matrixWorld);
        return toScreen(projVecA);
      });
      const cageEdges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
      ];
      ctx.save();
      ctx.strokeStyle = `rgba(11, 112, 173, ${frameMat.opacity})`;
      ctx.lineWidth = 1.1;
      for (const [e0, e1] of cageEdges) {
        ctx.beginPath();
        ctx.moveTo(cageCorners[e0].x, cageCorners[e0].y);
        ctx.lineTo(cageCorners[e1].x, cageCorners[e1].y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 1. Project & draw horizontal (X & Z) and vertical (Y) connecting rods
    // Note: CylinderGeometry is oriented along local Y; horizontalStruts already have rotation.z or rotation.x = PI/2
    ctx.save();
    ctx.lineCap = 'round';
    for (let i = 0; i < horizontalStruts.length; i++) {
      const hs = horizontalStruts[i];
      if (!hs.mesh.visible) continue;
      const half = spacing * 0.5;
      projVecA.set(0, -half, 0).applyMatrix4(hs.mesh.matrixWorld);
      projVecB.set(0, half, 0).applyMatrix4(hs.mesh.matrixWorld);
      const pA = toScreen(projVecA);
      const pB = toScreen(projVecB);
      ctx.strokeStyle =
        hs.axis === 'x'
          ? `rgba(15, 32, 58, ${0.62 * dissolve})`
          : `rgba(11, 112, 173, ${0.48 * dissolve})`;
      ctx.lineWidth = Math.max(1.1, 2.4 * hs.mesh.scale.x);
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }

    for (let i = 0; i < verticalStruts.length; i++) {
      const vs = verticalStruts[i];
      const halfY = spacing * 0.5;
      projVecA.set(0, -halfY, 0).applyMatrix4(vs.mesh.matrixWorld);
      projVecB.set(0, halfY, 0).applyMatrix4(vs.mesh.matrixWorld);
      const pA = toScreen(projVecA);
      const pB = toScreen(projVecB);
      ctx.strokeStyle =
        i % 4 === 0
          ? `rgba(11, 112, 173, ${0.82 * dissolve})`
          : i % 9 === 0
          ? `rgba(201, 28, 34, ${0.76 * dissolve})`
          : `rgba(11, 21, 38, ${0.78 * dissolve})`;
      ctx.lineWidth = Math.max(1.2, 2.8 * vs.mesh.scale.x);
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Depth-sort 3D Crystal Nodes (back-to-front painter's algorithm)
    const sortedNodes = nodesData
      .map((nd, idx) => {
        projVecA.set(0, 0, 0).applyMatrix4(nd.group.matrixWorld);
        const dist = camera.position.distanceTo(projVecA);
        const scr = toScreen(projVecA);
        return { nd, idx, dist, scr };
      })
      .sort((a, b) => b.dist - a.dist);

    for (let i = 0; i < sortedNodes.length; i++) {
      const { nd, idx, dist, scr } = sortedNodes[i];
      const baseRadius = nd.parity === 0 ? 0.114 : 0.092;
      const rx = Math.max(1.8, (baseRadius * focal * nd.group.scale.x) / dist);
      const ry = Math.max(2.2, (baseRadius * focal * nd.group.scale.y) / dist);

      ctx.save();
      if (nd.parity === 0) {
        const isNavy = (Math.round((nd.bx + offset) / spacing) + Math.round((nd.bz + offset) / spacing)) % 2 === 0;
        const grad = ctx.createRadialGradient(
          scr.x - rx * 0.32,
          scr.y - ry * 0.32,
          rx * 0.08,
          scr.x,
          scr.y,
          Math.max(rx, ry)
        );
        if (isNavy) {
          grad.addColorStop(0, `rgba(62, 98, 150, ${dissolve})`);
          grad.addColorStop(0.45, `rgba(16, 30, 54, ${dissolve})`);
          grad.addColorStop(1, `rgba(6, 12, 22, ${dissolve})`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${dissolve})`);
          grad.addColorStop(0.6, `rgba(235, 232, 224, ${dissolve})`);
          grad.addColorStop(1, `rgba(178, 174, 164, ${dissolve})`);
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(scr.x, scr.y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();

        // Equatorial machined collar ring
        ctx.strokeStyle =
          idx % 7 === 0
            ? `rgba(201, 28, 34, ${0.88 * dissolve})`
            : `rgba(11, 112, 173, ${0.88 * dissolve})`;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.ellipse(scr.x, scr.y, rx * 1.2, Math.max(1.8, rx * 0.36), 0.22, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // 3D Isometric Shaded Cubic / Faceted Coordination Node (3 lit faces)
        const isRed = idx % 5 === 0;
        const topColor = isRed ? `rgba(232, 56, 62, ${dissolve})` : `rgba(38, 146, 212, ${dissolve})`;
        const leftColor = isRed ? `rgba(201, 28, 34, ${dissolve})` : `rgba(11, 112, 173, ${dissolve})`;
        const rightColor = isRed ? `rgba(142, 16, 21, ${dissolve})` : `rgba(7, 74, 118, ${dissolve})`;

        const w = rx * 1.08;
        const h = ry * 1.12;
        const dy = h * 0.48;

        // Top face
        ctx.fillStyle = topColor;
        ctx.beginPath();
        ctx.moveTo(scr.x, scr.y - h);
        ctx.lineTo(scr.x + w, scr.y - dy);
        ctx.lineTo(scr.x, scr.y);
        ctx.lineTo(scr.x - w, scr.y - dy);
        ctx.closePath();
        ctx.fill();

        // Left face
        ctx.fillStyle = leftColor;
        ctx.beginPath();
        ctx.moveTo(scr.x - w, scr.y - dy);
        ctx.lineTo(scr.x, scr.y);
        ctx.lineTo(scr.x, scr.y + h);
        ctx.lineTo(scr.x - w, scr.y + dy);
        ctx.closePath();
        ctx.fill();

        // Right face
        ctx.fillStyle = rightColor;
        ctx.beginPath();
        ctx.moveTo(scr.x, scr.y);
        ctx.lineTo(scr.x + w, scr.y - dy);
        ctx.lineTo(scr.x + w, scr.y + dy);
        ctx.lineTo(scr.x, scr.y + h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  };
  const onResize = () => {
    const { w: nw, h: nh } = getBounds();
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    if (renderer) renderer.setSize(nw, nh, false);
    syncLinesCanvasSize();
    renderVerticalLineField(scrollState.progress);
  };

  window.addEventListener('pointermove', onMouseMove, { passive: true });
  window.addEventListener('pointerdown', onMouseDown);
  window.addEventListener('pointerup', onMouseUp);
  window.addEventListener('pointercancel', onMouseUp);
  window.addEventListener('resize', onResize);

  let rafId = null;
  const clock = new THREE.Clock();
  let smoothProgress = scrollState.progress;

  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const t = clock.elapsedTime;
    smoothProgress += (scrollState.progress - smoothProgress) * (1 - Math.exp(-delta * 8));
    const p = prefersReducedMotion ? 0 : smoothProgress;

    pointer.x += (pointer.targetX - pointer.x) * 0.06;
    pointer.y += (pointer.targetY - pointer.y) * 0.06;
    pointer.dragX += (pointer.targetDragX - pointer.dragX) * 0.08;
    pointer.dragY += (pointer.targetDragY - pointer.dragY) * 0.08;

    // One scroll motion controls position, orientation, light and incoming copy.
    const transition = easeProgress((p - 0.06) / 0.68);
    const viewWidth = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
    const mobile = window.innerWidth < 768;
    const scale = Math.min(1, viewWidth * (mobile ? 0.7 : 0.4) / (frameSize * 1.65));
    crystalGroup.scale.setScalar(scale);
    crystalGroup.position.set(
      viewWidth * ((mobile ? 0.08 : 0.215) - (mobile ? 0.16 : 0.46) * transition),
      Math.sin(t * 0.8) * 0.035 + Math.sin(transition * Math.PI) * 0.18,
      -Math.sin(transition * Math.PI) * 0.35
    );
    crystalGroup.rotation.set(
      BASE_ROT_X + Math.sin(transition * Math.PI) * 0.24 + pointer.dragX + pointer.y * 0.06,
      BASE_ROT_Y + t * 0.075 + transition * Math.PI * 1.25 + pointer.dragY + pointer.x * 0.12,
      BASE_ROT_Z * (1 - transition) - Math.sin(transition * Math.PI) * 0.12
    );
    shadowMat.opacity = 0.1 * (1 - transition);
    shadowPlane.position.y = -frameSize * scale * 0.8;
    const copyProgress = easeProgress((p - 0.48) / 0.32);
    if (manifesto) {
      manifesto.style.opacity = String(copyProgress);
      manifesto.style.transform = `translate3d(${(1 - copyProgress) * 40}px, 0, 0)`;
    }

    renderVerticalLineField(p);
    if (renderer) {
      renderer.render(scene, camera);
    } else if (linesCtx && linesCanvas) {
      renderSoftwareCrystalProjection(linesCtx, linesCanvas.clientWidth, linesCanvas.clientHeight, 1);
    }
  };

  animate();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (stInstance) stInstance.kill();
    window.removeEventListener('pointermove', onMouseMove);
    window.removeEventListener('pointerdown', onMouseDown);
    window.removeEventListener('pointerup', onMouseUp);
    window.removeEventListener('pointercancel', onMouseUp);
    window.removeEventListener('resize', onResize);
    if (renderer) renderer.dispose();
    if (manifesto) { manifesto.style.opacity = ''; manifesto.style.transform = ''; }
    cleanupRelocated();
  };
}
