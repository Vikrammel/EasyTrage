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
      trades: [],
    };
  }

  componentDidMount() {
    axios.get(env.API_URL + '/api/suggestions')
      .then((res) => {
        // console.log(res.data);
        let suggestionsArray = res.data.map((prices, index) => {
          // console.log(prices);
          return (
            <span className="Cards" key={index}>
              <span className="card card-1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="red"><b>Buy</b></span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="red">{prices.ask.exchange}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="red">({prices.ask.price})</span></td>
                    </tr>
                    <tr>
                      <td>Pair: <b className="red">({prices.pair})</b></td>
                    </tr>

                    <tr>
                      <td>
                        <span><img src={arrow} className="arrow" alt="logo" /></span></td>
                    </tr>

                    <tr>
                      <td><span className="green"><b>Sell</b></span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="green">{prices.bid.exchange}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="green">({prices.bid.price})</span></td>
                    </tr>
                    <tr>
                      <td>Pair: <b className="green">({prices.pair})</b></td>
                    </tr>
                    <tr>
                      <td>
                        Profit: <b className="green">{prices.profit}%</b></td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </span>
          )
        })
        this.setState({ trades: suggestionsArray });

      })
      .catch((err) => {
        Alert.error("<span style='color:red'>" + String(err) + "</span>", this.alertOptions);
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
