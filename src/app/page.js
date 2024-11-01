"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { ARJSContext } from "ar.js";

export default function Home() {
  const containerRef = useRef(null);
  const arContext = new ARJSContext({
    sourceType: "webcam",
    detectionMode: "mono",
    cameraParameters: "data/camera_parameters.json",
  });

  arContext.init(function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const arButton = ARButton(renderer, { session: "immersive-ar" });
    document.body.appendChild(arButton);

    arButton.addEventListener("click", () => {
      renderer.setAnimationLoop(animate);
    });

    function animate() {
      renderer.render(scene, camera);
    }
  }, []);

  return <div ref={containerRef}></div>;
}
