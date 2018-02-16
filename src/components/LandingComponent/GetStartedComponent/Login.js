import React, {Component} from 'react';
import './Login.css';
import Alert from 'react-s-alert';
import axios from 'axios';
import env from '../../../../config/env';

class Login extends Component {

  constructor(props) {
    super(props);
    //set options for alerts
    this.alertOptions = {
      offset: 100,
      position: 'top',
      theme: 'dark',
      timeout: 'none',
      transition: 'scale'
    };
    //set form input elements to be enabled by default
    this.state = {
      formDisabled: false,
    };
    //this._authenticate = this._authenticate.bind(this);
  }
  

  _authenticate = function(buttonPressed){
    //close all Alerts
    Alert.closeAll();
    //disable text boxes
    this.setState({formDisabled: true});

    //validate email/pw
    var email = this.refs["email"].value;
    var password = this.refs["password"].value;
    //check email
    if(!email.includes('@')){
      Alert.warning('invalid email', this.alertOptions);
      this.setState({formDisabled: false});
    }
    //check pw
    else if (password.length < 6){
      //alert('password must be at least 6 characters');
      Alert.warning('password length must be 6+', this.alertOptions);
      this.setState({formDisabled: false});
    }
    //both are valid
    else{
      //encrypt pw and send request for login/signup
      var User = {
        email: email,
        password: password
      };

      if (buttonPressed==='signup'){

        axios.post(env.API_URL + '/register', User)
        .then( (res) => {
          //use res from server
          if (res.data.success === true){
            Alert.success('Account has been registered! Please log in');
            localStorage.setItem("token", res.data.token);
          }
          else{
            Alert.error(res.data.message);
          }
        })
        .catch( (err) => {
          //alert user there was a server error
          Alert.error("Server error. Please try again later.");
        });
        this.setState({formDisabled: false});
      }
      else if (buttonPressed==='login'){

        axios.post(env.API_URL + '/login', User)
        .then( (res) => {
          //use res from server
          if (res.data.success === true) {
            Alert.success('Login Successful!');
            localStorage.setItem("token", res.data.token);
            //redirect to dashboard if signin successful,
          }
          else{
            //else enable form fields again and display error
            Alert.error("login failed. " + res.data.message);
            this.setState({formDisabled: false});
          }
        })
        .catch( (err) => {
          //alert user there was a server error
          Alert.error("Server error. Please try again later.");
          this.setState({formDisabled: false});
        });
      }
    }
  }

  render() {
    return (
        <div className='login'>
          <Alert stack={{limit: 2, spacing: 50}} />
          <h3 id='loginHeader'>Account Details</h3>
          <form onSubmit={this._onSubmit}>
            <input name='email' placeholder='email@domail.com' ref='email' 
              type='text' disabled={this.state.formDisabled} />
            <input id='pw' name='password' placeholder='Password' ref='password' 
              type='password' disabled={this.state.formDisabled} />
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

export default Login;
