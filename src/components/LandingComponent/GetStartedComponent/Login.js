import React, {Component} from 'react';
import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formDisabled: false
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  

  _onSubmit = function(e){    
    //prevent default onSubmit behavior (page reload/redirect)
    e.preventDefault();
    //disable text boxes
    this.setState({formDisabled: true});
    //validate email/pw
    var email = this.refs["email"];
    var password = this.refs["password"];
    if(!email.includes('@')){
      alert('invalid email');
      this.setState({formDisabled: false});
    }
    else if (password.length < 6){
      alert('password must be at least 6 characters');
      this.setState({formDisabled: false});
    }
    else{
      //send request for login/signup
    }
    

    //redirect to dashboard if signin/up successful,
    //else enable form fields again and display error
  }

  render() {
    return (
        <div className='login'>
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
