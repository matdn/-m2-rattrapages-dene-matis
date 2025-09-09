"use client";
import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Camera, Mesh, MeshBasicMaterial, MeshStandardMaterial, VideoTexture } from 'three';

const Model = () => {
  const gltf = useGLTF('./scene.glb');
  const { camera } = useThree();
  const video = document.createElement('video');

  useEffect(() => {
    const video = document.createElement('video');
    video.src = './videoplayback.mp4';
    video.loop = true;
    video.muted = true;


    video.oncanplay = () => {
      video.play();

      const videoTexture = new VideoTexture(video);

      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          if (child.name === 'VideoPlane') {
            child.material = new MeshBasicMaterial({ map: videoTexture });
          }
        }
      });
    };
  }, [gltf]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        console.log(child.name);
        const mesh = child as Mesh;
        const whiteMaterial = new MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 1 });
        mesh.material = whiteMaterial;

        if (child.name === 'VideoPlane') {
          camera.position.set(10, 1, 0);
          camera.lookAt(child.position);
          child.material = new MeshBasicMaterial({ color: 0x000000 });
        }

        if (child.name === 'Banc') {
          child.material = new MeshStandardMaterial({ color: 0xeeeeee, metalness: 0.5, roughness: 0.5 });
        }

        if (child.name === 'Cables') {
          child.material = new MeshStandardMaterial({ color: 0x120EFF, metalness: 0.5, roughness: 0.5 });
        }
      }
    });
  }, [gltf, camera]);

  return <primitive object={gltf.scene} scale={1} />;
};

const BackgroundScene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: "fixed", top: 0, left: 0 }}>
      <Canvas color='ffffff'>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} color={"ffffff"} intensity={10} />
        <Model />
        {/* <OrbitControls /> */}

      </Canvas>
    </div>
  );
};

export default BackgroundScene;