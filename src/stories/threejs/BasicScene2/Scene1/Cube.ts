import * as THREE from "three";

export class Cube {
  cubeSize;

  constructor() {
    this.cubeSize = Math.ceil(Math.random() * 3);
  }

  create() {
    const cubeGeometry = new THREE.BoxGeometry(
      this.cubeSize,
      this.cubeSize,
      this.cubeSize
    );
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
  }
}
