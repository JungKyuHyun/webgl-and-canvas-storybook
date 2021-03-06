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
  cubeRotateSpeed: number;
  sphereBounceSpeed: number;
};

export const Scene5: FC<Partial<Props>> = ({
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
  cubeRotateSpeed = 0.02,
  sphereBounceSpeed = 0.04,
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

  const resize = useCallback(() => {
    const { aspect, innerHeight, innerWidth } = DomUtils.size();
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  }, [camera, renderer]);

  const animate = useCallback(() => {
    cube.rotate(cubeRotateSpeed);
    sphere.bounce(sphereBounceSpeed);

    window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }, [
    renderer,
    scene,
    camera,
    cube,
    sphere,
    cubeRotateSpeed,
    sphereBounceSpeed,
  ]);

  useEffect(() => {
    if (!DomUtils.useableWindow()) {
      return;
    }
    window.addEventListener("resize", resize, false);
    resize();

    return () => window.removeEventListener("resize", resize, false);
  }, [resize]);

  useEffect(() => {
    if (!DomUtils.useableWindow() || ref.current === null) {
      return;
    }

    // renderer ??????
    renderer.setClearColor(rendererColor, 1.0);
    renderer.shadowMap.enabled = enabledShadow;

    // ???
    const axes = new THREE.AxesHelper(axesSize);
    scene.add(axes);

    // ???????????? ????????? 2?????? ?????????
    plane.mesh.rotation.x = -0.5 * Math.PI;
    plane.mesh.receiveShadow = true;
    scene.add(plane.mesh);

    // ????????????
    cube.mesh.castShadow = true;
    scene.add(cube.mesh);

    // ??????
    sphere.mesh.castShadow = true;
    scene.add(sphere.mesh);

    // ?????? ??????
    const spotLight = new THREE.SpotLight(spotLightColor);

    spotLight.position.set(spotLightX, spotLightY, spotLightZ);
    spotLight.castShadow = true;

    scene.add(spotLight);

    // ????????? ??????
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
