import React, { Component } from 'react';
import Spacebackground from './components/LandingComponent/Spacebackground';
import Getstartedbutton from './components/LandingComponent/Getstartedbutton';
import logo from './components/LandingComponent/rocket.svg';
import Login from './components/LandingComponent/Login.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Getstartedbutton />
      <Spacebackground />
      <Login />
      </div>
    );
  }
}

export default App;
