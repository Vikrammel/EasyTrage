import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './Login.css';
import Alert from 'react-s-alert';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import env from '../../../../config/env';

class Login extends Component {

  constructor(props) {
    super(props);
    //set options for alerts
    this.alertOptions = {
      offset: 100,
      position: 'top',
      theme: 'dark',
      timeout: 5000,
      transition: 'scale',
      html: true
    };
    //set form input elements to be enabled by default
    this.state = {
      formDisabled: false,
    };
    //this._authenticate = this._authenticate.bind(this)
  }

  handleKeyDown(event){
    if(event.key === 'Enter'){
      this._authenticate('login');
    }
  }

  _authenticate = function (buttonPressed) {
    //close all Alerts
    Alert.closeAll();
    //disable text boxes
    this.setState({ formDisabled: true });

    //validate email/pw
    var email = this.refs["email"].value;
    var password = this.refs["password"].value;
    //check email
    if (!email.includes('@')) {
      Alert.warning("<div style='color:#FF1744; text-align:center'> invalid email </div>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    //check pw
    else if (password.length < 6) {
      //alert('password must be at least 6 characters');
      Alert.warning("<div style='color:#FF1744; text-align:center'>password length must be 6+</div>", this.alertOptions);
      this.setState({ formDisabled: false });
    }
    //both are valid
    else {
      //encrypt pw and send request for login/signup
      var User = {
        email: email,
        password: password
      };

      if (buttonPressed === 'signup') {
        //env.API_URL
        axios.post(env.API_URL + '/auth/register', User)
          .then((res) => {
            //use res from server
            if (res.data.success === true) {
              Alert.success("<div style='color:#67c26f; text-align:center'>Account has been registered! Please log in</div>",this.alertOptions);
              localStorage.setItem("token", res.data.token);
            }
            else {
              Alert.error(res.data.message);
            }
          })
          .catch((err) => {
            //alert user there was a server error
            Alert.error("<div style='color:#FF1744; text-align:center'>Server error. Please try again later.</div>", this.alertOptions);
          });
        this.setState({ formDisabled: false });
      }
      else if (buttonPressed === 'login') {

        axios.post(env.API_URL + '/auth/login', User)
          .then((res) => {
            //use res from server
            if (res.data.success === true) {
              Alert.success("<div style='color:#67c26f; text-align:center'>Login Successful!</div>", this.alertOptions);
              localStorage.setItem("token", res.data.token);
              //redirect to dashboard if signin successful
              setTimeout(this.props.history.push("/Dashboard"), 2000);
            }
            else {
              //else enable form fields again and display error
              Alert.error("<div style='color:#FF1744; text-align:center'>login failed. " + res.data.message + "</div>", this.alertOptions);
              this.setState({ formDisabled: false });
            }
          })
          .catch((err) => {
            //alert user there was a server error
            Alert.error("<div style='color:#FF1744; text-align:center'>Error: " + String(err) + "</div>", this.alertOptions);
            this.setState({ formDisabled: false });
          });
      }
    }
  }

  render() {
    return (
      <div className='login'>
        <h3 id='loginHeader'>Account Details</h3>
        <form onSubmit={this._onSubmit}>
          <input name='email' placeholder='email@domail.com' ref='email'
            type='text' disabled={this.state.formDisabled} onKeyDown={this.handleKeyDown.bind(this)} />
          <input id='pw' name='password' placeholder='Password' ref='password'
            type='password' disabled={this.state.formDisabled} onKeyDown={this.handleKeyDown.bind(this)} />
          <Alert stack={{ limit: 2, spacing: 50 }} />
          {/* <br/> */}
          <input id='login' type='button' defaultValue='Sign in' ref='signin'
            onClick={() => this._authenticate('login')} />
          <hr />
          <input id='signup' type='button' defaultValue='Sign up' ref='signup'
            onClick={() => this._authenticate('signup')} />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
