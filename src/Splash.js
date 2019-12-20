import React, { Component } from 'react';
import './Board.css';

export class Splash extends Component {
  render() {
    return (
      <div className="intro">
        <div>{this.props.title}</div>
        <div className="intro2">A ReactJs App</div>
      </div>
    );
  }
}