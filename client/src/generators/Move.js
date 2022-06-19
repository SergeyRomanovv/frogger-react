export default function move(direction, moves, currentLane, currentColumn, lanes, columns, stepStartTimestamp, startMoving) {
  const finalPositions = moves.reduce((position,move) => {
    console.log(position, move)
    if(move === 'forward') return {lane: position.lane + 1, column: position.column};
    if(move === 'backward') return {lane: position.lane - 1, column: position.column};
    if(move === 'left') return {lane: position.lane, column: position.column - 1};
    if(move === 'right') return {lane: position.lane, column: position.column + 1};
  }, {lane: Number(currentLane), column: Number(currentColumn)})

  if (direction === 'forward') {
    if(lanes[finalPositions.lane+1].type === 'forest' && lanes[finalPositions.lane+1].occupiedPositions.has(finalPositions.column)) return;
    if(lanes[finalPositions.lane+1].type === 'forest2' && lanes[finalPositions.lane+1].occupiedPositions.has(finalPositions.column)) return;
    if(!stepStartTimestamp) startMoving = true;
    // addLane();
  }
  else if (direction === 'backward') {
    if(finalPositions.lane === 0) return;
    if(lanes[finalPositions.lane-1].type === 'forest' && lanes[finalPositions.lane-1].occupiedPositions.has(finalPositions.column)) return;
    if(lanes[finalPositions.lane-1].type === 'forest2' && lanes[finalPositions.lane-1].occupiedPositions.has(finalPositions.column)) return;
    if(!stepStartTimestamp) startMoving = true;
  }
  else if (direction === 'left') {
    if(finalPositions.column === 0) return;
    if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column-1)) return;
    if(lanes[finalPositions.lane].type === 'forest2' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column-1)) return;
    if(!stepStartTimestamp) startMoving = true;
  }
  else if (direction === 'right') {
    if(finalPositions.column === columns - 1 ) return;
    if(lanes[finalPositions.lane].type === 'forest' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column+1)) return;
    if(lanes[finalPositions.lane].type === 'forest2' && lanes[finalPositions.lane].occupiedPositions.has(finalPositions.column+1)) return;
    if(!stepStartTimestamp) startMoving = true;
  }
  moves.push(direction);
}