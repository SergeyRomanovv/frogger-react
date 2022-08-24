import * as THREE from 'three';
import { FontLoader } from '../../../node_modules/three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from '../../../node_modules/three/examples/jsm/geometries/TextGeometry'; 

export default function myReact(inputText) {
    const reactText = new THREE.Group()
	reactText.castShadow = true;
	reactText.receiveShadow = true;

    const loader = new FontLoader();

    loader.load( './font.json', function ( font ) {

	const geometry = new TextGeometry( inputText , {
		font: font,
		size: 60,
		height: 10,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 0.5,
		bevelOffset: 1,
		bevelSegments: 1
	} );

	geometry.castShadow = true;
    geometry.receiveShadow = true;

    const mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({ color: '#e3e3e3', flatShading: true })
    );

    reactText.add(mesh)
} );

return reactText
}
