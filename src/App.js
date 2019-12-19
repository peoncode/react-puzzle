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

    this.state = resetStates(3);
    this.newGame = this.newGame.bind(this);
    this.handleTileMove = this.handleTileMove.bind(this);
  }

  newGame(size) {
    const newState = resetStates(size);
    this.setState(newState);
  }

  handleTileMove(newTilesState) {
    const max = this.state.size * this.state.size;
    // for(let i=1; i < max; i++) {
    //   if (newTilesState[i] !== String(i)) {
    //     this.setState({"tiles": newTilesState});
    //     return;
    //   }
    // }
    if (newTilesState[9] === "9") {

    newTilesState[max] = "win";
    this.setState({"win": "true", "tiles": newTilesState});

    }else {this.setState({"tiles": newTilesState});}
  }

  render() {
    const winner = "win-" + this.state.win;
    return (
      <div className="App">
        <div className="button-bar">
          <StartButton text="SMALL" onSize={this.newGame} size="3"/>
          <StartButton text="MEDIUM" onSize={this.newGame} size="4"/>
          <StartButton text="LARGE" onSize={this.newGame} size="5"/>
        </div>
        <Board onMoveTile={this.handleTileMove} data={this.state}/>
        <h1 className={winner}>You did it!</h1>
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
  BLANKS_MAP[String(size)] = [];
  for (let i=1; i<=max; i++) {
    const row = Math.ceil(i/size);
    const col = i - ((row-1) * size);
    arr.push({
      top: (row-1) * 150,
      left: (col-1) * 150
    });
    BLANKS_MAP[String(size)].push(String(i));
  }
  arr.unshift(null);
  LOCATION_MAP[String(size)] = arr;
}

function resetStates(size) {
  const max = size * size;
  let state = {"win": "false", "size": size, "loc": LOCATION_MAP[String(size)], "tiles": {}};
  let arr = BLANKS_MAP[size];
  shuffleTiles(arr);
  
  for (let i=1; i<=max; i++) {
    state.tiles[i] = arr[i-1];
  }

  return state;
}

function shuffleTiles(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}