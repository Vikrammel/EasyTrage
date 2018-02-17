import React, { Component } from 'react';
import SpaceBackground from './SpaceBackground';
import GetStarted from './GetStartedComponent/GetStarted';
import logo from './rocket.svg';
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="landingText">
          <span className="landingHeader">EasyTrage</span>
          <p className="landingTagline">A Cryptocurrency arbitrage bot.</p>
        </div>
        <GetStarted />
        <SpaceBackground />
      </div>
    );
  }
}

export default Landing;
