import { FC, useEffect, useRef } from "react";
import * as THREE from "three";
import DomUtils from "../../../../utils/DomUtils";

type Props = {
  fov: number;
  near: number;
  far: number;
  rendererColor: string;
  axesSize: number;
  cameraPostionX: number;
  cameraPostionY: number;
  cameraPostionZ: number;
  spotLightColor: string;
  enabledShadow: boolean;
  spotLightX: number;
  spotLightY: number;
  spotLightZ: number;
};

export const Scene2: FC<Partial<Props>> = ({
  fov = 45,
  near = 0.1,
  far = 1000,
  rendererColor = "#EEEEEE",
  axesSize = 20,
  cameraPostionX = -30,
  cameraPostionY = 40,
  cameraPostionZ = 30,
  spotLightColor = "#FFF",
  enabledShadow = true,
  spotLightX = -40,
  spotLightY = 60,
  spotLightZ = -10,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!DomUtils.useableWindow() || ref.current === null) {
      return;
    }

    const { innerHeight, innerWidth, aspect } = DomUtils.size();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(rendererColor, 1.0);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = enabledShadow;

    // 축
    const axes = new THREE.AxesHelper(axesSize);
    scene.add(axes);

    // 배경으로 사용할 2차원 사각형
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: "#fff" });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    plane.receiveShadow = true;
    scene.add(plane);

    // 정사각형
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: "#FF0000",
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    cube.castShadow = true;
    scene.add(cube);

    // 구체
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: "#7777FF",
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;

    sphere.castShadow = true;
    scene.add(sphere);

    // 광원 추가
    const spotLight = new THREE.SpotLight(spotLightColor);

    spotLight.position.set(spotLightX, spotLightY, spotLightZ);
    spotLight.castShadow = true;

    scene.add(spotLight);

    // 카메라 설정
    camera.position.x = cameraPostionX;
    camera.position.y = cameraPostionY;
    camera.position.z = cameraPostionZ;
    camera.lookAt(scene.position);

    ref.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }, []);

  return <div ref={ref} />;
};
