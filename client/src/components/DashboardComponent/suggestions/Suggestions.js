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
// import { relative } from 'path';

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
      render: true,
      cards: [],
      open: false,
      modalStyle: {
        display: "none"
      },
      modalCardIndex: null,
      formDisabled: false,
      token: localStorage.getItem("token"),
      depositXRP: {
        bittrex: '',
        bitfinex: '',
        bitstamp: '',
        hitbtc: '',
        binance: '',
        poloniex: '',
        kraken: '',
        exmo: '',
        cexio: '',
        gateio: ''
      }
    };

  }

  handleChange(exchange, event) {
    //not working using setState
    // var stateChange = {};
    // stateChange[event.target.name] = event.target.value;
    // this.setState({data: stateChange});
    // this.state.data[event.target.name] = event.target.value;
    this.state.depositXRP[exchange] = event.target.value;
    console.log(exchange + " API key entered: " + this.state.depositXRP[exchange]);
  }

  handleOpen = (index, bidExchange) => {
    this.setState({ render: false });
    axios.get(env.API_URL + '/auth/settings', { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.success === true) {
          var stateChange = JSON.parse(res.data.message);
          this.setState({ depositXRP: stateChange.depositXRP, render: true });
          this.setState({ open: true, modalCardIndex: index });
          if (stateChange.depositXRP[bidExchange.replace(".", "")]) {
            this.refs.depositAddress.getInputNode().value = stateChange.depositXRP[bidExchange.replace(".", "")];
          }
        }
        else {
          Alert.error("<span style='color:#FF1744'>Error fetching existing account settings: " +
            res.data.message + "</span>", this.alertOptions);
          this.setState({ open: true, modalCardIndex: index, render: true });
        }
      })
      .catch((err) => {
        Alert.error("<span style='color:#FF1744'>Error fetching existing account settings: " +
          String(err) + "</span>", this.alertOptions);
        this.setState({ open: true, modalCardIndex: index, render: true });
      })
  };

  handleClose = () => {
    this.setState({ open: false, modalCardIndex: null });
  };

  componentDidMount() {
    axios.get(env.API_URL + '/api/suggestions')
      .then((res) => {
        // console.log(res.data);
        this.setState({ trades: res.data });
        let suggestionsArray = res.data.map((prices, index) => {
          // console.log(prices);
          return (
            <span className="Cards" key={index}>
              <span className="card card-1">
              <br />
                <table style={{border:"solid thin", borderRadius:"30px", borderColor:"#cbcbcb", width:"110%", position:"relative",right:"13%"}}>
                  <tbody>
                    <tr><td><br /></td></tr>
                    <tr>
                      <td>
                        <span className="red"><b>Buy</b></span></td>
                    </tr>
                    <tr>
                      <td>Ticker: <b className="red">{prices.pair}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="red">{prices.ask.price.toFixed(4) + " " + prices.pair.slice(3) + "/" + prices.pair.slice(0, 3)}</span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="red">{prices.ask.exchange}</b></td>
                    </tr>
                    <tr>
                      <td>
                        Minimum: <b className="yellow">{prices.minOtherVolume + " " + prices.pair.slice(3)}</b></td>
                    </tr>
                    <tr>
                      <td>
                        <span><img src={arrow} className="arrow" alt="logo" /></span></td>
                    </tr>

                    <tr>
                      <td>
                        <RaisedButton label="Trade" type="submit" onClick={this.handleOpen.bind(this, index, prices.bid.exchange)} buttonStyle={tradeButtonStyle} />
                        <br />
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td><span className="green"><b>Sell</b></span></td>
                    </tr>
                    <tr>
                      <td>Ticker: <b className="green">{prices.pair}</b></td>
                    </tr>
                    <tr>
                      <td>Price: <span className="green">{prices.bid.price.toFixed(4) + " " + prices.pair.slice(3) + "/" + prices.pair.slice(0, 3)}</span></td>
                    </tr>
                    <tr>
                      <td>Exchange: <b className="green">{prices.bid.exchange}</b></td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold", paddingTop: "1%" }}>
                        Profit: <b className="green2Bed">{prices.profit}%</b></td>
                    </tr>
                    <tr><td><br /></td></tr>
                  </tbody>
                </table>
                <br />
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
        style={{ backgroundColor: "#FF1744", color: "#e5e5e5", marginBottom: "2%", marginTop: "auto", marginLeft: "20%", float: "left" }}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
        style={{ backgroundColor: "#67c26f", color: "#e5e5e5", marginBottom: "2%", marginTop: "auto", marginRight: "20%" }}
      />,
    ];

    //vars so refering to this.state.trades[index].pair.ask[exchange] ... doesn't get messy
    var modalTradeInfo = {};
    var baseCurrency = ''
    var askExchange = ''
    var askPrice = null
    var bidExchange = ''
    var bidPrice = null
    var minimumBaseAmount = ''
    var secondCurrency = '' //for now just XRP
    var askFee = null
    var bidFee = null
    var baseWithdrawFee = null
    var secondaryWithdrawFee = null //for not XRP withdraw fees
    var profit = null
    var depositAddress = ''

    if (this.state.trades[this.state.modalCardIndex]) {
      modalTradeInfo = this.state.trades[this.state.modalCardIndex];
      baseCurrency = modalTradeInfo.pair.slice(3)
      askExchange = modalTradeInfo.ask.exchange;
      askPrice = modalTradeInfo.ask.price.toFixed(4);
      bidExchange = modalTradeInfo.bid.exchange;
      bidPrice = modalTradeInfo.bid.price.toFixed(4);
      minimumBaseAmount = modalTradeInfo.minOtherVolume;
      secondCurrency = modalTradeInfo.pair.slice(0, 3);
      askFee = modalTradeInfo.ask["taker fee"];
      bidFee = modalTradeInfo.bid["taker fee"];
      secondaryWithdrawFee = modalTradeInfo.ask["withdraw fee"][secondCurrency]
      baseWithdrawFee = modalTradeInfo.ask["withdraw fee"][baseCurrency]
      profit = modalTradeInfo.profit;
      if(this.state.depositXRP){
        depositAddress = this.state.depositXRP[bidExchange];
      }
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
              <img src={imageVarName[baseCurrency.toLowerCase() + 'png']}
                className="icon" alt={baseCurrency} />
              <img src={rightArrowCircle} className="icon" alt="first trade" />
              <img src={imageVarName[secondCurrency.toLowerCase() + 'png']} className="icon" alt={secondCurrency} />
            </div>

            <div className="transferDiv">
              <img src={rightArrowLarge} className="transferArrow" alt="transfer ripple" />
              <h3>Transfer</h3>
            </div>

            <div className="exchangeDiv" id="bid">
              {/* <div> */}
              <img src={imageVarName[secondCurrency.toLowerCase() + 'png']} className="icon" alt={secondCurrency} />
              <img src={rightArrowCircle} className="icon" alt="second trade" />
              <img src={imageVarName[baseCurrency.toLowerCase() + 'png']} className="icon" alt={baseCurrency} />
              {/* </div> */}
            </div>
          </div>

          <div className="exchangeNames">
            <div className="exchangeGraphic">
              <img src={imageVarName[askExchange.replace('.', '') + 'png']}
                className="exchangeIcon" alt={askExchange} />
              <h3 className="exchangeLabel">{askExchange}</h3>
            </div>
            <div className="exchangeGraphic">
              <img src={imageVarName[bidExchange.replace('.', '') + 'png']}
                className="exchangeIcon" alt={bidExchange} />
              <h3 className="exchangeLabel">{bidExchange}</h3>
            </div>
          </div>

          <div className="exchangeInfo">
            <TextField name="buyAmount"
              type="number"
              placeholder="0.00"
              step="0.01"
              // onChange={this.handleChange.bind(this, bidExchange)}
              disabled={this.state.formDisabled}
            />
            {/* <h4>{"amount ("+ baseCurrency + ")"}</h4> */}
            <h6 className="yellow">Minimum for profit: {minimumBaseAmount + " " + baseCurrency}</h6>


            <table>
              {/* // <thead>
          //   <tr>
          //     <th>Pair</th>
          //     <th>Buy</th>
          //     <th>Sell</th>
          //   </tr>
          // </thead> */}
              <tbody>
                <tr>
                  <td>
                    <br />
                    <span className="red"><b>Buy</b></span></td>
                </tr>
                <tr>
                  <td>Ticker: <b className="red">{secondCurrency + "/" + baseCurrency}</b></td>
                </tr>
                <tr>
                  <td>Price: <span className="red">{askPrice + " " + baseCurrency + "/" + secondCurrency}</span></td>
                </tr>
                <tr>
                  <td>Trade Fee: <span className="red">{askFee + "%"}</span></td>
                </tr>
                <tr>
                  <td>withdraw Fee: <span className="red">{secondaryWithdrawFee + " " + secondCurrency}</span></td>
                </tr>
              </tbody>
            </table>


          </div>

          <div className="exchangeInfo">
            <TextField name="depositAddress"
              type="text"
              placeholder={bidExchange + " XRP Deposit Address"}
              defaultValue={depositAddress}
              onKeyDown={this.handleChange.bind(this, bidExchange)}
              disabled={this.state.formDisabled}
              ref="depositAddress"
            />
            <h5>{bidExchange + " XRP Deposit Address"}</h5>
            <table>
              <tbody>
                <tr>
                  <td>
                    <br />
                    <span className="green"><b>Sell</b></span></td>
                </tr>
                <tr>
                  <td>Ticker: <b className="green">{secondCurrency + "/" + baseCurrency}</b></td>
                </tr>
                <tr>
                  <td>Price: <span className="green">{bidPrice + " " + baseCurrency + "/" + secondCurrency}</span></td>
                </tr>
                <tr>
                  <td>Trade Fee: <span className="green">{bidFee + "%"}</span></td>
                </tr>
                <tr>
                  <td>withdraw Fee: <span className="green">{baseWithdrawFee + " " + baseCurrency}</span></td>
                </tr>
              </tbody>
            </table>

          </div>
          <br />
          <br />
          <div>
              <span style={{  position: "relative", left:"26%", fontWeight: "bold", paddingTop: "1%" }}>
              Estimated Profit as Volume → ∞: <b className="green2Bed">{profit}%</b>
          </span>
          </div>

        </Dialog>

      </div>

    );
  }
}
