import React, { Component } from 'react';
import coin from './Ripple.png';
import './coindata.css';

class Coindata extends Component {
	render(){
		return(
				<div className="card">
					<div className="card-block">
						<h4 className="card-title">Ripple</h4>
    					<p className="card-text">(XRP)</p>
					</div>
					<img className="card-img-bottom" src={coin} alt="coin"/>
				</div>
			);
	}
}

export default Coindata;
