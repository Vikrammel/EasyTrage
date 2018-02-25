import React, { Component } from 'react';
<<<<<<< HEAD
// import Navbar from '../NavbarComponent/Navbar';
=======
import Navbar from '../NavbarComponent/Navbar';
import Suggestedtrades from './suggestedtrades';
import Recenttrade from './recenttrades'
import './Dashboard.css';
>>>>>>> 6beba4369877dbbc2a2f96bd9c16e79ef832098e
import axios from 'axios';
import env from '../../../config/env';
import './Dashboard.css';
import Suggestions from './Suggestions';
import Tableprices from './Tableprices';


class Dashboard extends Component {



  componentDidMount() {
    console.log('I was triggered during componentDidMount')

    this.getCoinPrice();

  }

  render() {
      return (
        <div className="Dashboard">
<<<<<<< HEAD
          <h1>Suggested Trades</h1>
          <Suggestions />
          <Tableprices />
=======
            <Navbar />
            <h1>Dashbord placeholder</h1>
            <Suggestedtrades />
            <Recenttrade />
>>>>>>> 6beba4369877dbbc2a2f96bd9c16e79ef832098e
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
