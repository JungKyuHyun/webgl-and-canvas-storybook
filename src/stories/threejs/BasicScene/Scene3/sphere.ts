import * as THREE from "three";

export default class Sphere {
  sphereGeometry;
  sphereMaterial;
  
  constructor() {
    this.sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    this.sphereMaterial = new THREE.MeshLambertMaterial({
      color: "#7777FF",
    });
  }

  create() {
    return new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
  }
}