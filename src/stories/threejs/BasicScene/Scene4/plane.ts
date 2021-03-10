import * as THREE from "three";

export default class Plane {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshLambertMaterial>;

  constructor(x: number, y: number, z: number) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 20),
      new THREE.MeshLambertMaterial({ color: "#fff" })
    );
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }
}
