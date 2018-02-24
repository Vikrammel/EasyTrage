import React, { Component } from 'react';
import arrow from './doublearrow.jpg';
import './suggestedtrades.css';

class Suggestedtrades extends Component {
    render() {
      return (
        <div className="Suggestedtrades">
          <span className="Cards">
          <span className="card card-1">
            <span style={{ color: 'green' }}><h2>Bianace(.4213) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'red' }}>CoinBase(.30942)</span></h2></span>
          </span>
          </span>

          <span className="Cards">
          <span className="card card-1">
          <span style={{ color: 'red' }}><h2>Gemini(.9174) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'green' }}>CoinBase(1.4389)</span></h2></span>
          </span>
          </span>
          <span className="Cards">
          <span className="card card-1">
          <span style={{ color: 'red' }}><h2>CoinBase(.1894) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'green' }}>BitGrail(.5084)</span></h2></span>
          </span>
          </span>
          <span className="Cards">
          <span className="card card-1">
          <span style={{ color: 'green' }}><h2>bittrex(.9183) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'red' }}>CoinBase(.4324)</span></h2></span>
          </span>
          </span>
          <span className="Cards">
          <span className="card card-1">
          <span style={{ color: 'red' }}><h2>Kraken(.4213) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'green' }}>bittrex(.4351)</span></h2></span>
          </span>
          </span>
          <span className="Cards">
          <span className="card card-1">
          <span style={{ color: 'green' }}><h2>BitFinex(.546772) <img src={arrow} className="arrow" alt="logo"/><span style={{ color: 'red' }}>CoinBase(.2145)</span></h2></span>
          </span>
          </span>
          </div>
        );
      }
  }

export default Suggestedtrades;
