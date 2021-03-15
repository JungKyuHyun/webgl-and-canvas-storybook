import { useCallback, useRef, useMemo, useEffect, useState, FC } from "react";
import styled from "styled-components";
import * as THREE from "three";
import DomUtils from "../../../../utils/DomUtils";
import { CubeController } from "./CubeController";

type Props = {
  fov: number;
  planeWidth: number;
  planeHeight: number;
  rotationSpeed: number;
};

export const Scene1: FC<Partial<Props>> = ({
  fov = 45,
  planeWidth = 60,
  planeHeight = 40,
  rotationSpeed = 0.02,
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();

  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);

  const camera = useMemo(() => {
    const { innerWidth, innerHeight } = DomUtils.size();
    return new THREE.PerspectiveCamera(
      fov,
      innerWidth / innerHeight,
      0.1,
      1000
    );
  }, [fov]);

  const plane = useMemo(() => {
    const planeGemometry = new THREE.PlaneGeometry(
      planeWidth,
      planeHeight,
      1,
      1
    );

    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const planeMesh = new THREE.Mesh(planeGemometry, planeMaterial);
    planeMesh.receiveShadow = true;

    // rotate and postion the plane
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.position.x = 0;
    planeMesh.position.y = 0;
    planeMesh.position.z = 0;

    return planeMesh;
  }, [planeWidth, planeHeight]);

  const cubeController = useMemo(() => {
    return new CubeController(rotationSpeed);
  }, [rotationSpeed]);

  const ambientLight = useMemo(() => {
    return new THREE.AmbientLight(0x0c0c0c);
  }, []);

  const spotLight = useMemo(() => {
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(-40, 60, -10);
    light.castShadow = true;
    return light;
  }, []);

  const handleAddCube = useCallback(() => {
    cubeController.addCube(scene, planeWidth, planeHeight);
  }, [cubeController, scene, planeWidth, planeHeight]);

  const handleRemoveCube = useCallback(() => {
    cubeController.removeCube(scene);
  }, [cubeController, scene]);

  const resize = useCallback(() => {
    if (renderer === undefined) {
      return;
    }
    const { innerHeight, innerWidth } = DomUtils.size();

    // 카메라 생성
    scene.add(camera);

    // renderer setting
    renderer.setClearColor(new THREE.Color(0xeeeeee));
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;

    // add plane
    scene.add(plane);

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // ambient 라이트 추가
    scene.add(ambientLight);

    // spot 라이트 추가
    scene.add(spotLight);
  }, [scene, camera, renderer, plane, ambientLight, spotLight]);

  const animate = useCallback(() => {
    scene.traverse((obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh && obj !== plane) {
        obj.rotation.x += cubeController.rotationSpeed;
        obj.rotation.y += cubeController.rotationSpeed;
        obj.rotation.z += cubeController.rotationSpeed;
      }
    });

    window.requestAnimationFrame(animate);
    renderer?.render(scene, camera);
  }, [renderer, scene, camera, plane, cubeController]);

  useEffect(() => {
    if (ref.current !== null) {
      setRenderer(new THREE.WebGLRenderer({ canvas: ref.current }));
    }
  }, []);

  useEffect(() => {
    if (!DomUtils.useableWindow() || renderer === undefined) {
      return;
    }
    window.addEventListener("resize", resize, false);
    resize();
    return () => window.removeEventListener("resize", resize, false);
  }, [resize, renderer]);

  useEffect(() => {
    if (!DomUtils.useableWindow()) {
      return;
    }
    const num = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(num);
  }, [animate, renderer]);

  return (
    <>
      <Canvas ref={ref} />
      <Menu>
        <Button onClick={handleAddCube}>큐브 생성</Button>
        <Button onClick={handleRemoveCube}>큐브 제거</Button>
      </Menu>
    </>
  );
};

const Canvas = styled.canvas`
  width: 100vw;
  height: 100vh;
`;

const Menu = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;

  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 8px;
`;

const Button = styled.button`
  -webkit-appearance: none;
  border: none;
  outline: none;

  line-height: 36px;
  min-width: 48px;
  width: 100px;
  padding: 0;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 700;
  cursor: pointer;
  position: relative;
  border-radius: 4px;

  &:not(:first-child) {
    margin-top: 8px;
  }

  &:nth-child(1) {
    background: skyblue;
    box-shadow: 0 3px #36a5d1;

    &:hover {
      box-shadow: 0 2px #36a5d1;
      top: 2px;
    }
  }

  &:nth-child(2) {
    background: lightgray;
    box-shadow: 0 3px gray;
    &:hover {
      box-shadow: 0 2px gray;
      top: 2px;
    }
  }
`;
