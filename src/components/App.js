import React, { Component } from 'react';
import Landing from './LandingComponent/Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './DashboardComponent/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/Dashboard' component={Dashboard} />
            <Route render={function () {
              return <p>404. Not found</p>
            }}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
