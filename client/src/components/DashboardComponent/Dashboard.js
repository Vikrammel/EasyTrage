import React, { Component } from 'react';
import Navbar from '../NavbarComponent/Navbar';
import './Dashboard.css';
import Suggestions from './Suggestions';
import Tableprices from './Tableprices';
import Clock from './Clock';
//import Coindata from './coindata';
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 5,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <Navbar />
          <h2>Dashboard</h2>
          <Tabs Style={{background: 'green'}}>
    <Tab label="Prices" >
      <div>
        <h2 style={styles.headline}>Recent Prices</h2>
        <Clock />
        <Tableprices />
      </div>
    </Tab>
    <Tab label=" Trades" >
      <div>
        <h2 style={styles.headline}>Suggested Trades</h2>
        <Suggestions />
      </div>
    </Tab>
    <Tab
      label="Item Three">
      <div>
         <h2 style={styles.headline}>Tab Three</h2>
      </div>
    </Tab>
  </Tabs>
      </div>
      );
    }
  }

export default Dashboard;
