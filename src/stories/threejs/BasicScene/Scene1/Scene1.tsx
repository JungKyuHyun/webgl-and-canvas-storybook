import { useEffect, useRef } from "react";
import * as THREE from "three";
import DomUtils from "../../../../utils/DomUtils";

export const Scene1 = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!DomUtils.useableWindow() || ref.current === null) {
      return;
    }

    const { innerHeight, innerWidth, aspect } = DomUtils.size();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor("#EEEEEE");
    renderer.setSize(innerWidth, innerHeight);

    // 축
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // 배경으로 사용할 2차원 사각형
    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    // 정사각형
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    // 구체
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x777ff,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);

    // 카메라 설정
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    ref.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }, []);

  return <div ref={ref} />;
};
