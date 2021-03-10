import * as THREE from 'three';

export default class Cube {
  cubeGeometry;
  cubeMaterial;

  constructor() {
   this.cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
   this.cubeMaterial = new THREE.MeshLambertMaterial({
      color: "#FF0000",
    });
  }

  create() {
    return new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
  }
}