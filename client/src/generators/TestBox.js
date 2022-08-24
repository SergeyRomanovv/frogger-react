import * as THREE from 'three';

export default function testBox() {

    const material = new THREE.MeshPhongMaterial({color: "#ffffff"})

    const box = new THREE.BoxGeometry(10, 10, 30)

    const boxMesh = new THREE.Mesh(box, material)


    return boxMesh;
}
