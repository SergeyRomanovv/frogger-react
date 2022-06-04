/* eslint-disable default-case */
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Chicken from '../generators/Chicken';
import Grass from '../generators/Ground/Grass';
import Road from '../generators/Ground/Road';
import Rails from '../generators/Ground/Rails';
import Water from '../generators/Ground/Water';
import Car from '../generators/Items/Car';
import Truck from '../generators/Items/Truck';
import generateLanes from '../generators/generateLanes';
// import animate from '../generators/animate';
import Lane from '../generators/Lane';

export default function Game() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#141517');

        const distance = 500;
        let height;
        let cameraSpeed = 2
        let positionY
        let stepTime = 200

        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -2,
            window.innerWidth / 2,
            window.innerHeight / 2,
            window.innerHeight / -2,
            0.1,
            10000
        );

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        scene.add(hemiLight);

        const initialDirLightPositionX = -100;
        const initialDirLightPositionY = -100;
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(
            initialDirLightPositionX,
            initialDirLightPositionY,
            200
        );
        dirLight.castShadow = true;
        scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0x000000, 0.4);
        backLight.position.set(200, 200, 50);
        backLight.castShadow = true;
        scene.add(backLight);

        camera.rotation.x = (50 * Math.PI) / 180;
        camera.rotation.y = (20 * Math.PI) / 180;
        camera.rotation.z = (10 * Math.PI) / 180;

        const initialCameraPositionY = -Math.tan(camera.rotation.x) * distance;
        const initialCameraPositionX =
            Math.tan(camera.rotation.y) *
            Math.sqrt(distance ** 2 + initialCameraPositionY ** 2);
        camera.position.y = initialCameraPositionY;
        camera.position.x = initialCameraPositionX;
        camera.position.z = distance;

        const zoom = 2;
        const positionWidth = 42;
        const columns = 17;
        const boardWidth = positionWidth * columns;

        const vechicleColors = [0xa52523, 0xbdb638, 0x78b14b, 0x1a5b9c];
        const chicken = new Chicken(zoom)
        scene.add(chicken);
        // =============================================================================================
        let lanes;
        let currentLane;
        let currentColumn;

        let previousTimestamp;
        let startMoving;
        let moves;
        let stepStartTimestamp;

        let chickenSize = 15

        const initaliseValues = () => {
            lanes = generateLanes(zoom,boardWidth, positionWidth, scene, vechicleColors, height);
            // console.log('lanes}}}}}', lanes)
            currentLane = 0;
            currentColumn = Math.floor(columns / 2);

            previousTimestamp = null;

            startMoving = false;
            moves = [];
            // stepStartTimestamp;

            chicken.position.x = 0;
            chicken.position.y = 0;

            camera.position.y = initialCameraPositionY;
            camera.position.x = initialCameraPositionX;

            dirLight.position.x = initialDirLightPositionX;
            dirLight.position.y = initialDirLightPositionY;
        };

        initaliseValues();


        const addLane = () => {
            const index = lanes.length;
            const lane = new Lane(index, zoom, boardWidth, positionWidth, vechicleColors, height);
            lane.mesh.position.y = index*positionWidth*zoom;
            scene.add(lane.mesh);
            lanes.push(lane);
          }


          
        // Test scene add ==============================================================================
        // scene.add(new Road(zoom, boardWidth, positionWidth), Chicken(zoom));

        // scene.add(
        //     new Water(zoom, boardWidth, positionWidth),
        //     Chicken(zoom),
        //     new Truck(zoom, vechicleColors)
        // );

          function move(direction) {
            const finalPositions = moves.reduce((position,move) => {
              if(move === 'forward') return {lane: position.lane + 1, column: position.column};
              if(move === 'backward') return {lane: position.lane - 1, column: position.column};
              if(move === 'left') return {lane: position.lane, column: position.column - 1};
              if(move === 'right') return {lane: position.lane, column: position.column + 1};
            }, {lane: currentLane, column: currentColumn})

            // console.log(finalPositions)

            if (direction === 'forward') {
              if(lanes[finalPositions.lane+1].type === 'forest' && lanes[finalPositions.lane+1].occupiedPositions.has(finalPositions.column)) return;
              if(!stepStartTimestamp) startMoving = true;
              addLane();
            }
            else if (direction === 'backward') {
              if(finalPositions.lane === 0) return;
              if(lanes[finalPositions.lane-1].type === 'forest' && lanes[finalPositions.lane-1].occupiedPositions.has(finalPositions.column)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            else if (direction === 'left') {
              if(finalPositions.column === 0) return;
              if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column-1)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            else if (direction === 'right') {
              if(finalPositions.column === columns - 1 ) return;
              if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column+1)) return;
              if(!stepStartTimestamp) startMoving = true;
            }
            moves.push(direction);
          }

          window.addEventListener("keydown", event => {
            if (event.keyCode == '38') {
              // up arrow
              if (chicken.scale.z > 0.8) {
                  chicken.scale.z -= 0.2
              }
            }
            else if (event.keyCode == '40') {
              // down arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '37') {
              // left arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '39') {
              // right arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
          });

          window.addEventListener("keyup", event => {
            if (event.keyCode == '38') {
              console.log('currentColumn}}}}}}', currentColumn)
              console.log('chickenPosition}}}}}', chicken.position.x)
              chicken.scale.z = 1
              move('forward')
            //   cameraSpeed += 0.01
            }
            else if (event.keyCode == '40') {
              // down arrow
              chicken.scale.z = 1
              console.log('backward');
              console.log('currentColumn}}}}}}', currentColumn)
              console.log('chickenPosition}}}}}', chicken.position.x)
              move('backward')
            }
            else if (event.keyCode == '37') {
              // left arrow
              chicken.scale.z = 1
              console.log('left');
              console.log('currentColumn}}}}}}', currentColumn)
              console.log('chickenPosition}}}}}', chicken.position.x)
              move('left')
            }
            else if (event.keyCode == '39') {
              // right arrow
              chicken.scale.z = 1
              console.log('right');
              console.log('currentColumn}}}}}}', currentColumn)
              console.log('chickenPosition}}}}}', chicken.position.x)
              move('right')
            }
          });

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // requestAnimationFrame( animate );
        function animate(timestamp) {
            requestAnimationFrame( animate );

            if(!previousTimestamp) previousTimestamp = timestamp;
            const delta = timestamp - previousTimestamp;
            previousTimestamp = timestamp;

            // Animate cars and trucks moving on the lane
            lanes.forEach(lane => {
              if (lane.type === 'car' || lane.type === 'truck') {
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/2 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/2 + positionWidth*2*zoom;
                lane.vechicles.forEach(vechicle => {
                  if(lane.direction) {
                    vechicle.position.x = vechicle.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : vechicle.position.x -= lane.speed/16*delta;
                  }else{
                    vechicle.position.x = vechicle.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : vechicle.position.x += lane.speed/16*delta;
                  }
                });
              }

              if (lane.type === 'river') {
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/2 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/2 + positionWidth*2*zoom;
                lane.rafts.forEach(raft => {
                  if(lane.direction) {
                    raft.position.x = raft.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : raft.position.x -= lane.speed/16*delta;
                  }else{
                    raft.position.x = raft.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : raft.position.x += lane.speed/16*delta;
                  }
                });
              }


            });


            if(startMoving) {
              stepStartTimestamp = timestamp;
              startMoving = false;
            }

            if(stepStartTimestamp) {
              const moveDeltaTime = timestamp - stepStartTimestamp;
              const moveDeltaDistance = Math.min(moveDeltaTime/stepTime,1)*positionWidth*zoom;
              const jumpDeltaDistance = Math.sin(Math.min(moveDeltaTime/stepTime,1)*Math.PI)*8*zoom;
              switch(moves[0]) {
                case 'forward': {
                  const positionY = currentLane*positionWidth*zoom + moveDeltaDistance;
                //   console.log(chicken)
                if (chicken.position.y - 600 > camera.position.y) {
                    camera.position.y = initialCameraPositionY + positionY;
                }
                  dirLight.position.y = initialDirLightPositionY + positionY;
                  chicken.position.y = positionY; // initial chicken position is 0

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 0
                  break;
                }
                case 'backward': {
                  positionY = currentLane*positionWidth*zoom - moveDeltaDistance
                //   camera.position.y = initialCameraPositionY + positionY;
                  dirLight.position.y = initialDirLightPositionY + positionY;
                  chicken.position.y = positionY;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 3.15
                  break;
                }
                case 'left': {
                  const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 - moveDeltaDistance;
                  camera.position.x = initialCameraPositionX + positionX;
                  dirLight.position.x = initialDirLightPositionX + positionX;
                  chicken.position.x = positionX; // initial chicken position is 0
                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 1.6
                  break;
                }
                case 'right': {
                  const positionX = (currentColumn*positionWidth+positionWidth/2)*zoom -boardWidth*zoom/2 + moveDeltaDistance;
                  camera.position.x = initialCameraPositionX + positionX;
                  dirLight.position.x = initialDirLightPositionX + positionX;
                  chicken.position.x = positionX;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 4.7

                  break;
                }
              }
              // Once a step has ended
              if(moveDeltaTime > stepTime) {
                switch(moves[0]) {
                  case 'forward': {
                    currentLane++;
                    break;
                  }
                  case 'backward': {
                    currentLane--;
                    break;
                  }
                  case 'left': {
                    currentColumn--;
                    break;
                  }
                  case 'right': {
                    currentColumn++;
                    break;
                  }
                }
                moves.shift();
                // If more steps are to be taken then restart counter otherwise stop stepping
                stepStartTimestamp = moves.length === 0 ? null : timestamp;
              }
            }

            // Hit test
            if(lanes[currentLane].type === 'car' || lanes[currentLane].type === 'truck') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              const vechicleLength = { car: 60, truck: 105}[lanes[currentLane].type];
              lanes[currentLane].vechicles.forEach(vechicle => {
                const carMinX = vechicle.position.x - vechicleLength*zoom/2;
                const carMaxX = vechicle.position.x + vechicleLength*zoom/2;
                // if(chickenMaxX > carMinX && chickenMinX < carMaxX) {
                //   endDOM.style.visibility = 'visible';
                // }
              });
            }

            if(lanes[currentLane].type === 'river') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
            //   console.log(lanes[currentLane].rafts, chicken)
              lanes[currentLane].rafts.forEach(raft => {

                const raftMinX = raft.position.x - raft.geometry.parameters.width*zoom/2;
                const raftMaxX = raft.position.x + raft.geometry.parameters.width*zoom/2;
                if(chickenMaxX > raftMinX && chickenMinX < raftMaxX) {

                    chicken.position.x = raft.position.x

                    currentColumn = 17 - Math.round(( 1428 - (672 + chicken.position.x))/84)
                    camera.position.x = (chicken.position.x)
                    // currentColumn = columns - Math.round(( boardWidth*zoom - (672 + chicken.position.x))/ positionWidth*zoom)
                //   endDOM.style.visibility = 'visible';
                // lanes[currentLane].direction
                // ? (chicken.position.x -= lanes[currentLane].speed)
                // : (chicken.position.x += lanes[currentLane].speed);
                }
              });
            }
            // console.log(lanes[currentLane])

            renderer.render( scene, camera );
          }


          let timer

          if (chicken.position.y - 600 < camera.position.y + 100) {
            console.log('!!!!!!!!')
            timer = setInterval(() => {
                camera.position.y += cameraSpeed

              }, 15);
          } else {
              console.log('????????')
            clearInterval(timer)
          }

          requestAnimationFrame( animate );

        renderer.render(scene, camera);
    }, []);

    return <div ref={mountRef} />;
}
