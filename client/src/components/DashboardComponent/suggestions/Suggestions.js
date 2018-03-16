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
//success and failure icons by https://www.iconfinder.com/Juliia_Os (Juliia Osadcha)
import successpng from './success.png';
import failurepng from './failure.png';
import loadingGif from './loading.gif'; //from loading.io

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

const submitButtonStyle = {
  backgroundColor: "#67c26f",
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
      trade1Status: '',
      trade1Message: '',
      transferStatus: '',
      transferMessage: '',
      trade2Status: '',
      trade2Message: '',
      trading: false,
      modalStyle: {
        display: "none"
      },
      modalCardInfo: {},
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
      },
      amounts: {
        bittrex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        bitfinex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        bitstamp: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        hitbtc: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        binance: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        poloniex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        kraken: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        exmo: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        cexio: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
        gateio: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 }
      }
    };

  }

  handleChange(exchange, event) {
    //not working using setState
    // var stateChange = {};
    // stateChange[event.target.name] = event.target.value;
    // this.setState({data: stateChange});
    // this.state.data[event.target.name] = event.target.value;
    var modalTradeInfo = this.state.modalCardInfo;
    var baseCurrency = modalTradeInfo.pair.slice(3);
    var askExchange = modalTradeInfo.ask.exchange.replace(".","");
    var bidExchange = modalTradeInfo.bid.exchange.replace(".","");
    console.log(exchange);
    if (this.state.depositXRP && this.state.amounts) {
      if (event.target.name.indexOf("Amount") !== -1) {
        // console.log("handleChange: {amounts: {"+askExchange+":{"+baseCurrency+":"+event.target.value+"}}}");
        this.setState({ amounts: { [askExchange]: { [baseCurrency]: event.target.value } } });
      }
      else {
        var oldDepositXRPAddrs = this.state.depositXRP;
        oldDepositXRPAddrs[bidExchange] = event.target.name;
        this.setState({depositXRP:oldDepositXRPAddrs});
        // console.log(exchange + " API key entered: " + this.state.depositXRP[bidExchange]);
      }
    }
  }

  //open modal when 'trade' button on a card is clicked
  handleOpen = (index, bidExchange) => {
    this.setState({ render: false });
    axios.get(env.API_URL + '/auth/settings', { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.success === true) {
          var stateChange = res.data.message;
          var throwAwayData = ['password', '_id', 'email', '__v'];
          for (var prop in throwAwayData) { delete stateChange[throwAwayData[prop]]; }
          if (stateChange.depositXRP) {
            this.setState({ depositXRP: stateChange.depositXRP });
            if (stateChange.depositXRP[bidExchange.replace(".", "")]) {
              if(this.refs.depositAddress){
                this.refs.depositAddress.getInputNode().value = stateChange.depositXRP[bidExchange.replace(".", "")];
              }
            }
          }
          this.setState({ render: true, open: true, modalCardInfo: this.state.trades[index] });
        }
        else {
          Alert.error("<span style='color:#FF1744'>Error fetching existing account settings: " +
            res.data.message + "</span>", this.alertOptions);
          this.setState({ open: true, modalCardInfo: this.state.trades[index], render: true });
        }
      })
      .catch((err) => {
        Alert.error("<span style='color:#FF1744'>Error fetching existing account settings: " +
          String(err) + "</span>", this.alertOptions);
        this.setState({ open: true, modalCardInfo: this.state.trades[index], render: true });
      })
  };

  //close modal
  handleClose = () => {
    if (!this.state.trading) {
      this.setState({ open: false, modalCardInfo: {}, trade1Status: '', trade2Status: '',
                      transferStatus:'', transferMessage: '', trade1Message: '', trade2Message: '', 
                      amounts: {
                        bittrex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        bitfinex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        bitstamp: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        hitbtc: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        binance: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        poloniex: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        kraken: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        exmo: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        cexio: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 },
                        gateio: { USD: 0.0, USDT: 0.0, BTC: 0.0, ETH: 0.0 }
                      }});
    }
  };

  //send request to trade to backend
  handleConfirm = () => {
    this.setState({ trading: true });
    var modalTradeInfo = this.state.modalCardInfo;
    var baseCurrency = modalTradeInfo.pair.slice(3)
    var askExchange = modalTradeInfo.ask.exchange.replace(".","");
    var askPrice = modalTradeInfo.ask.price.toFixed(4);
    var secondCurrency = modalTradeInfo.pair.slice(0, 3);
    var bidExchange = modalTradeInfo.bid.exchange.replace(".","");
    var bidPrice = modalTradeInfo.bid.price.toFixed(4);
    console.log(askExchange);
    if(!this.state.depositXRP[bidExchange] || !this.state.amounts[askExchange][baseCurrency] ){
      this.setState({ trading: false, formDisabled: false });
      return;
    }
    // var minimumBaseAmount = modalTradeInfo.minOtherVolume;
    // console.log(baseCurrency);
    // console.log(askExchange);
    // this.setState({ open: false, modalCardIndex: null });
    this.setState({ trade1Status: "loading" });
    //make call to buy secondary currency on first exchange with base currency
    console.log(askExchange);
    axios.post(env.API_URL + '/api/bot/trade',
      {
        exchange: askExchange, buySell: "buy",
        amount: this.state.amounts[askExchange.replace(".", "")][baseCurrency],
        pair: modalTradeInfo.pair,
        price: askPrice
      },
      { headers: { token: this.state.token } })
      .then((res) => {
        console.log("got response for bot/trade call");
        if (res.data.success === true) {
          console.log("trade call success: " + res.data.message);
          this.setState({ trade1Status: 'success', trade1Message: res.data.message });
          //make call to transfer secondary currency to exchange where it will be sold for base surrency
          this.setState({ transferStatus: "loading" });
          axios.post(env.API_URL + '/api/bot/transfer',
            {
              exchange1: askExchange, exchange2: bidExchange, ticker: secondCurrency,
              amount: this.state.amounts[askExchange.replace(".", "")][baseCurrency] / askPrice,
              address: this.state.depositXRP[bidExchange]
            },
            { headers: { token: this.state.token } })
            .then((res) => {
              console.log("got response for bot/transfer call");
              if (res.data.success === true) {
                console.log("transfer call success: " + res.data.message);
                this.setState({ transferStatus: 'success', transferMessage: res.data.message});
                //make final call to sell secondary currency for base currency on second exchange
                this.setState({ trade2Status: "loading" });
                axios.post(env.API_URL + '/api/bot/trade',
                {
                  exchange: bidExchange, buySell: "sell",
                  amount: this.state.amounts[askExchange.replace(".", "")][baseCurrency] / askPrice,
                  pair: modalTradeInfo.pair,
                  price: bidPrice
                },
                { headers: { token: this.state.token } })
                .then((res) => {
                  if (res.data.success === true) {
                    console.log("trade call success: " + res.data.message);
                    this.setState({ trade2Status: 'success', trade2Message: res.data.message });
                    this.setState({ trading: false, formDisabled: false });
                  }
                  else {
                    this.setState({ trade2Status: 'failure', trade2Message: res.data.message});
                    this.setState({ trading: false, formDisabled: false });
                  }
                })
                .catch((err) => {
                  this.setState({ trade2Status: 'failure', trade2Message: String(err)});
                  this.setState({ trading: false, formDisabled: false });
                })
              }
              else {
                this.setState({ transferStatus: 'failure', transferMessage: res.data.message});
                this.setState({ trading: false, formDisabled: false });
              }
            })
            .catch((err) => {
              this.setState({ transferStatus: 'failure', transferMessage: String(err) });
              this.setState({ trading: false, formDisabled: false });
            })
        }
        else {
          this.setState({ trade1Status: 'failure', trade1Message: res.data.message });
          this.setState({ trading: false, formDisabled: false });
        }
      })
      .catch((err) => {
        // Alert.error("<span style='color:#FF1744'>" + String(err) + "</span>", this.alertOptions);
        this.setState({ trade1Status: 'failure', trade1Message: String(err) });
        this.setState({ trading: false, formDisabled: false });
      })
  }

  //generate HTML for a suggestion card
  generateCard(prices, index) {
    return (
      <span className="Cards" key={index}>
        <span className="card card-1">
          <br />
          <table style={{ border: "solid thin", borderRadius: "30px", borderColor: "#cbcbcb", width: "110%", position: "relative", right: "13%" }}>
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
  }

  reRenderSuggestions() {
    axios.get(env.API_URL + '/api/suggestions')
      .then((res) => {
        // console.log(res.data);
        this.setState({ trades: res.data });
        let suggestionsArray = res.data.map((prices, index) => {
          // console.log(prices);
          return (this.generateCard(prices, index));
        })
        this.setState({ cards: suggestionsArray });

      })
      .catch((err) => {
        Alert.error("<span style='color:red'>" + String(err) + "</span>", this.alertOptions);
      })
  }

  //generate status visual for trade and transfer. take in operation (trade1/trade2/transfer)
  _statusElement(operation){
    var statusHeading = '';
    if (operation === 'trade1'){statusHeading='Trade 1'}
    else if (operation === 'transfer'){statusHeading='Transfer'}
    else if (operation === 'trade2'){statusHeading='Trade 2'}
    return(
      this.state[operation + "Status"] === 'success' ?
      <div id={operation + "Status"} style={{marginTop:"1%"}}>
        <p>{statusHeading}</p>
        <img src={successpng} alt={statusHeading + " Successful! Success and failure icons by Juliia Osadcha"} width="5%" />
        <span style={{ color: '#67c26f', marginLeft: "2%" }}>{this.state[operation + "Message"]}</span>
      </div>
      :
      this.state[operation + "Status"] === 'failure' ?
        <div id={operation + "Status"}>
          <p>{statusHeading}</p>
          <img src={failurepng} alt={statusHeading + " Failed. Success and failure icons by Juliia Osadcha"} width="5%" />
          <span style={{ color: '#FF1744', marginLeft: "2%" }}>{this.state[operation + "Message"]}</span>
        </div>
        :
        this.state[operation + "Status"] === 'loading' ?
          <div id={operation + "Status"}>
            <p>{statusHeading}</p>
            <img src={loadingGif} alt={statusHeading + " attempt in progress. gif from loading.io"} width="5%" />
            <span style={{ color: '#4CC0CC', marginLeft: "2%" }}>{statusHeading.split(" ")[0] + " attempt in progress..."}</span>
          </div>
          :
          <div id={operation + "Status"}></div>
    )
  }
  componentDidMount() {
    this.reRenderSuggestions();

    setInterval(function () {
      this.reRenderSuggestions();
    }.bind(this), 8000)
  }

  render() {

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

    //index of trade at time of "trade" click so modal info doesn't change
    // var cardIndex = this.state.modalCardIndex;
    if (this.state.modalCardInfo.pair) {
      // console.log(this.state.trades[this.state.modalCardIndex]);
      modalTradeInfo = this.state.modalCardInfo;
      baseCurrency = modalTradeInfo.pair.slice(3)
      askExchange = modalTradeInfo.ask.exchange.replace(".","");
      askPrice = modalTradeInfo.ask.price.toFixed(4);
      bidExchange = modalTradeInfo.bid.exchange.replace(".","");
      bidPrice = modalTradeInfo.bid.price.toFixed(4);
      minimumBaseAmount = modalTradeInfo.minOtherVolume;
      secondCurrency = modalTradeInfo.pair.slice(0, 3);
      askFee = modalTradeInfo.ask["taker fee"];
      bidFee = modalTradeInfo.bid["taker fee"];
      secondaryWithdrawFee = modalTradeInfo.ask["withdraw fee"][secondCurrency]
      baseWithdrawFee = modalTradeInfo.ask["withdraw fee"][baseCurrency]
      profit = modalTradeInfo.profit;
      if (this.state.depositXRP) {
        depositAddress = this.state.depositXRP[bidExchange];
      }
    }

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
        disabled={this.state.trading}
        style={{ backgroundColor: "#FF1744", color: "#e5e5e5", marginBottom: "2%", marginTop: "auto", marginLeft: "20%", float: "left" }}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleConfirm}
        disabled={this.state.trading}
        style={{ backgroundColor: "#67c26f", color: "#e5e5e5", marginBottom: "2%", marginTop: "auto", marginRight: "20%" }}
      />,
    ];

    return (
      <div className="Suggestedtrades">
        <div className="reRenderButton">
          <RaisedButton label="Refresh" type="button" buttonStyle={submitButtonStyle} onClick={() =>
            this.reRenderSuggestions()} />
        </div>
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

            <div id="statusContainer" style={{ paddingTop: "5%" }}>
              {this._statusElement('trade1')}
              {this._statusElement('transfer')}
              {this._statusElement('trade2')}
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
            <TextField name={askExchange + "Amount"}
              type="number"
              placeholder="0.00"
              step="0.01"
              onChange={this.handleChange.bind(this, "")}
              // ref={askExchange + "Amount"}
              disabled={this.state.trading}
            />
            {/* <h4>{"amount ("+ baseCurrency + ")"}</h4> */}
            <h6 className="yellow">Minimum for profit: {minimumBaseAmount + " " + baseCurrency + " (Required)"}</h6>


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
              onChange={this.handleChange.bind(this, bidExchange)}
              disabled={this.state.trading}
              ref="depositAddress"
            />
            <h5>{bidExchange + " XRP Deposit Address (Required)"}</h5>
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
            <span style={{ position: "relative", left: "26%", fontWeight: "bold", paddingTop: "1%" }}>
              Estimated Profit as Volume → ∞: <b className="green2Bed">{profit}%</b>
            </span>
          </div>

        </Dialog>

      </div>

    );
  }
}
