import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import DomUtils from "../../../../utils/DomUtils";
import Cube from "./cube";
import Plane from "./plane";
import Sphere from "./sphere";

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

export const Scene4: FC<Partial<Props>> = ({
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

  const renderer = useMemo(() => {
    return new THREE.WebGLRenderer();
  }, []);

  const scene = useMemo(() => {
    return new THREE.Scene();
  }, []);

  const sphere = useMemo(() => {
    return new Sphere(20, 4, 2);
  }, []);

  const cube = useMemo(() => {
    return new Cube(-4, 3, 0);
  }, []);

  const plane = useMemo(() => {
    return new Plane(15, 0, 0);
  }, []);

  const camera = useMemo(() => {
    const { aspect } = DomUtils.size();
    return new THREE.PerspectiveCamera(fov, aspect, near, far);
  }, [fov, near, far]);

  const animate = useCallback(() => {
    cube.rotate(0.02);
    sphere.bounce(0.04);

    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }, [renderer, scene, camera, cube, sphere]);

  useEffect(() => {
    if (!DomUtils.useableWindow() || ref.current === null) {
      return;
    }

    const { innerHeight, innerWidth } = DomUtils.size();

    renderer.setClearColor(rendererColor, 1.0);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = enabledShadow;

    // 축
    const axes = new THREE.AxesHelper(axesSize);
    scene.add(axes);

    // 배경으로 사용할 2차원 사각형
    plane.mesh.rotation.x = -0.5 * Math.PI;
    plane.mesh.receiveShadow = true;
    scene.add(plane.mesh);

    // 정사각형
    cube.mesh.castShadow = true;
    scene.add(cube.mesh);

    // 구체
    sphere.mesh.castShadow = true;
    scene.add(sphere.mesh);

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

    animate();

    // eslint-disable-next-line
  }, [renderer]);

  return <div ref={ref} />;
};
