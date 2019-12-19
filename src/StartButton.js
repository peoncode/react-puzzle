import React, { Component } from 'react';
import './App.css';

export class StartButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSize(this.props.size);
  }

  render() {
    return <button className="start-button" onClick={this.handleClick}>{this.props.text}</button>;
  }
}