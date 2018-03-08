import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
import Alert from 'react-s-alert';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import env from '../../../../config/env';
import Center from 'react-center';

const buttonStyle = {
  margin: 12
};

const exchanges = ['bittrex','bitfinex','bitstamp','hitbtc','binance',
                    'poloniex','kraken','exmo','cexio','gateio'];

class Settings extends Component {

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
      formDisabled: false,
      render: false,
      data: {
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
        password: '',
        newPassword: '',
        token: localStorage.getItem("token")
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //fetch existing settings
  componentWillMount() {
    axios.get(env.API_URL + '/auth/settings',{ headers: { token: localStorage.getItem("token") } })
    .then( (res) => {
      if(res.data.success===true){
        var stateChange = JSON.parse(res.data.message);
        this.setState(stateChange);
      } else{
        Alert.error("<span style='color:red'>Error fetching existing account settings: " + 
                    res.data.message + "</span>");
      }
    })
    .catch( (err) => {
      Alert.error("<span style='color:red'>Error fetching existing account settings: " + 
      String(err) + "</span>");
    })
  }

  componentDidMount() {
    setTimeout(function() { //Start the timer
        this.setState({render: true}) //After 1 second, set render to true
    }.bind(this), 1000)
  }
  
  handleChange(event){
    //not working using setState
    // var stateChange = {};
    // stateChange[event.target.name]=event.target.value;
    // this.setState(stateChange, function(){
    //   console.log(event.target.name + ": " + this.state[event.target.name]);
    // });
    this.state.data[event.target.name] = event.target.value;
    console.log(event.target.name + ": " + this.state.data[event.target.name])
    console.log(JSON.stringify(this.state.data));
  }

  handleSubmit(event){
    //close alerts and disable form text fields
    Alert.closeAll();
    this.setState({ formDisabled: true });
    //validate password existance and length of new password
    event.preventDefault();
    if( (this.state.data["password"]==='' || this.state.data["password"].length < 6) ){
      console.log("Acount password with length of 6 or more characters must be entered to save settings");
      Alert.warning("<span style='color:red'>Acount password with length of 6 or more characters must be" 
                    + "entered to save settings</span>",
        this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else if( this.state.data["newPassword"]!=='' && this.state.data["newPassword"].length < 6 ){
      console.log("Please make sure your new password is more than 6 characters long");
      Alert.warning("<span style='color:red'>Please make sure your new password is more than 6 characters "
                    + "long</span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else {
      axios.post(env.API_URL + '/auth/settings', this.state.data)
        .then((res) => {
          if (res.data.success === true) {
            Alert.success("<span style='color:green'>API keys have been saved!</span>");
            this.setState({ formDisabled: false });
          }
          else {
            Alert.error("<span style='color:red'>" + res.data.message + "</span>");
            this.setState({ formDisabled: false });
          }
        })
        .catch( (err) => {
          Alert("<span style='color:red'>" + String(err) + "</span>");
          this.setState({ formDisabled: false });
        })
    }
  }

  render() {
    if(this.state.render){
      return(
          <div>
          <form onSubmit={this.handleSubmit} style={{float:"center"}}>
            {
              exchanges.map((exchange, index) => (
              <Center>
              <div  >
                <span style={{fontWeight:"bold"}}>{exchange} API key</span>
                <br />
                  <div><TextField name={exchange}
                    type="text"
                    placeholder={this.state.data[exchange]}
                    onChange={this.handleChange.bind(this)}
                    disabled={this.state.formDisabled}
                  /></div>
                <br />
                <br />
              </div>
              </Center>
            ))}
            <Center>
            <div>
              <span style={{fontWeight:"bold"}}>Password: </span>
              <br />
              <TextField name='password'
                type="password"
                hintText="password"
                onChange={this.handleChange.bind(this)}
                disabled={this.state.formDisabled}
              />
            <br />
            <br />
              <span style={{fontWeight:"bold"}}>New Password (optional): </span>
              <br />
              <TextField name='newPassword'
                type="password"
                hintText="new password"
                onChange={this.handleChange.bind(this)}
                disabled={this.state.formDisabled}
              />
            </div>
            </Center>
            <br />
            <Center>
              <Alert stack={{ limit: 2, spacing: 50 }} />
            </Center>
            <Center>
            <RaisedButton label="Submit" type="submit" style={buttonStyle} />
            <RaisedButton label="Cancel" type="button" style={buttonStyle} onClick={() => this.props.history.push("/")}/>  
            </Center>
          </form>

        </div>
      )
    }
    return(null);
  }
}

export default withRouter(Settings);
