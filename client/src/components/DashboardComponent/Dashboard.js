import React, { Component } from 'react';
import Navbar from '../NavbarComponent/Navbar';
import axios from 'axios';
import env from '../../../config/env';
import './Dashboard.css';
import Suggestions from './Suggestions';
import Tableprices from './Tableprices';
//import Coindata from './coindata';

class Dashboard extends Component {



  componentDidMount() {
    console.log('I was triggered during componentDidMount')

    this.getCoinPrice();

  }

  render() {
      return (
        <div className="Dashboard">
          <Navbar />
          <h2>Dashboard</h2>    
          <Suggestions />
          <Tableprices />
        </div>
      );
    }

    getCoinPrice() {
      console.log('I was triggered during getCoinPrice')
      axios.get(env.API_URL + '/price/BTC/chasing-coins')
      .then( (res) => {
        //use res from back-end server and check status code
        //forwarded from external API server
        if (res.data.APIStatusCode === 200) {
          //log price since request status is 200 (OK)
          console.log(String(res.data.price));
        }
        else{
          //log response of bad API response
          console.log(String(res.data));
        }
      })
      .catch( (err) => {
        //log error
        console.log(String(err));
      });
    }

}

export default Dashboard;
