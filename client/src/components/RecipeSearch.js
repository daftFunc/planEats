import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import swal from 'sweetalert2';
import {Link} from 'react-router';
import './RecipeSearch.css';
import { /*FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, Button, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import RecipeSearchResult from './RecipeSearchResult';
import Visible from 'visible-react'


class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: null,
      searchValue: null
    }
  }

  componentDidMount() {
    axios.defaults.headers.username = this.state.username;

    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=1', {
      headers: {
        'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        recipes: res.data.recipes
      });
    });
  }

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?offset=0&query=${this.state.searchValue}`, {
      headers: {
        'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        searchValue: null,
        recipes: res.data.results
      });
    });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h1>Search for a recipe.</h1>
          <textarea className="recipeSearchForm" required placeholder="What would you like to search for?" onChange={this.handleChange.bind(this)} />
          <div className="submit-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="recipes">
          <h1>Results</h1>
          {this.state.recipes ? (this.state.recipes.map((recipe, i) => (<RecipeSearchResult recipe={recipe} key={recipe.id} />))) : (<h1>Loading</h1>)}
        </div>
      </div>
    )
  }
}

export default connectProfile(Visible()(RecipeSearch));