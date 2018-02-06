import React, { Component } from 'react';
import Spacebackground from './components/Spacebackground';
import Getstartedbutton from './components/Getstartedbutton';
import logo from './components/rocket.svg';
import Login from './components/Login.js';
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
