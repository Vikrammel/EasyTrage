import React, { Component } from 'react';
// import Navbar from '../NavbarComponent/Navbar';
import './Dashboard.css';
import Suggestions from './Suggestions';
import Tableprices from './Tableprices';


class Dashboard extends Component {

  render() {
      return (
        <div className="Dashboard">
          <h1>Suggested Trades</h1>
          <Suggestions />
          <Tableprices />
        </div>
      );
    }
}

export default Dashboard;
