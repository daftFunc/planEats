import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import logo from './images/planEatsLogo.png'
import './Home.css';

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  render() {

    return (
      <div className="Home">
          <img id="Logo-home" src={logo} alt="logo" />
      </div>
    );
  }
}

export default connectProfile(Home);
