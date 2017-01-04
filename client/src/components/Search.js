import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './Search.css';

class Search extends Component {

  render() {
    return (
      <div className="container">
        <h1>Recipe Search</h1>
        <div className="searchBox"></div>
      </div>
    )
  }
}

export default connectProfile(Search);
