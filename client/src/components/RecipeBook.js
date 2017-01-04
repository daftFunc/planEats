import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './RecipeBook.css';
import recipes from '../data/recipes.js'

class Book extends Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes
    }
  }
  render() {
    return (
      <div className="container">
        <h1>Recipe Book</h1>
      </div>
    )
  }
}

export default connectProfile(Book);
