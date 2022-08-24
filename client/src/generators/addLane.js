import Lane from "./Lane";

export default function addLane (scene, lanes, zoom, boardWidth, positionWidth, vechicleColors, height) {
    const index = lanes.length;
    let lane = new Lane(index, zoom, boardWidth, positionWidth, vechicleColors, height);
    while(lanes[lanes.length-1].type === 'waterpads' && lane.type === 'waterpads'){
        lane = new Lane(index, zoom, boardWidth, positionWidth, vechicleColors, height);
    }
    if (lanes[lanes.length-1].type === 'river' && lane.type === 'river'){
        lane.direction = !lanes[lanes.length-1].direction
    }
    lane.mesh.position.y = index*positionWidth*zoom;
    scene.add(lane.mesh);
    console.log('addLane', {lanes, lane})
    lanes.push(lane);
  }