import React, {Component} from 'react';
import './Button.css';

class Getstartedbutton extends Component {

  handleClick = () => {
    
  }

  render() {
    return (
      <div className="wrapper">
        <button className="btn btn--stripe" onClick={this.handleClick}>Get Started</button>
      </div>
    );
  }
}

export default Getstartedbutton;
