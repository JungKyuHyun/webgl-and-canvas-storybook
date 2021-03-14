import { useEffect, useRef, useMemo, FC, useCallback, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import DomUtils from "../../../utils/DomUtils";

type Props = {
  cameraPositionZ: number;
};

export const Cube: FC<Partial<Props>> = ({ cameraPositionZ = 400 }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();

  useEffect(() => {
    if (ref.current !== null) {
      setRenderer(new THREE.WebGLRenderer({ canvas: ref.current }));
    }
  }, []);

  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);

  const camera = useMemo(() => {
    return new THREE.PerspectiveCamera(70, 1, 1, 1000);
  }, []);

  const mesh = useMemo(() => {
    const cubeGeometry = new THREE.BoxGeometry(200, 200, 200);
    const cubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x555555,
      specular: 0x555555,
      shininess: 50,
    });

    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }, []);

  const resize = useCallback(() => {
    if (renderer === undefined || ref.current === null) {
      return;
    }
    const { innerWidth, innerHeight } = DomUtils.size();

    renderer.setSize(innerWidth, innerHeight, false);

    camera.aspect = innerWidth / innerHeight;
    camera.position.z = cameraPositionZ;
    camera.updateProjectionMatrix();
  }, [camera, renderer, cameraPositionZ]);

  const animate = useCallback(() => {
    if (ref.current === null || renderer === undefined) {
      return;
    }

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }, [renderer, scene, camera, mesh.rotation]);

  const init = useCallback(() => {
    scene.add(mesh);

    const light1 = new THREE.PointLight(0xff0040, 2, 0);
    light1.position.set(200, 100, 300);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x0040ff, 2, 0);
    light2.position.set(-200, 100, 300);
    scene.add(light2);
  }, [mesh, scene]);

  useEffect(() => {
    if (!DomUtils.useableWindow() || renderer === null) {
      return;
    }
    window.addEventListener("resize", resize, false);
    resize();
    return () => window.removeEventListener("resize", resize, false);
  }, [resize, renderer]);

  useEffect(() => {
    if (!DomUtils.useableWindow() || renderer === null) {
      return;
    }
    init();
    const num = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(num);
  }, [init, animate, renderer]);

  return <Canvas ref={ref} />;
};

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
