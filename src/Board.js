import React, { Component } from 'react';
import { Tile } from './Tile';
import { Splash } from './Splash';
import './Board.css';

export class Board extends Component {
  constructor(props) {
    super(props);
    this.moveTile = this.moveTile.bind(this);
  }

  __nextMove(n) {
    const size = parseInt(this.props.data.size);
    const max = ""+size*size;
    const row = Math.ceil(n/size);
    const col = n - ((row-1) * size);
    const freeSpot = Number(Object.entries(this.props.data.tiles).find((e) => e[1] === max)[0]);
  
    const up = row > 1 ? n-size : 0;
    if (up === freeSpot) {
      return up;
    }
    const down = row < size ? n+size : 0;
    if (down === freeSpot) {
      return down;
    }
    const left = col > 1 ? n-1 : 0;
    if (left === freeSpot) {
      return left;
    }
    const right = col < size ? n+1 : 0;
    if (right === freeSpot) {
      return right;
    }

    return null;
  }

  moveTile(button) {
    if (this.props.data.win === "false") {
      const location = parseInt(button.getAttribute("tid"));
      const tileId = location;
      const newLoc = this.__nextMove(location);
      if (newLoc) {
        const newState = this.props.data.tiles;
        const temp = this.props.data.tiles[tileId];
        newState[tileId] = this.props.data.tiles[newLoc];
        newState[newLoc] = temp;
        this.props.onMoveTile(newState);
      }
    }
  }

  __tileFilter(key) {
    if (this.props.data.win === "true") {
      return true;
    }

    const num = parseInt(key);
    const max = this.props.data.size*this.props.data.size;
    if (num <= max && this.props.data.tiles[key] < max) {
      return true;
    }
    return false;
  }

  render() {
    const components = Object.keys(this.props.data.tiles).filter((key) => this.__tileFilter(key)).map((id) => {
      // console.log(`Tile tId=${id} id=${this.props.data.tiles[id]}`);
      return <Tile tId={id} id={this.props.data.tiles[id]} key={"t"+id+"_"+this.props.data.size} loc={this.props.data.loc[id]} moveTile={this.moveTile} />
    });
    const boardSize = {
      height: this.props.data.size*125,
      width: this.props.data.size*125,
    };

    return (
      <div className="square" style={boardSize}>
        {components}
        {this.props.data.intro && (<Splash title="Number Slider" />)}
      </div>
    );
  }
}