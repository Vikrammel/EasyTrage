import React, {Component} from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
        <div className='login'>
          <h3>Easy Login</h3>
          <input name='username' placeholder='Username' type='text'/>
          <input id='pw' name='password' placeholder='Password' type='password'/>
          <input type='login' defaultValue='Sign in'/>
          <hr />
          <input type='signup' defaultValue='Sign up'/>
        </div>
    );
  }
}

export default Login;
