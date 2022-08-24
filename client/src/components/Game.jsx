/* eslint-disable default-case */
import React, { useRef, useEffect, useState } from 'react';
import style from './style.module.css';
import * as THREE from 'three';
import { useSwipeable } from 'react-swipeable';
import Chicken from '../generators/Chicken';
import Chick from '../generators/Chicken copy';
import generateLanes from '../generators/generateLanes';
import Lane from '../generators/Lane';
import myReact from '../generators/Texts/myReact';
import Restart from './Restart/Restart';
import Score from './Score/Score';
import About from './About/About';
import Billboard from '../generators/Items/Billboard';
import move from '../generators/Move';
import addLane from '../generators/addLane';
import initBillboards from '../generators/initBillboards';
import initText from '../generators/initText';
import SwipeListener from 'swipe-listener';

export default function Game() {
    const mountRef = useRef(null);
    const [isDead, setIsDead] = useState(false);
    const [restart, setRestart] = useState(false);
    const [score, setScore] = useState(0)
    const [about, setAbout] = useState(false)
    let localIsDead = false;
    let lanes;
    const scene = new THREE.Scene();
    const zoom = 2;
    let chickenSize = 12;
    let moves = [];
    let chicken = new Chicken(zoom)
    const distance = 500;
    let height;
    let cameraSpeed = 0.5;
    let positionY;
    let stepTime = 200;
    const columns = 17;
    let currentLane = 0;
    let currentColumn = Math.floor(columns / 2);
    let previousTimestamp;
    let startMoving;
    let stepStartTimestamp;
    let vechicleColors;

    const positionWidth = 42;
    const boardWidth = positionWidth * columns;

    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      0.1,
      10000
  );

  function soundClick() {
    var audio = new Audio();
    audio.src = './sounds/2j.wav';
    audio.volume = 0.1;
    audio.autoplay = true;
  }

  function coinAudio() {
    const audio = new Audio();
    audio.src = './sounds/coin.wav'
    audio.volume = 0.1
    audio.autoplay = true;
  }

  function loseAudio() {
    const audio = new Audio();
    audio.src = './sounds/lose.wav';
    audio.volume = 0.1;
    audio.autoplay = true;
  }

  if (isDead) {
    loseAudio();
  }

  function aboutHandler() {
    setAbout(!about);
  }

  function move(direction) {
    const finalPositions = moves.reduce((position,move) => {
      console.log(position, move)
      if(move === 'forward') return {lane: position.lane + 1, column: position.column};
      if(move === 'backward') return {lane: position.lane - 1, column: position.column};
      if(move === 'left') return {lane: position.lane, column: position.column - 1};
      if(move === 'right') return {lane: position.lane, column: position.column + 1};
      return 
    }, {lane: Number(currentLane), column: Number(currentColumn)})
  
    if (direction === 'forward') {
      console.log({lanes, finalPositions})
      if(lanes[finalPositions.lane+1]?.type === 'forest' && lanes[finalPositions.lane+1]?.occupiedPositions?.has(finalPositions.column)) return;
      if(lanes[finalPositions.lane+1]?.type === 'forest2' && lanes[finalPositions.lane+1]?.occupiedPositions?.has(finalPositions.column)) return;
      if(!stepStartTimestamp) startMoving = true;
      addLane (scene, lanes, zoom, boardWidth, positionWidth, vechicleColors, height);
    }
    else if (direction === 'backward') {
      if(finalPositions.lane === 0) return;
      if(lanes[finalPositions.lane-1]?.type === 'forest' && lanes[finalPositions.lane-1]?.occupiedPositions?.has(finalPositions.column)) return;
      if(lanes[finalPositions.lane-1]?.type === 'forest2' && lanes[finalPositions.lane-1]?.occupiedPositions?.has(finalPositions.column)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    else if (direction === 'left') {
      if(finalPositions.column === 0) return;
      if(lanes[finalPositions.lane]?.type === 'forest' && lanes[finalPositions.lane]?.occupiedPositions?.has(finalPositions.column-1)) return;
      if(lanes[finalPositions.lane]?.type === 'forest2' && lanes[finalPositions.lane]?.occupiedPositions?.has(finalPositions.column-1)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    else if (direction === 'right') {
      if(finalPositions.column === columns - 1 ) return;
      if(lanes[finalPositions.lane]?.type === 'forest' && lanes[finalPositions.lane]?.occupiedPositions?.has(finalPositions.column+1)) return;
      if(lanes[finalPositions.lane]?.type === 'forest2' && lanes[finalPositions.lane]?.occupiedPositions?.has(finalPositions.column+1)) return;
      if(!stepStartTimestamp) startMoving = true;
    }
    moves.push(direction);
    console.log(moves)
  }

  const moveForwardHandle = () => {
    move('forward')
    setScore(currentLane + 1)
  }

  // const handlers = useSwipeable({
  //   onTap: moveForwardHandle,
  //   onSwipedLeft: () => move('left'),
  //   onSwipedRight: () => move('right'),
  //   onSwipedDown: () => move('backward'),
  //   swipeDuration: 300,
  //   trackMouse: false,
  //   preventScrollOnSwipe: true,
  // })

  // const refPassthrough = (el) => {
  //   handlers.ref(el)

  //   mountRef.current = el
  // }

    useEffect(() => {
        scene.background = new THREE.Color('#141517');

        vechicleColors = [0xa52523, 0xbdb638, 0x78b14b, 0x1a5b9c];
        chicken.position.z = -1;

        scene.add(chicken);
        initBillboards(scene, zoom)

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
        dirLight.angle = Math.PI / 4;
        dirLight.castShadow = true;
        scene.add(dirLight);

        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        var d = 300;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

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

        initText(scene, zoom, boardWidth, )

        const initaliseValues = () => {
            lanes = generateLanes(zoom, boardWidth, positionWidth, scene, vechicleColors, height);

            currentLane = 0;
            currentColumn = Math.floor(columns / 2);

            previousTimestamp = null;

            startMoving = false;

            chicken.position.x = 0;
            chicken.position.y = 0;

            camera.position.y = initialCameraPositionY;
            camera.position.x = initialCameraPositionX;

            dirLight.position.x = initialDirLightPositionX;
            dirLight.position.y = initialDirLightPositionY;
        };

        initaliseValues();

          window.addEventListener("keydown", event => {
            if (event.keyCode == '38' && localIsDead === false) {
              // up arrow
              if (chicken.scale.z > 0.8) {
                  chicken.scale.z -= 0.2
              }
            }
            else if (event.keyCode == '40' && localIsDead === false) {
              // down arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '37' && localIsDead === false) {
              // left arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
            else if (event.keyCode == '39' && localIsDead === false) {
              // right arrow
              if (chicken.scale.z > 0.8) {
                chicken.scale.z -= 0.2
            }
            }
          });

          window.addEventListener("keyup", event => {
            if (event.keyCode == '38' && localIsDead === false) {
              chicken.scale.z = 1
              // move('forward')
              // console.log({scene, lanes, zoom, boardWidth, positionWidth, vechicleColors, height})
              moveForwardHandle()
              soundClick()
              cameraSpeed += 0.01;
            }
            else if (event.keyCode == '40' && localIsDead === false) {
              //down arrow
              chicken.scale.z = 1
              soundClick()
              move('backward')
            }
            else if (event.keyCode == '37' && localIsDead === false) {
              //left arrow
              chicken.scale.z = 1
              soundClick()
              move('left')
            }
            else if (event.keyCode == '39' && localIsDead === false) {
              //right arrow
              chicken.scale.z = 1
              soundClick()
              move('right')
            }
          });

          const gameCanvas = document.querySelector('#game')
          const listener = SwipeListener(gameCanvas)
          console.log(listener)

          // gameCanvas.addEventListener('touchend', function (e) {
          //   moveForwardHandle()
          //   soundClick()
          // })
          
          gameCanvas.addEventListener('swipe', function (e) {
            var directions = e.detail.directions;

            if (directions.left) {
              console.log(e.detail)
              chicken.scale.z = 1
              soundClick()
              move('left')
            }
           
            if (directions.right) {
              chicken.scale.z = 1
              soundClick()
              move('right')
            }
           
            if (directions.top) {
              moveForwardHandle()
              soundClick()
            }
           
            if (directions.bottom) {
              chicken.scale.z = 1
              soundClick()
              move('backward')
            }
          })

          // let lastY = 1;
          // document.addEventListener("touchmove", function (event) {
          //   const lastS = document.documentElement.scrollTop;
          //   if(lastS == 0 && (lastY-event.touches[0].clientY)<0 && event.cancelable){
          //     event.preventDefault(); 
          //     event.stopPropagation();
          //   }
          //   lastY = event.touches[0].clientY;
          // },{passive: false});

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        dirLight.target = chicken;

        window.addEventListener( 'resize', onWindowResize, false );

          function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
          }

        function animate(timestamp) {
          requestAnimationFrame( animate );

            if(!previousTimestamp) previousTimestamp = timestamp;
            const delta = timestamp - previousTimestamp;
            previousTimestamp = timestamp;

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

              if (lane.type === 'railroad') {
                const aBitBeforeTheBeginingOfLane = -boardWidth*zoom/0.1 - positionWidth*2*zoom;
                const aBitAfterTheEndOFLane = boardWidth*zoom/0.1 + positionWidth*2*zoom;
                const greenSignal = new THREE.Color('rgb(0, 255, 0)');
                const redSignal = new THREE.Color('rgb(255, 0, 0)');

                lane.trains.forEach(train => {
                    if(lane.direction) {
                        train.position.x = train.position.x < aBitBeforeTheBeginingOfLane ? aBitAfterTheEndOFLane : train.position.x -= lane.speed/0.7*delta;
                        if(train.position.x < 4142 && train.position.x > -2142){
                            lane.mesh.children[39].children[10].material.color = redSignal;
                            lane.mesh.children[39].children[11].material.color = redSignal;
                        }else{
                            lane.mesh.children[39].children[10].material.color = greenSignal;
                            lane.mesh.children[39].children[11].material.color = greenSignal;

                        }
                    }else{
                        train.position.x = train.position.x > aBitAfterTheEndOFLane ? aBitBeforeTheBeginingOfLane : train.position.x += lane.speed/0.7*delta;
                        if (train.position.x > -4142 && train.position.x < 2142){
                          lane.mesh.children[39].children[10].material.color = redSignal;
                          lane.mesh.children[39].children[11].material.color = redSignal;
                        }else {
                            lane.mesh.children[39].children[10].material.color = greenSignal;
                            lane.mesh.children[39].children[11].material.color = greenSignal;
                        }
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
                if (chicken.position.y - 600 > camera.position.y) {
                    camera.position.y = initialCameraPositionY + positionY;
                }
                  dirLight.position.y = initialDirLightPositionY + positionY;
                  chicken.position.y = positionY;

                  chicken.position.z = jumpDeltaDistance;
                  chicken.rotation.z = 0
                  break;
                }
                case 'backward': {
                  positionY = currentLane*positionWidth*zoom - moveDeltaDistance
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
                if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.scale.z = 0.2;
                    cameraSpeed = 0;
                }
              });
            }

            if(lanes[currentLane].type === 'railroad') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              const vechicleLength = {railroad: (42*4*3) * zoom}[lanes[currentLane].type];
              lanes[currentLane].trains.forEach(train => {
                const carMinX = train.position.x - vechicleLength*zoom/2;
                const carMaxX = train.position.x + vechicleLength*zoom/2;
                if (chickenMaxX > carMinX && chickenMinX < carMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.scale.z = 0.2;
                    cameraSpeed = 0;
                }
              });
            }

            if(lanes[currentLane].type === 'forest') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
              let coin
              let coinMinX
              let coinMaxX

                if (lanes[currentLane].mesh.children[9]) {
                coin = lanes[currentLane].mesh.children[9]
                coinMinX = coin.position.x - 42
                coinMaxX = coin.position.x + 42
              }
                if (chickenMaxX > coinMinX && chickenMinX < coinMaxX && coin !== undefined) {
                  coin.position.z = -30
                  coin.position.x = 2000
                  coinAudio()
                  // setScore((prev) => prev + 3)
            }
          }

          if(lanes[currentLane].type === 'forest2') {
            const chickenMinX = chicken.position.x - chickenSize*zoom/2;
            const chickenMaxX = chicken.position.x + chickenSize*zoom/2;
            let coin
            let coinMinX
            let coinMaxX

              if (lanes[currentLane].mesh.children[6]) {
              coin = lanes[currentLane].mesh.children[6]
              coinMinX = coin.position.x - 42
              coinMaxX = coin.position.x + 42
            }
              if (chickenMaxX > coinMinX && chickenMinX < coinMaxX && coin !== undefined) {
              coin.position.z = -30
              coin.position.x = 2000
              coinAudio()
              // setScore((prev) => prev + 3)
          }
        }

            if(lanes[currentLane].type === 'waterpads') {
              const padsArr = []
              lanes[currentLane].pads.forEach(pad => {
                padsArr.push(Number(pad.position.x))
              })
              padsArr.sort((a,b) => {
                return a - b
              })

              let holes = [
                [-672, padsArr[0] - 42],
                [padsArr[0] + 42, padsArr[1] - 42],
                [padsArr[1] + 42, padsArr[2] - 42],
                [padsArr[2] + 42, padsArr[3] - 42],
                [padsArr[3] + 42, padsArr[4] - 42],
                [padsArr[4] + 42, 672]
              ]

              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;

              holes.forEach((hole, index) => {
                const holeMinX = hole[0];
                const holeMaxX = hole[1];
                if (chickenMaxX > holeMinX && chickenMinX < holeMaxX && holeMaxX !== holeMinX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.position.z = -50;
                    cameraSpeed = 0;
                }
              });
            }

            if(lanes[currentLane].type === 'river') {
              const chickenMinX = chicken.position.x - chickenSize*zoom/2;
              const chickenMaxX = chicken.position.x + chickenSize*zoom/2;

              const raftsArr = [];
              lanes[currentLane].rafts.forEach(raft => {
                raftsArr.push(Number(raft.position.x))
              });

              raftsArr.sort((a,b) => {
                return a - b
              });

              let holes = [
                [-672, raftsArr[0] - 60],
                [raftsArr[0] + 60, raftsArr[1] - 60],
                [raftsArr[1] + 60, raftsArr[2] - 60],
                [raftsArr[2] + 60, raftsArr[3] - 60],
                [raftsArr[3] + 60, 672],
              ];

              holes.forEach((hole, index) => {
                const holeMinX = hole[0];
                const holeMaxX = hole[1];
                if (chickenMaxX > holeMinX && chickenMinX < holeMaxX) {
                    localIsDead = true;
                    setIsDead(true);
                    chicken.position.z = -50;
                    cameraSpeed = 0;
                }
              });

              lanes[currentLane].rafts.forEach(raft => {
                const raftMinX = raft.position.x - raft.geometry.parameters.width/2;
                const raftMaxX = raft.position.x + raft.geometry.parameters.width/2;
                if(chickenMaxX > raftMinX && chickenMinX < raftMaxX) {
                    chicken.position.x = raft.position.x
                    currentColumn = 17 - Math.round(( 1428 - (672 + chicken.position.x))/84)
                    // camera.position.x = (chicken.position.x)
                    dirLight.position.x = (chicken.position.x - 100)
                    if (chicken.position.x > 672 || chicken.position.x < -672) {
                      localIsDead = true;
                      setIsDead(true);
                      chicken.scale.x = 0.2;
                    }
                }
              });
            }
            renderer.render( scene, camera );
          }

          let timer = setInterval(() => {
            if (currentLane > 0) {
                camera.position.y += cameraSpeed;
            }
        }, 15);

        if (chicken.position.y - 600 > camera.position.y) {
            clearInterval(timer);
        }

        if (restart) {
          lanes.forEach(lane => scene.remove( lane.mesh ));
          scene.clear()
          window.location.reload()
        }

        requestAnimationFrame( animate );

        renderer.render(scene, camera);
    }, [restart]);

    return (
        <>
            <div id='game' className={style.game} ref={mountRef} />
            <div className={style.scoreBox}>
              <Score score={score}/>
            </div>
            <div className={style.aboutButtonBox}>
              <button className={style.aboutBtn} onClick={aboutHandler}>About me</button>
            </div>
            {isDead === true && restart === false ? (
                <>
                    <div className={style.backdrop}/>
                    <div className={style.end}>
                        <Restart restart={restart} setRestart={setRestart}/>
                    </div>
                </>
            ) : null}
            {
              about === true ?
              (
                <>
                  <About setAbout={setAbout} about={about}/>
                </>
              ) : (
                null
              )
            }
        </>
    );
}
