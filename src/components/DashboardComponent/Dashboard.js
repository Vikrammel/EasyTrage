import React, { Component } from 'react';
import Navbar from '../NavbarComponent/Navbar';
import Suggestedtrades from './suggestedtrades';
import Recenttrade from './recenttrades'
import './Dashboard.css';

class Dashboard extends Component {
    render() {
      return (
        <div className="Dashboard">
            <Navbar />
            <h1>Dashbord placeholder</h1>
            <Suggestedtrades />
            <Recenttrade />
        </div>
      );
    }
}

export default Dashboard;
