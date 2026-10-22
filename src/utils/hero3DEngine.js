import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function initHero3DModel() {
  const canvas = document.querySelector('[data-scroll-video]');
  if (!canvas) return () => {};

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch (e) {
    console.warn('WebGL 3D model fallback:', e);
    return () => {};
  }

  const getBounds = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    return { w, h };
  };

  const { w, h } = getBounds();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.0));
  renderer.setSize(w, h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, w / h, 0.1, 100);
  camera.position.set(0, 0.1, 5.4);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
  pmremGenerator.dispose();

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.55);
  sunLight.position.set(5, 7, 5);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0xf4f6f9, 0.6);
  fillLight.position.set(-5, 2, -3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x0b70ad, 0.75);
  rimLight.position.set(0, 3, -5);
  scene.add(rimLight);

  const shadowGeo = new THREE.PlaneGeometry(14, 14);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.22 });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.45;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  let modelPivot = null;
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
      const scale = 2.45 / maxDim;
      model.scale.setScalar(scale);

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          const tuneMat = (mat) => {
            if (!mat) return;
            mat.roughness = 0.5;
            mat.metalness = 0.1;
            mat.envMapIntensity = 0.28;
            mat.needsUpdate = true;
          };
          if (Array.isArray(child.material)) {
            child.material.forEach(tuneMat);
          } else {
            tuneMat(child.material);
          }
        }
      });

      const pivot = new THREE.Group();
      pivot.position.set(0, -0.08, 0);
      pivot.add(model);
      scene.add(pivot);
      modelPivot = pivot;
    },
    undefined,
    (err) => {
      console.warn('Failed to load /model.glb:', err);
    }
  );

  // Interactive 360 drag + mouse parallax + scroll scrub
  const state = {
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    dragRotX: 0,
    dragRotY: 0,
    targetDragRotX: 0,
    targetDragRotY: 0,
  };

  const onMouseMove = (e) => {
    state.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    state.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (state.isDragging) {
      const dx = e.clientX - state.startX;
      const dy = e.clientY - state.startY;
      state.targetDragRotY += dx * 0.008;
      state.targetDragRotX = Math.max(-0.6, Math.min(0.6, state.targetDragRotX + dy * 0.006));
      state.startX = e.clientX;
      state.startY = e.clientY;
    }
  };

  const onMouseDown = (e) => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom <= 0) return;
    if (e.target.closest('a, button, input, [modal-menu-open], [modal-cta-open]')) return;
    state.isDragging = true;
    state.startX = e.clientX;
    state.startY = e.clientY;
  };

  const onMouseUp = () => {
    state.isDragging = false;
  };

  const onResize = () => {
    const { w: nw, h: nh } = getBounds();
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh, false);
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('resize', onResize);

  let rafId = null;
  const clock = new THREE.Clock();

  const animate = () => {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    state.mouseX += (state.targetMouseX - state.mouseX) * 0.06;
    state.mouseY += (state.targetMouseY - state.mouseY) * 0.06;
    state.dragRotX += (state.targetDragRotX - state.dragRotX) * 0.08;
    state.dragRotY += (state.targetDragRotY - state.dragRotY) * 0.08;

    if (modelPivot) {
      const scrollY = window.scrollY || 0;
      const scrollRot = scrollY * 0.0028;
      const idleBob = Math.sin(t * 1.1) * 0.04;
      modelPivot.position.y = -0.08 + idleBob;
      modelPivot.rotation.y = t * 0.14 + scrollRot + state.dragRotY + state.mouseX * 0.25;
      modelPivot.rotation.x = state.dragRotX + state.mouseY * 0.12;
    }

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}
