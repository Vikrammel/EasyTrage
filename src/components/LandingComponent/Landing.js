import React, { Component } from 'react';
import Spacebackground from './Spacebackground';
import Getstartedbutton from './Getstartedbutton';
import logo from './rocket.svg';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
      <img src={logo} className="App-logo" alt="logo" />
        <Getstartedbutton />
        <Spacebackground />
      </div>
    );
  }
}

export default Landing;
