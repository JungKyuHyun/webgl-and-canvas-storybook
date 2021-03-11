import * as THREE from "three";

export default class Cube {
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;

  constructor(x: number, y: number, z: number) {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.MeshLambertMaterial({
        color: "#FF0000",
      })
    );

    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }

  rotate(speed: number) {
    this.mesh.rotation.x += speed;
    this.mesh.rotation.y += speed;
    this.mesh.rotation.z += speed;
  }
}
