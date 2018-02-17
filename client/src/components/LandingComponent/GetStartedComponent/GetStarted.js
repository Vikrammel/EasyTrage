import React, {Component} from 'react';
import Login from './Login.js';
import './GetStarted.css';

class GetStarted extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick() {
    var rocket = document.getElementById("rocket");
    var pos = 0;
    var acc = 1;
    var id = setInterval(toTheMoon, 1);
    function toTheMoon() {
        if (pos === -3000) {
            clearInterval(id);
        } else {
            pos -= acc;
            rocket.style.top = pos + 'px';
            acc += 0.4;
        }
    }
      console.log("could not change rocket animation");
    this.setState({
      showLoginForm: true
    });
  }

  render() {
    return (
      <div className="wrapper">
        <button className="btn btn--stripe" ref="getStartedButton" 
          onClick={this._onButtonClick}>Get Started</button>
        {
          this.state.showLoginForm ?
          (this.refs["getStartedButton"].style.display='none' , <Login />) :
          null
        }
      </div>
    );
  }
}

export default GetStarted;
