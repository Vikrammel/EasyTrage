import React, { Component } from 'react';

/* image imports */
import arrow from './arrowcropped.png';
import rightArrowCircle from './rightArrowCircle.png';
import rightArrowLarge from './rightArrowLarge.png';
import btcpng from './currency_icons/btc.png';
import ethpng from './currency_icons/eth.png';
import usdpng from './currency_icons/usd.png';
import usdtpng from './currency_icons/usdt.png';
import xrppng from './currency_icons/xrp.png';
import binancepng from './exchange_icons/binance.png';
import bitfinexpng from './exchange_icons/bitfinex.png';
import bitstamppng from './exchange_icons/bitstamp.png';
import bittrexpng from './exchange_icons/bittrex.png';
import cexiopng from './exchange_icons/cexio.png';
import exmopng from './exchange_icons/exmo.png';
import gateiopng from './exchange_icons/gateio.png';
import hitbtcpng from './exchange_icons/hitbtc.png';
import krakenpng from './exchange_icons/kraken.png';
import poloniexpng from './exchange_icons/poloniex.png';

const imageVarName = {
  "btcpng": btcpng,
  "ethpng": ethpng,
  "usdpng": usdpng,
  "usdtpng": usdtpng,
  "xrppng": xrppng,
  "binancepng": binancepng,
  "bitfinexpng": bitfinexpng,
  "bitstamppng": bitstamppng,
  "bittrexpng": bittrexpng,
  "cexiopng": cexiopng,
  "exmopng": exmopng,
  "gateiopng": gateiopng,
  "hitbtcpng": hitbtcpng,
  "krakenpng": krakenpng,
  "poloniexpng": poloniexpng
}

import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import env from '../../../../config/env';
import Alert from 'react-s-alert';

import './Suggestions.css';

const tradeButtonStyle = {
  backgroundColor: "#67c26f"
};



// When the user clicks on <span> (x), close the modal
// spanOnClick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// windowOnClick = function(event) {
//   if (event.target == modal) {
//       modal.style.display = "none";
//   }
// } 

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
      trades: {},
      cards: [],
      open: false,
      modalStyle:{
        display: "none"
      },
      modalCardIndex: null
    };
  }


  handleOpen = (index) => {
    this.setState({open: true, modalCardIndex: index});
    // this.setState({eName: n});
  };

  handleClose = () => {
    this.setState({open: false, modalCardIndex: null});
  };

  componentDidMount() {
    axios.get(env.API_URL + '/api/suggestions')
      .then((res) => {
        // console.log(res.data);
        this.setState({trades:res.data});
        let suggestionsArray = res.data.map((prices, index) => {
          // console.log(prices);
          return (
            <span className="Cards" key={index}>
              <span className="card card-1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                      <br/>
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
                      <td>
                      <RaisedButton label="Trade" type="submit" onClick={this.handleOpen.bind(this,index)} buttonStyle={tradeButtonStyle} />
                      <br/>
                      <br/>
                      </td>
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
                        Minimum: <b className="yellow">{prices.minOtherVolume + " " + prices.pair.slice(3)}</b></td>
                    </tr>
                    <tr>
                      <td style={{fontWeight:"bold", paddingTop:"1%"}}>
                        Profit: <b className="green2Bed">{prices.profit}%</b></td>
                    </tr>
                  </tbody>
                </table>
                <br/>
              </span>
            </span>
          )
        })
        this.setState({ cards: suggestionsArray });

      })
      .catch((err) => {
        Alert.error("<span style='color:red'>" + String(err) + "</span>", this.alertOptions);
      })
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    var modalTradeInfo = {};
    var baseCurrency = ''
    var askExchange = ''
    var bidExchange = ''
    if(this.state.trades[this.state.modalCardIndex]){
      modalTradeInfo = this.state.trades[this.state.modalCardIndex];
      baseCurrency = this.state.trades[this.state.modalCardIndex].pair.slice(3).toLowerCase();
      askExchange = this.state.trades[this.state.modalCardIndex].ask.exchange;
      bidExchange = this.state.trades[this.state.modalCardIndex].bid.exchange;
    }

    return (
      <div className="Suggestedtrades">
        <Alert stack={{ limit: 1, spacing: 50 }} />
        {this.state.cards}

        <Dialog
          title="Make Trade"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        {/* <p>{JSON.stringify(this.state.trades[this.state.modalCardIndex])}</p> */}
        {/* { "pair":"XRPUSDT",
              "bid":{
                "exchange":"hitbtc",
                "price":0.8535,
                "taker fee":0.1,
                "withdraw fee":{"XRP":0.509,"BTC":0.001,"ETH":0.00958}
              },
              "ask":{
                "exchange":"gate.io",
                "price":0.83,
                "taker fee":0.2,
                "withdraw fee":{"XRP":1,"BTC":0.002,"ETH":0.003,"USDT":10}
              },
            "profit":"2.5234" } */}
        
        <div className="tradeGraphic">
          <div className="exchangeDiv">
            {/* <div> */}
              <img src={imageVarName[baseCurrency + 'png']}
                className="icon" alt={baseCurrency} />
              <img src={rightArrowCircle} className="icon" alt="first trade" />
              <img src={xrppng} className="icon" alt="ripple" />
            {/* </div> */}
          </div>

          <div className="transferDiv">
            <img src={rightArrowLarge} className="transferArrow" alt="transfer ripple" />
            <h3>Transfer</h3>
          </div>

          <div className="exchangeDiv" id="bid">
            {/* <div> */}
              <img src={xrppng} className="icon" alt='ripple' />
              <img src={rightArrowCircle} className="icon" alt="second trade" />
              <img src={imageVarName[baseCurrency + 'png']} className="icon" alt={baseCurrency} />
            {/* </div> */}
          </div>
        </div>

        <div className="exchangeInfo">
          <div className="exchangeGraphic">
            <img src={imageVarName[askExchange.replace('.','') + 'png']} 
              className="exchangeIcon" alt={askExchange} />
            <h3 className="exchangeLabel">{askExchange}</h3>
          </div>
          <TextField name="sellExchange"
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      />
          <h4>{"amount ("+ baseCurrency.toUpperCase() + ")"}</h4>

          {/* <table>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table> */}

        </div>
        
        <div className="exchangeInfo">
          <div className="exchangeGraphic">
            <img src={imageVarName[bidExchange.replace('.','') + 'png']} 
              className="exchangeIcon" alt={bidExchange} />
            <h3 className="exchangeLabel">{bidExchange}</h3>
          </div>
          <TextField name="sellExchange"
                      type="text"
                      placeholder={bidExchange + " XRP Deposit Address"}
          />
          <h4>{bidExchange + " XRP Deposit Address"}</h4>

          {/* <table>
          <thead>
            <tr>
              <th>Pair</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table> */}

        </div>
        {/* <div style={{marginBottom:"10%"}}></div> */}

        </Dialog>

      </div>
       

    );
  }
}
