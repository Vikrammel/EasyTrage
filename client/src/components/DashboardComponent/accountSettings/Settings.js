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

const buttonStyle = {
  margin: 12
};

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
      data: {
        bittrex: '',
        bitfinex: '',
        bitstamp: '',
        hitbtc: '',
        binance: '',
        poloniex: '',
        kraken: '',
        exmo: '',
        cexio: '',
        gateio: '',
        password: '',
        newPassword: '',
        // trade: false,
        token: localStorage.getItem("token")
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //fetch existing settings
  componentWillMount() {
    axios.get(env.API_URL + '/auth/settings', { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.success === true) {
          var stateChange = JSON.parse(res.data.message);
          //delete properties of response we don't need, then set the state with that data
          var throwAwayData = ['password', '_id', 'email', '__v'];
          for (var prop in throwAwayData) { delete stateChange[throwAwayData[prop]]; }
          this.setState({ data: stateChange });
        }
        else {
          Alert.error("<span style='color:red'>Error fetching existing account settings: " +
            res.data.message + "</span>", this.alertOptions);
        }
      })
      .catch((err) => {
        Alert.error("<span style='color:red'>Error fetching existing account settings: " +
          String(err) + "</span>", this.alertOptions);
      })
  }

  componentDidMount() {
    setTimeout(function () { //Start the timer
      this.setState({ render: true }) //After 1 second, set render to true
    }.bind(this), 1000)
  }

  handleCheck(event) {
    this.setState({data:{trade:!this.state.data.trade}});
  }

  handleChange(event) {
    //not working using setState
    // var stateChange = {};
    // stateChange[event.target.name] = event.target.value;
    // this.setState({data: stateChange});
    this.state.data[event.target.name] = event.target.value;
  }

  handleSubmit(event) {
    //close alerts and disable form text fields
    Alert.closeAll();
    this.setState({ formDisabled: true });
    event.preventDefault();

    //validate password existance and length of new password
    if (!this.state.data.password || this.state.data.password.length < 6) {
      Alert.warning("<span style='color:red'>Acount password with length of 6 or more characters must be"
        + " entered to save settings</span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else if (this.state.data.newPassword && this.state.data.newPassword.length < 6) {
      Alert.warning("<span style='color:red'>Please make sure your new password is more than 6 characters "
        + "long</span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    else if (this.state.data.newPassword === this.state.data.password){ 
      Alert.warning("<span style='color:red'>New password must be different </span>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    //send request to edit settings
    else {
      console.log("sending");
      axios.post(env.API_URL + '/auth/settings', this.state.data)
        .then((res) => {
          if (res.data.success === true) {
            Alert.success("<span style='color:green'>" + res.data.message + "</span>", this.alertOptions);
            this.setState({ formDisabled: false });
          }
          else {
            Alert.error("<span style='color:red'>" + res.data.message + "</span>", this.alertOptions);
            this.setState({ formDisabled: false });
          }
        })
        .catch((err) => {
          Alert.error("<span style='color:red'>" + String(err) + "</span>", this.alertOptions);
          this.setState({ formDisabled: false });
        })
    }
  }

  render() {
    if (this.state.render) {
      return (
        <div>
          <br />
          <form onSubmit={this.handleSubmit} style={{ float: "center" }}>
            {
              exchanges.map((exchange, index) => (
                <Center key={index}>
                  <div>
                    <span style={{ fontWeight: "bold" }}>{exchange} API key</span>
                    <br />
                    <div><TextField name={exchange}
                      type="text"
                      placeholder={exchange + " API key"}
                      defaultValue={this.state.data[exchange]}
                      onChange={this.handleChange.bind(this)}
                      disabled={this.state.formDisabled}
                    /></div>
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
              <RaisedButton label="Submit" type="submit" style={buttonStyle} />
              <RaisedButton label="Cancel" type="button" style={buttonStyle} onClick={() =>
                this.props.history.push("/")} />
            </Center>
          </form>

        </div>
      )
    }
    return (null);
  }
}

export default withRouter(Settings);
