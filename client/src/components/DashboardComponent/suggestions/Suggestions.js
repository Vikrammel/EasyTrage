import React, { Component } from 'react';
import arrow from './arrowcropped.png';
import axios from 'axios';
import env from '../../../../config/env';
import './Suggestions.css';

export default class Suggestions extends Component {

  constructor() {
  super();
  this.state = {
      exchanges:[],
    };
  }

  componentDidMount(){
    axios.get(env.API_URL + '/api/suggestions')
    .then( (res) => {
      console.log(res.data);
      let suggestionsArray= res.data.map((prices)=> {
        console.log(prices);
        return(
          <span className="Cards">
          <span className="card card-1">
            <span ><h2>{prices.ask.exchange}({prices.ask.price})<br></br>{prices.pair}<img src={arrow} className="arrow" alt="logo"/><span>{prices.bid.exchange}({prices.bid.price})<br></br>{prices.pair}</span></h2></span>
            <b>Profit: {prices.profit}%</b>
          </span>
          </span>

        )
      })
      this.setState({exchange: suggestionsArray});

    })
  }

    render() {
      return (
        <div className="Suggestedtrades">
          {this.state.exchange}
        </div>
        );
      }
  }
