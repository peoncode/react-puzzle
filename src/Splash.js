import React, { Component } from 'react';
import './Board.css';

export class Splash extends Component {
  render() {
    return (
      <div className="intro">
        <div>{this.props.title}</div>
        <div className="intro2">A <a href="http://reactjs.org" className="react" target="_blank">ReactJs</a> App</div>
      </div>
    );
  }
}