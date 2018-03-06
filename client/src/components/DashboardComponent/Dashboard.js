import React, { Component } from 'react';
import './Dashboard.css';
import Suggestions from './suggestions/Suggestions';
import Tableprices from './dataTable/Tableprices';
import Clock from './dataTable/Clock';
import Settings from './accountSettings/Settings';
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
      label="Settings">
      <div>
         <h2 style={styles.headline}>Api Keys and Account Settings</h2>
         <Settings />
      </div>
    </Tab>
  </Tabs>
      </div>
      );
    }
}

export default Dashboard;
