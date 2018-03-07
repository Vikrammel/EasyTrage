import React, { Component } from 'react';
import './Dashboard.css';
import Suggestions from './suggestions/Suggestions';
import Tableprices from './dataTable/Tableprices';
import Clock from './dataTable/Clock';
import Settings from './accountSettings/Settings';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Alert from 'react-s-alert';
import axios from 'axios';
import env from '../../../config/env';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 5,
    marginBottom: 12,
    fontWeight: 400,
  },
  logOut: {
    position: "absolute",
    right: "1%",
    top: "1%",
    backgroundColor: "#E05757",
    disabledBackgroundColor: "#E05757"
  }
};

class Dashboard extends Component {

  _logOut() {
    axios.post(env.API_URL + '/auth/logout', {token: localStorage.getItem("token")})
      .then((res) => {
        if (res.data.success === true) {
          Alert.success(res.data.message);
          localStorage.removeItem("token");
          this.props.history.push("/");
        }
        else {
          Alert.error(res.data.message);
        }
      })
      .catch( (err) => {
        Alert(err);
      })
  }

  render() {
    return (
      <div className="Dashboard">
        <h2>Dashboard</h2>
        <RaisedButton label="Log Out" style={styles.logOut} onClick={() => this._logOut()} />
        <Tabs>
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

export default withRouter(Dashboard);