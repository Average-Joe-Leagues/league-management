import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Billing from './Billing/Billing';
import Search from './Search/Search';
// import WeatherWidget from './Weather/WeatherWidget';

class LandingPage extends Component {
  componentDidMount() {
    const token = localStorage.getItem('jwt') || this.props.context.signOut();
    let username = null;
    if (token) {
      const decoded = jwt_decode(token);
      username = decoded.username;
      // console.log('decoded jwt: ', decoded);
      this.props.context.signedIn(username);
    }
  }

  render() {
    const { username, loggedIn } = this.props.context.state;
    // const { login } = this.props.context;
    // console.log(this.props.context);
    if (!loggedIn) {
      // console.log(this.props.data);
      return (
        <>
          {/* <WeatherWidget /> */}
          <div>App Name</div>
          <Link to={'/signin'}>Sign In</Link>
          <br />
          <Link to={'/signup'}>Sign Up</Link>
          <div>Landing Page Content</div>
        </>
      );
    }
    return (
      <>
        {/* <WeatherWidget /> */}
        <div>App Name</div>
        <div>{username}</div>
        <Link to="/settings">My Settings</Link>
        <br />
        <Link to="/dashboard">My Account</Link> <div>Landing Page Content</div>
      </>
    );
  }
}

export default LandingPage;
