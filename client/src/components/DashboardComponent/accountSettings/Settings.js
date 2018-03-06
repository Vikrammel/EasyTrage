import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from 'react-s-alert';
import axios from 'axios';
import env from '../../../../config/env';

const style = {
  margin: 12,
};

export default class Settings extends Component {

  _authenticate = function(buttonPressed){
    //close all Alerts
    Alert.closeAll();
    //disable text boxes
    this.setState({formDisabled: true});
    var bittrex = this.refs["bittrex"].value;
    var bitfinex = this.refs["bitfinex"].value;
    var bitstamp = this.refs["bitstamp"].value;
    var hitbtc = this.refs["hitbtc"].value;
    var binance = this.refs["binance"].value;
    var poloniex = this.refs["poloniex"].value;
    var kraken = this.refs["kraken"].value;
    var exmo = this.refs["exmo"].value;
    var cexio = this.refs["cexio"].value;
    var gateio = this.refs["gateio"].value;
    var password = this.refs["password"].value;

    var API = {
      bittrex: bittrex,
      bitfinex: bitfinex,
      bitstamp: bitstamp,
      hitbtc: hitbtc,
      binance: binance,
      poloniex: poloniex,
      kraken: kraken,
      exmo: exmo,
      cexio: cexio,
      gateio: gateio,
      password: password
    };

    axios.post(env.API_URL + '/auth/settings', API)
    .then( (res) => {
      if (res.data.success === true){
        Alert.success('API keys have been saved!');
      }
      else{
        Alert.error(res.data.message);
      }
    })
  }

  render() {
    return(
      <span>
    <h3>Bittrex Api Key:</h3>
    <span><TextField ref='bittrex'
      hintText="bittrex"
    /></span><br />
    <br />
    <br />
    <h3>bitfinex Api Key:</h3>
    <span><TextField ref='bitfinex'
      hintText="bitfinex"
    /></span><br />
    <br />
    <br />
    <h3>bitstamp Api Key:</h3>
    <span><TextField ref='bitstamp'
      hintText="bitstamp"
    /></span><br />
    <br />
    <br />
    <h3>hitbtc Api Key:</h3>
    <span><TextField ref='hitbtc'
      hintText="hitbtc"
    /></span><br />
    <br />
    <br />
    <h3>binance Api Key:</h3>
    <span><TextField ref='binance'
      hintText="binance"
    /></span><br />
    <br />
    <br />
    <h3>poloniex Api Key:</h3>
    <span><TextField ref='poloniex'
      hintText="poloniex"
    /></span><br />
    <br />
    <br />
    <h3>kraken Api Key:</h3>
    <span><TextField ref='kraken'
      hintText="kraken"
    /></span><br />
    <br />
    <br />
    <h3>exmo Api Key:</h3>
    <span><TextField ref='exmo'
      hintText="exmo"
    /></span><br />
    <br />
    <br />
    <h3>cex.io Api Key:</h3>
    <span><TextField ref='cexio'
      hintText="cex.io"
    /></span><br />
    <br />
    <br />
    <h3>gate.io Api Key:</h3>
    <span><TextField ref='gateio'
      hintText="gate.io"
    /></span><br />
    <br />
    <br />
    <h3>Enter Account Password:</h3>
    <span><TextField ref='password'
    type="password"
      hintText="password"
    /></span><br />
    <RaisedButton label="Submit" style={style} onClick={() => this._authenticate()}/>
    </span>

    )
  }

}
