import React, { Component } from 'react';
import arrow from './arrowcropped.png';
import axios from 'axios';
import env from '../../../../config/env';
import Alert from 'react-s-alert';

import './Suggestions.css';

export default class Suggestions extends Component {

  constructor(props) {
  super(props);

  this.alertOptions = {
    offset: 100,
    position: 'top',
    theme: 'dark',
    timeout: 5000,
    transition: 'scale',
    html: true
  };

  this.state = {
      trades:[],
    };
  }

  componentDidMount(){
    axios.get(env.API_URL + '/api/suggestions')
    .then( (res) => {
      // console.log(res.data);
      let suggestionsArray= res.data.map((prices, index)=> {
        // console.log(prices);
        return(
          <span className="Cards" id={index}>
          <span className="card card-1">
            <span ><h2>{prices.ask.exchange}({prices.ask.price}) <img src={arrow} className="arrow" alt="logo"/><span>{prices.bid.exchange}({prices.bid.price})</span></h2></span>
            {prices.profit}%
          </span>
          </span>
        )
      })
      this.setState({trades: suggestionsArray});

    })
    .catch( (err) => {
      Alert.error("<span style='color:red'>"+String(err)+"</span>", this.alertOptions);
    })
  }

    render() {
      return (
        <div className="Suggestedtrades">
          <Alert stack={{ limit: 1, spacing: 50 }} />
          {this.state.trades}
        </div>
        );
      }
  }
