import React, { Component } from 'react';
import { Board } from './Board';
import { StartButton } from './StartButton';
import './App.css';

let LOCATION_MAP = {};
let BLANKS_MAP = {};

class App extends Component {
  constructor (props) {
    super(props);
    initApp();

    this.state = {
      "intro": true,
      "win": "true",
      "count": 0,
      "message": `Select a puzzle size to start`,
      "size": 4,
      "loc": LOCATION_MAP[String(4)],
      "tiles": {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        8: "8",
        9: "9",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "win"
      }
    }
    this.newGame = this.newGame.bind(this);
    this.handleTileMove = this.handleTileMove.bind(this);
  }

  newGame(size) {
    const newState = resetStates(size);
    this.setState(newState);
  }

  handleTileMove(newTilesState) {
    const max = this.state.size * this.state.size;
    const newCount = this.state.count+1;
    for(let i=1; i < max; i++) {
      if (newTilesState[i] !== String(i)) {
        this.setState({"tiles": newTilesState, "count": newCount, "message": `Moves: ${newCount}`});
        return;
      }
    }
    newTilesState[max] = "win";
    this.setState({"win": "true", "message": `You did it in ${newCount} moves!`, "tiles": newTilesState});
  }

  render() {
    return (
      <div className="App">
        <div className="button-bar">
          <StartButton text="SMALL" onSize={this.newGame} size="3"/>
          <StartButton text="MEDIUM" onSize={this.newGame} size="4"/>
          <StartButton text="LARGE" onSize={this.newGame} size="5"/>
        </div>
        <Board onMoveTile={this.handleTileMove} data={this.state}/>
        <h2 className="counter">{this.state.message}</h2>
        <div className="credit">©Kevin Dang (Dec 2019)</div>
      </div>
    );
  }
}
export default App;

function initApp() {
  initLocations(3);
  initLocations(4);
  initLocations(5);
}

function initLocations(size) {
  const max = size * size;
  let arr = [];
  BLANKS_MAP[String(size)] = [null];
  for (let i=1; i<=max; i++) {
    const row = Math.ceil(i/size);
    const col = i - ((row-1) * size);
    arr.push({
      top: (row-1) * 125,
      left: (col-1) * 125
    });
    BLANKS_MAP[String(size)].push(String(i));
  }
  arr.unshift(null);
  LOCATION_MAP[String(size)] = arr;
}

function resetStates(size) {
  const max = size * size;
  let state = {
    "win": "false",
    "intro": false,
    "count": 0,
    "message": `Moves: 0`,
    "size": size,
    "loc": LOCATION_MAP[String(size)],
    "tiles": {}
  };
  let arr = BLANKS_MAP[size].slice();
  shuffleTiles(arr);
  
  for (let i=1; i<=max; i++) {
    state.tiles[i] = arr[i];
  }

  return state;
}

function shuffleTiles(a) {
  const max = a.length-1;
  let current = max;
  let count = 0;
  const maxCount = Math.floor(Math.random() * 25) + Math.pow(4, Math.sqrt(max));
  while (count++ < maxCount) {
    let availSpaces = getAvailableSpaces(current, a);
    let i = Math.floor(Math.random()*availSpaces.length);
    let swapIdx = Number(availSpaces[i]);
    [a[swapIdx], a[current]] = [a[current], a[swapIdx]];
    current = swapIdx;
  }

  console.log(`shuffled ${maxCount} times --> `,a);
  return a;
}

function getAvailableSpaces(n, arr) {
  const size = Math.sqrt(arr.length-1);
  const row = Math.ceil(n/size);
  const col = n - ((row-1) * size);
  let retArr = [];

  const up = row > 1 ? n-size : 0;
  if (up) {
    retArr.push(up);
  }
  const down = row < size ? n+size : 0;
  if (down) {
    retArr.push(down);
  }
  const left = col > 1 ? n-1 : 0;
  if (left) {
    retArr.push(left);
  }
  const right = col < size ? n+1 : 0;
  if (right) {
    retArr.push(right);
  }

  return retArr;
}