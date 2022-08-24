import * as THREE from 'three';

export default function Chick(zoom) {
    const chickenSize = 12;


    const chick = new THREE.Group();
    chick.name = 'Chick'

    const body = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            chickenSize * zoom,
            chickenSize * zoom,
            18 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#FEFB00', flatShading: true })
    );
    body.position.z = 20 * zoom;
    body.castShadow = true;
    body.receiveShadow = true;
    chick.add(body);

    const body2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            chickenSize * zoom,
            chickenSize * zoom,
            10 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#FEFB00', flatShading: true })
    );
    body2.position.y = -7 * zoom;
    body2.position.z = 16 * zoom;
    body2.castShadow = true;
    body2.receiveShadow = true;
    chick.add(body2);

    const lWing = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            3 * zoom,
            9 * zoom,
            6 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#FEFB00', flatShading: true })
    );
    lWing.position.x = 8 * zoom;
    lWing.position.y = -3 * zoom;
    lWing.position.z = 16 * zoom;


    const rWing = new THREE.Mesh(
        new THREE.BoxBufferGeometry(
            3 * zoom,
            9 * zoom,
            6 * zoom
        ),
        new THREE.MeshPhongMaterial({ color: '#FEFB00', flatShading: true })
    );
    rWing.position.x = -8 * zoom;
    rWing.position.y = -3 * zoom;
    rWing.position.z = 16 * zoom;
    chick.add(lWing, rWing);

    const leftEye = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 2 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#05010d', flatShading: true })
    );
    leftEye.position.z = 25 * zoom;
    leftEye.position.x = 6 * zoom;
    leftEye.castShadow = true;
    leftEye.receiveShadow = false;
    chick.add(leftEye);

    const rightEye = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 2 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#05010d', flatShading: true })
    );
    rightEye.position.z = 25 * zoom;
    rightEye.position.x = -6 * zoom;
    rightEye.castShadow = true;
    rightEye.receiveShadow = false;
    chick.add(rightEye);

    const beak = new THREE.Mesh(
        new THREE.BoxBufferGeometry(4 * zoom, 4 * zoom, 4 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    beak.position.z = 25 * zoom;
    beak.position.y = 7 * zoom;
    beak.position.x = 0 * zoom;
    beak.castShadow = true;
    beak.receiveShadow = false;

    chick.add(beak);

    const leftLeg1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    leftLeg1.position.x = 2* zoom
    leftLeg1.position.z = 4* zoom  

    const leftLeg2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    leftLeg2.position.x = 6* zoom
    leftLeg2.position.z = 4* zoom  

    const leftLeg3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    leftLeg3.position.x = 4* zoom
    leftLeg3.position.y = -6*zoom
    leftLeg3.position.z = 4* zoom  

    const leftLeg4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 2 * zoom, 10* zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    leftLeg4.position.x = 4* zoom
    leftLeg4.position.y = -3*zoom
    leftLeg4.position.z = 8* zoom  

    chick.add(leftLeg1, leftLeg2, leftLeg3, leftLeg4)

    const rightLeg1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    rightLeg1.position.x = -2* zoom
    rightLeg1.position.z = 4* zoom  

    const rightLeg2 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    rightLeg2.position.x = -6* zoom
    rightLeg2.position.z = 4* zoom  

    const rightLeg3 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 8 * zoom, 2 * zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    rightLeg3.position.x = -4* zoom
    rightLeg3.position.y = -6*zoom
    rightLeg3.position.z = 4* zoom  

    const rightLeg4 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(2 * zoom, 2 * zoom, 10* zoom),
        new THREE.MeshLambertMaterial({ color: '#E8BB07', flatShading: true })
    );
    rightLeg4.position.x = -4* zoom
    rightLeg4.position.y = -3*zoom
    rightLeg4.position.z = 8* zoom  


    chick.add(rightLeg1, rightLeg2, rightLeg3, rightLeg4)


    return chick;
}
