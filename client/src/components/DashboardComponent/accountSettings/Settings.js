import React, { Component } from 'react';
// import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from 'react-s-alert';
import axios from 'axios';
import env from '../../../../config/env';

const style = {
  margin: 12
};

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exchanges: ['bittrex','bitfinex','bitstamp','hitbtc','binance',
                  'poloniex','kraken','exmo','cexio','gateio'],
      bittrex: 'bittrex API key',
      bitfinex: 'bitfinex API key',
      bitstamp: 'bitstamp API key',
      hitbtc: 'hitbtc API key',
      binance: 'binance API key',
      poloniex: 'poloniex API key',
      kraken: 'kraken API key',
      exmo: 'exmo API key',
      cexio: 'cexio API key',
      gateio: 'gateio API key',
      password: 'password',
      newPassword: 'new password'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field){
    // this.setState({[field]: event.target.value});
    console.log(field);
  }

  handleSubmit(event){
    // this.setState({field: event.target.value});
    console.log("submit");
  }

  /*
  _authenticate = function (buttonPressed) {
    //close all Alerts
    // Alert.closeAll();
    //disable text boxes
    this.setState({ formDisabled: true });
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
    var newPassword = this.refs["newPassword"].value;

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
      password: password,
      newPassword: newPassword
    };

    if( (!API.password) || (API.password.length < 0) ){
      console.log("Acount password must be entered to save settings");
      Alert.warning("Acount password must be entered to save settings");
      return;
    }
    else if( (API.newPassword && API.newPassword.length > 0) && (API.newPassword.length < 6) ){
      console.log("Please make sure your new password is more than 6 characters long");
      Alert.warning("Please make sure your new password is more than 6 characters long");
      return;
    }
    else {
      axios.post(env.API_URL + '/auth/settings', API)
        .then((res) => {
          if (res.data.success === true) {
            Alert.success('API keys have been saved!');
          }
          else {
            Alert.error(res.data.message);
          }
        })
        .catch( (err) => {
          Alert(err);
        })
    }
  }
  */

  render() {
    return(
      <form onSubmit={this.handleSubmit}> 
        {
          this.state.exchanges.map((exchange, index) => (
          <div>
            <span style={{fontWeight:"bold"}}>{exchange} API key:</span>
            <br />
            <input type="text" defaultValue={this.state[exchange]} onChange={this.handleChange(exchange)} />
            <br />
            <br />
          </div>
        ))}
        <RaisedButton label="Submit" type="submit" style={style} /> 
      </form>
    )
    /*
    return (
      <form>
        <label>
          Bittrex API key:
        <input type="text" value={this.state.bittrex} onChange={this.handleChange('bittrex')} />
        </label>
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
        <br />
        <br />
        <h3>Enter New Password (Optional):</h3>
        <span><TextField ref='newPassword'
          type="password"
          hintText="new password"
        /></span><br />
        <RaisedButton label="Submit" type="submit" style={style} onClick={() => this._authenticate()} />
      </form>

    )*/

  }

}
