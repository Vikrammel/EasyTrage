import React, {Component} from 'react';
import './Login.css';
import Alert from 'react-s-alert';

class Login extends Component {

  constructor(props) {
    super(props);
    //set options for alerts
    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    };
    //set form input elements to be enabled by default
    this.state = {
      formDisabled: false
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  

  _onSubmit = function(e){
    //close all Alerts
    Alert.closeAll();
    //prevent default onSubmit behavior (page reload/redirect)
    e.preventDefault();
    //disable text boxes
    this.setState({formDisabled: true});

    //validate email/pw
    var email = this.refs["email"].value;
    var password = this.refs["password"].value;
    //check email
    if(!email.includes('@')){
      //alert('invalid email');
      console.log('invalid email');
      Alert.warning('invalid email', {
        position: 'top',
        effect: 'scale',
        timeout: 2000,
        offset: 100
      });
      this.setState({formDisabled: false});
    }
    //check pw
    else if (password.length < 6){
      //alert('password must be at least 6 characters');
      Alert.warning('password must be at least 6 characters', {
        position: 'top',
        effect: 'scale',
        timeout: 2000,
        offset: 100
      });
      this.setState({formDisabled: false});
    }
    //both are valid
    else{
      //encrypt pw and send request for login/signup
      //redirect to dashboard if signin/up successful,
      //else enable form fields again and display error
    }
  }

  render() {
    return (
        <div className='login'>
          <Alert stack={{limit: 2, spacing: 50}} />
          <h3 id='loginHeader'>Account Details</h3>
          <form onSubmit={this._onSubmit}>
            <input name='email' placeholder='email@domail.com' ref='email' 
              type='text' disabled={this.state.formDisabled}/>
            <input id='pw' name='password' placeholder='Password' ref='password' 
              type='password' disabled={this.state.formDisabled}/>
            <input id='login' type='submit' defaultValue='Sign in' ref='signin' />
            <hr />
            <input id='signup' type='submit' defaultValue='Sign up' ref='signup' />
          </form>
        </div>
    );
  }
}

export default Login;
