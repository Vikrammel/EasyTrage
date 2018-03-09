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
          <table>
            <span className="red"><b>Buy</b></span>
            <tr>
            <td>Exchange: <b>{prices.ask.exchange}</b></td>
            </tr>
            <tr>
            <td>Price: <span className="red">({prices.ask.price})</span></td>
            </tr>
            <tr>
            <td>Pair: <b>({prices.pair})</b></td>
            </tr>
            <span><img src={arrow} className="arrow" alt="logo"/></span>
            
            <tr>
            <td><span className="green"><b>Sell</b></span></td>
            </tr>
            <tr>
            <td>Exchange: <b>{prices.bid.exchange}</b></td>
            </tr>   
            <tr>
            <td>Price: <span className="green">({prices.bid.price})</span></td>
            </tr>
            <tr>
            <td>Pair: <b>({prices.pair})</b></td>
            </tr>
            <b>Profit: {prices.profit}%</b>
          </table>
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
