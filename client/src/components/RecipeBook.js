import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './RecipeBook.css';

class Book extends Component {

  render() {
    return (
      <div className="container">
        <h1>Recipe Book</h1>
      </div>
    )
  }
}

export default connectProfile(Book);
