import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/AppContext';
import LandingPage from './components/LandingPage';

import AdminDashboard from './components/Dashboards/AdminDashboard';
import CoachDashboard from './components/Dashboards/CoachDashboard';
import HomeDashboard from './components/Dashboards/HomeDashboard';
import Signup from './components/SignUp.js';
import Signin from './components/SignIn.js';

class App extends Component {
  render() {
    console.log(AppContext.Consumer);
    return (
      <>
        <Route
          exact
          path="/"
          render={props => (
            <AppContext.Consumer>
              {context => <LandingPage context={context} />}
            </AppContext.Consumer>
          )}
        />
        <Route path="/dashboard" component={HomeDashboard} />
        <Route path="/dashboard/admin" component={AdminDashboard} />
        <Route path="/dashboard/coach" component={CoachDashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </>

      // admin dashboard - restricted
      // coach dashboard - restricted
      // create league form - restricted
      // public calendars
    );
  }
}

export default App;
