import React, { Component } from 'react';
import Landing from './LandingComponent/Landing';
import { withRouter, Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './DashboardComponent/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

//to protect the /Dashboard route
//https://stackoverflow.com/a/42708437
function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (!localStorage.getItem("token")) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;

        this.props.history.push(`/?redirect=${redirect}`);
      }
    }

    render() {
      return localStorage.getItem("token")
        ? <Component {...this.props} />
        : null;
    }

  }

  return withRouter(AuthenticatedComponent);
}

const tabTheme = getMuiTheme(darkBaseTheme);
tabTheme.tabs = { backgroundColor: "#67c26f" };
tabTheme.inkBar = {backgroundColor: "#FF1744" };


class App extends Component {
  render() {
    // localStosrage.removeItem("token");
    return (
      <MuiThemeProvider muiTheme={tabTheme}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              {/* <Route exact path='/' component={Landing} /> */}
              <Route exact path="/" render={() => (
                localStorage.getItem("token") ? (
                  <Redirect to="/Dashboard" />
                ) : (
                    <Landing />
                  )
              )} />
              <Route exact path='/Dashboard' component={requireAuth(Dashboard)} />
              <Route render={function () {
                return <p>404. Not found</p>
              }} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
