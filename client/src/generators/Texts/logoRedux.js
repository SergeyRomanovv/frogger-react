import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'; 

export default function logoRedux(inputText, fontSize) {
    const reduxText = new THREE.Group()
	reduxText.castShadow = true;
	reduxText.receiveShadow = true;

    const loader = new FontLoader();

    loader.load( './font.json', function ( font ) {

	const geometry = new TextGeometry( inputText , {
		font: font,
		size: fontSize,
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

    reduxText.add(mesh)
} );

return reduxText
}
