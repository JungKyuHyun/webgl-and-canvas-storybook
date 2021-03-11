import * as THREE from "three";

export default class Sphere {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>;
  step = 0;

  constructor(x: number, y: number, z: number) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(4, 20, 20),
      new THREE.MeshLambertMaterial({
        color: "#7777FF",
      })
    );

    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  bounce(s: number) {
    this.step += s;
    this.mesh.position.x = 20 + 10 * Math.cos(this.step);
    this.mesh.position.y = 2 + 10 * Math.abs(Math.cos(this.step));
  }
}
