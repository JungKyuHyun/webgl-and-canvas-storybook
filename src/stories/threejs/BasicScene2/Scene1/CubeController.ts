import * as THREE from "three";
import { Cube } from "./Cube";

export class CubeController {
  rotationSpeed;
  numberOfObjects = 0;

  constructor(rotationSpeed: number) {
    this.rotationSpeed = rotationSpeed;
  }

  addCube(scene: THREE.Scene, vx: number, vz: number) {
    const cube = new Cube().create();
    cube.castShadow = true;
    cube.name = `cube-${scene.children.length}`;

    cube.position.x = -30 + Math.round(Math.random() * vx);
    cube.position.y = Math.round(Math.random() * 5);
    cube.position.z = -20 + Math.round(Math.random() * vz);

    scene.add(cube);
    this.numberOfObjects = scene.children.length;
  }

  removeCube(scene: THREE.Scene) {
    const allChildren = scene.children;
    const lastObject = allChildren[allChildren.length - 1];
    if (lastObject instanceof THREE.Mesh) {
      scene.remove(lastObject);
      this.numberOfObjects = scene.children.length;
    }
  }
}
