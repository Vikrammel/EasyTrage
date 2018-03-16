import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
// import Checkbox from 'material-ui/Checkbox';
import Alert from 'react-s-alert';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import env from '../../../../config/env';
import Center from 'react-center';

const submitButtonStyle = {
  backgroundColor: "#67c26f"
};

const cancelButtonStyle = {
  backgroundColor: "#FF1744"
}

const exchanges = ['bittrex', 'bitfinex', 'bitstamp', 'hitbtc', 'binance',
  'poloniex', 'kraken', 'exmo', 'cexio', 'gateio'];

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
      password: '',
      newPassword: '',
      data: {
        bittrex: {key:'',secret:''},
        bitfinex: {key:'',secret:''},
        bitstamp: {key:'',secret:''},
        hitbtc: {key:'',secret:''},
        binance: {key:'',secret:''},
        poloniex: {key:'',secret:''},
        kraken: {key:'',secret:''},
        exmo: {key:'',secret:''},
        cexio: {key:'',secret:''},
        gateio: {key:'',secret:''}
        // trade: false,
      },

      token: localStorage.getItem("token")
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

  }

  //fetch existing settings
  componentDidMount() {
    setTimeout(function () { //Start the timer
      axios.get(env.API_URL + '/auth/settings', { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.success === true) {
          console.log("successfully retrieved apiKey settings: " + res.data.message.apiKeys);
          if (res.data.message){
            var stateChange = res.data.message;
            //delete properties of response we don't need, then set the state with that data
            var throwAwayData = ['password', '_id', 'email', '__v'];
            for (var prop in throwAwayData) { delete stateChange[throwAwayData[prop]]; }
            if(stateChange.apiKeys){
              this.setState({ data: JSON.parse(stateChange.apiKeys) });
              // console.log("apiKeys in state: " + JSON.stringify(this.state.data["bittrex"]));
            }
          }
            // this.setState({ data: JSON.parse(stateChange.apiKeys) });
          }
        else {
          Alert.error("<span style='color:#FF1744'>Server error fetching existing account settings: " +
            res.data.message + "</span>", this.alertOptions);
        }
      })
      .catch((err) => {
        Alert.error("<span style='color:#FF1744'>Error fetching existing account settings: " +
          String(err) + "</span>", this.alertOptions);
      })
      this.setState({ render: true }) //After 1 second, set render to true
    }.bind(this), 1000)
  }

  handleCheck(event) {
    this.setState({ data: { trade: !this.state.data.trade } });
  }

  //update state when user types in field
  handleChange(event) {
    if(event.target.name === 'password' || event.target.name === 'newPassword'){
      // console.log("storing pw in state");
      // this.state[event.target.name] = event.target.value;
      this.setState({[event.target.name]:event.target.value});
    }
    else{
      var oldData = this.state.data;
      if(event.target.name.indexOf("Secret") !== -1){
        // this.state.data[event.target.name.split("Secret")[0]].secret = event.target.value;
        oldData[event.target.name.split("Secret")[0]].secret = event.target.value;
        this.setState({data: oldData});
        console.log(JSON.stringify(this.state.data));
      }else{
        // this.state.data[event.target.name].key = event.target.value;
        oldData[event.target.name].key = event.target.value;
        this.setState({data: oldData});
        console.log(JSON.stringify(this.state.data));
      }
    }
  }


  handleSubmit(event) {
    //close alerts and disable form text fields
    Alert.closeAll();
    this.setState({ formDisabled: true });
    event.preventDefault();

    //validate password existance and length of new password
    if (!this.state.password || this.state.password.length < 6) {
      Alert.warning("<span style='color:#FF1744'>Acount password with length of 6 or more characters must be"
        + " entered to save settings</span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else if (this.state.newPassword && this.state.newPassword.length < 6) {
      Alert.warning("<span style='color:#FF1744'>Please make sure your new password is more than 6 characters "
        + "long</span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else if (this.state.newPassword === this.state.password) {
      Alert.warning("<span style='color:#FF1744'>New password must be different </span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    //send request to edit settings
    else {
      console.log("sending settings update request to backend");
      axios.post(env.API_URL + '/auth/settings', {apiKeys:this.state.data, password: this.state.password,
                  newPassword: this.state.newPassword} , { headers: { token: this.state.token } })
        .then((res) => {
          if (res.data.success === true) {
            Alert.success("<span style='color:#67c26f'>" + res.data.message + "</span>", this.alertOptions);
            this.setState({ formDisabled: false });
          }
          else {
            Alert.error("<span style='color:#FF1744'>" + res.data.message + "</span>", this.alertOptions);
            this.setState({ formDisabled: false });
          }
        })
        .catch((err) => {
          Alert.error("<span style='color:#FF1744'>" + String(err) + "</span>", this.alertOptions);
          this.setState({ formDisabled: false });
        })
    }
  }

  render() {
    if (this.state.render) {
      return (
        <div>
          <br />
          <br />
          <form onSubmit={this.handleSubmit} style={{ float: "center" }}>
            {
              exchanges.map((exchange, index) => (
                <Center key={index}>
                  <div>
                    <span style={{ fontWeight: "bold" }}>{exchange} API key</span>
                    <br />
                    <div>
                      <TextField name={exchange}
                        type="text"
                        placeholder={exchange + " API key"}
                        defaultValue={this.state.data[exchange].key}
                        onChange={this.handleChange}
                        disabled={this.state.formDisabled}
                        //key-prop forces re-render when settings are pulled in
                        key={this.state.data[exchange].key ? 'notLoaded'+index : 'Loaded'+index}
                        style={{width:"100%", marginRight:"50%"}}
                      /><br />
                      <TextField name={exchange + "Secret"}
                        type="text"
                        placeholder={exchange + " API key secret"}
                        defaultValue={this.state.data[exchange].secret}
                        onChange={this.handleChange}
                        disabled={this.state.formDisabled}
                        //key-prop forces re-render when settings are pulled in
                        key={this.state.data[exchange].secret ? 'notLoadedYet'+index : 'loaded'+index}
                        style={{width:"100%"}}
                      />
                    </div>
                    <br />
                    <br />
                  </div>
                </Center>
              ))}
            {/* <Center>
                <div>
                  <h3>Let Bot Trade: </h3>
                  <Checkbox name="trade" defaultChecked={this.state.data.trade}
                    onCheck={() => this.handleCheck} disabled={true} />
                    <br /><br />
                </div>
            </Center> */}
            <Center>
              <div>
                <span style={{ fontWeight: "bold" }}>Password: </span>
                <br />
                <TextField name='password'
                  type="password"
                  hintText="password"
                  onChange={this.handleChange.bind(this)}
                  disabled={this.state.formDisabled}
                  style={{marginRight:"7%"}}
                />
                <br />
                <br />
                <span style={{ fontWeight: "bold" }}>New Password (optional): </span>
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
              <div style={{ marginRight: "3%" }}><RaisedButton label="Submit" type="submit" buttonStyle={submitButtonStyle} /></div>
              <div style={{ marginRight: "3%" }}><RaisedButton label="Cancel" type="button" buttonStyle={cancelButtonStyle} onClick={() =>
                this.props.history.push("/")} /></div>
            </Center>
          </form>
          <br />
          <br />
        </div>
      )
    }
    return (null);
  }
}

export default withRouter(Settings);
