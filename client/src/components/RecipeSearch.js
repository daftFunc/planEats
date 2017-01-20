import React, {Component} from 'react';
import {connectProfile} from '../auth';
import swal from 'sweetalert2';
import {Link} from 'react-router';
import './RecipeSearch.css';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import RecipeSearchResult from './RecipeSearchResult';
import Visible from 'visible-react';
import Flexbox from 'flexbox-react';

class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: null,
      searchValue: null
    }
  };

  componentDidMount() {
    axios.defaults.headers.username = this.state.username;

    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=10', {
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
  };

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  };

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
  };

  addToRecipeBook(recipeID) {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information?includeNutrition=true`, {
      headers: {
        'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res => {
    axios.post('/api/recipe', {
      username: JSON.parse(localStorage.profile).email,
      name: res.data.title,
      recipe: res.data
    })
      .then(
      swal(
        'Added to your recipe book!',
        'We can taste it already. Yum!'
    ))});
    event.preventDefault();
  };

  displayRecipeSummary(recipe) {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipe}/summary`, {
      headers: {
        'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res =>
      swal({
        imageUrl: `https://spoonacular.com/recipeImages/${res.data.id}-312x231.jpg`,
        imageWidth: 312,
        imageHeight: 231,
        title: res.data.title,
        html: res.data.summary,
        confirmButtonText: 'Add To Recipe Book',
        showCancelButton: true,
        cancelButtonText: 'Nah, not this one',
        animation: true,
        customClass: 'animated bounceIn'
      })
      .then(() => {
        this.addToRecipeBook(res.data.id);
      }))
  };


  render() {
    return (
      <div>
        <h1 id="recipeBook">Search for a recipe.</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <textarea className="recipeSearchForm" required placeholder="What would you like to search for?" onChange={this.handleChange.bind(this)} />
          <div className="submit-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
        <h1>Results</h1>
        <div>
          {this.state.recipes ?
            (this.state.recipes.map((recipe, i) => (
               <RecipeSearchResult
                className="item recipe"
                recipe={recipe}
                addToRecipeBook={this.addToRecipeBook.bind(this)}
                displayRecipeSummary={this.displayRecipeSummary.bind(this)}
                key={i}
               />
            ))) : null}
        </div>
      </div>
    )
  }
}

export default RecipeSearch;