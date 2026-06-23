import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const customModelPath = "";

function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 2.2, 9.2);

    const room = new THREE.Group();
    scene.add(room);

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7b69f,
      roughness: 0.58,
      metalness: 0.04,
    });
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0e6d8,
      roughness: 0.72,
    });
    const bronzeMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b7a52,
      roughness: 0.28,
      metalness: 0.42,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1713,
      roughness: 0.44,
      metalness: 0.08,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe8f1f0,
      roughness: 0.06,
      transmission: 0.42,
      transparent: true,
      opacity: 0.72,
    });

    function makeBox(width, height, depth, material, x, y, z) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      room.add(mesh);
      return mesh;
    }

    makeBox(8.8, 0.12, 6.4, floorMaterial, 0, -1.12, 0);
    makeBox(8.8, 4.3, 0.12, wallMaterial, 0, 1.0, -3.1);
    makeBox(0.12, 4.3, 6.4, wallMaterial, -4.4, 1.0, 0);
    makeBox(0.12, 4.3, 6.4, wallMaterial, 4.4, 1.0, 0);
    makeBox(2.8, 0.38, 1.05, darkMaterial, -1.7, -0.78, -0.3);
    makeBox(0.78, 0.9, 0.78, darkMaterial, -3.45, -0.48, -0.15);
    makeBox(0.78, 0.9, 0.78, darkMaterial, 0.05, -0.48, -0.15);
    makeBox(1.5, 0.08, 1.5, glassMaterial, 1.7, -0.62, 0.55);
    makeBox(0.18, 0.88, 0.18, bronzeMaterial, 1.18, -1.02, 0.02);
    makeBox(0.18, 0.88, 0.18, bronzeMaterial, 2.22, -1.02, 0.02);
    makeBox(0.18, 0.88, 0.18, bronzeMaterial, 1.18, -1.02, 1.08);
    makeBox(0.18, 0.88, 0.18, bronzeMaterial, 2.22, -1.02, 1.08);
    makeBox(1.6, 1.08, 0.16, bronzeMaterial, 2.48, 0.9, -3.0);
    makeBox(1.16, 1.56, 0.12, darkMaterial, -2.7, 0.88, -3.0);

    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfff1d5,
        emissive: 0xffd79a,
        emissiveIntensity: 1.4,
      }),
    );
    lamp.position.set(2.9, 2.2, -1.45);
    room.add(lamp);

    const keyLight = new THREE.DirectionalLight(0xfff2dd, 3.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xd9b47c, 5.2, 8);
    fillLight.position.set(2.9, 2.2, -1.45);
    scene.add(fillLight);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    if (customModelPath) {
      const loader = new GLTFLoader();
      loader.load(
        customModelPath,
        (gltf) => {
          const model = gltf.scene;
          const bounds = new THREE.Box3().setFromObject(model);
          const center = bounds.getCenter(new THREE.Vector3());
          const size = bounds.getSize(new THREE.Vector3());
          const maxSize = Math.max(size.x, size.y, size.z) || 1;

          room.clear();
          model.position.sub(center);
          model.scale.setScalar(4.8 / maxSize);
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          room.add(model);
        },
        undefined,
        () => {
          console.warn("Custom 3D model was not loaded. The fallback interior scene is shown.");
        },
      );
    }

    let pointerX = 0;
    let pointerY = 0;
    let animationFrame = 0;

    function resize() {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function animate(time) {
      const seconds = time * 0.001;
      room.rotation.y = Math.sin(seconds * 0.28) * 0.12 + pointerX * 0.16;
      room.rotation.x = -0.03 + pointerY * 0.06;
      room.position.y = Math.sin(seconds * 0.8) * 0.035;
      lamp.position.y = 2.2 + Math.sin(seconds * 1.3) * 0.08;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    }

    function handlePointerMove(event) {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    resize();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return <canvas id="hero-scene" ref={canvasRef} aria-hidden="true" />;
}

export default HeroScene;
