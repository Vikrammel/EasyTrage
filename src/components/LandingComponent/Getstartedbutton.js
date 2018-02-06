import React, {Component} from 'react';
import Login from './Login.js';
import './Button.css';

class Getstartedbutton extends Component {

  constructor(props) {
  super(props);
  this.state = {
    showComponent: false,
  };
  this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    this.setState({
      showComponent: true,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <button className="btn btn--stripe" onClick={this._onButtonClick}>Get Started</button>
        {this.state.showComponent ?
          <Login /> :
          null
        }
      </div>
    );
  }
}

export default Getstartedbutton;
