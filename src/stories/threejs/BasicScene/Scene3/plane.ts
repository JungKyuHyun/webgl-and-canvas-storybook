import * as THREE from 'three';

export default class Plane {
  planeGeometry;
  planeMaterial;

  constructor() {
    this.planeGeometry = new THREE.PlaneGeometry(60, 20);
    this.planeMaterial = new THREE.MeshLambertMaterial({ color: "#fff" });
  }

  create() {
    return new THREE.Mesh(this.planeGeometry, this.planeMaterial);
  }
}