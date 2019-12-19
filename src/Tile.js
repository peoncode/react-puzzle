import React, { Component } from 'react';
import './Tile.css';

export class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.moveTile(e.target);
  }

  render() {
    let className;
    let location = this.props.loc;
    let label = this.props.id;
    if (this.props.id === "win") {
      label = "";
      className = "win-button";
    } else {
      className = "Tile";
    }
    
    return (
      <button className={className} style={location} tid={this.props.tId} onClick={this.handleClick}>
        {label}
      </button>
    );
  }
}