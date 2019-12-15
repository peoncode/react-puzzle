import React, { Component } from 'react';
import { Tile } from './Tile';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.__initStates();
    this.moveTile = this.moveTile.bind(this);
  }

  __initStates() {
    let state = {"win": "false"};
    const max = Math.pow(this.props.size, 2);
    let arr = [];
    for (let i=1; i<=max; i++) {
      arr.push(String(i));
    }
    LOCATION_LIST = initLocations(arr);
    shuffle(arr);
    
    for (let i=1; i<max; i++) {
      state["t"+i] = arr[i];
    }

    return state;
  }

  __checkWin() {
    const max = this.props.size * this.props.size;
    for(let i=1; i < max; i++) {
      if (this.state["t"+i] !== String(i)) {
        return;
      }
    }

    this.setState({"win": "true", "twin": String(max)});
    this.props.onWin();
  }

  __nextMove(n) {
    const size = parseInt(this.props.size);
    const row = Math.ceil(n/size);
    const col = n - ((row-1) * size);
    const takenSpots = Object.values(this.state);
  
    const up = row > 1 ? n-size : 0;
    if (up && !takenSpots.includes(String(up))) {
      return up;
    }
    const down = row < size ? n+size : 0;
    if (down && !takenSpots.includes(String(down))) {
      return down;
    }
    const left = col > 1 ? n-1 : 0;
    if (left && !takenSpots.includes(String(left))) {
      return left;
    }
    const right = col < size ? n+1 : 0;
    if (right && !takenSpots.includes(String(right))) {
      return right;
    }

    return null;
  }

  moveTile(button) {
    if (this.state.win === "false") {
      const size = parseInt(this.props.size);
      const tileId = "t" + button.getAttribute("tid");
      const location = parseInt(button.getAttribute("loc"));
      const newLoc = this.__nextMove(location);
      if (newLoc) {
        const newState = JSON.parse(`{"${tileId}": "${newLoc}"}`);
        this.setState(newState, () => {
          location === size*size && this.__checkWin();
        });
      }
    }
  }

  render() {
    const components = Object.keys(this.state).filter((key) => key[0] === "t").map((tId) =>
      <Tile id={tId.substring(1)} key={tId} loc={this.state[tId]} moveTile={this.moveTile} />
    );
    const sizeStyle = {
      height: this.props.size*100,
      width: this.props.size*100,
    };

    return (
      <div className="square" style={sizeStyle}>
        {components}
      </div>
    );
  }
}