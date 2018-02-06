import React, { Component } from 'react';
import Landing from './LandingComponent/Landing';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './DashboardComponent/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Landing} />
          <Route path='/Dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
