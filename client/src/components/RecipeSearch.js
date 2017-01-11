import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import swal from 'sweetalert2';
// import {Link} from 'react-router';
import './RecipeSearch.css';
import { /*FieldGroup, */FormGroup, HelpBlock, ControlLabel, FormControl, Button/*, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';


class RecipeSearch extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: [],
    }
  }

  componentDidMount() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=16', {
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

  handleSubmit(event) {
    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=16', {
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

    this.setState({
      recipeName: null,
      ingredients: null,
      prepTime: null,
      cookTime: null,
      instructions: null,
      ingredientArr: [],
      instructionArr: []
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h1>Search for a recipe.</h1>
          <textarea className="recipeSearchForm" placeholder="What would you like to search for?" onChange={this.handleChange} />
          <div className="submit-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div className="recipes">
          <h1>Results</h1>
          <ul className="recipeList">
            {this.state.recipes.map((recipe, i) => {return <li className="recipeItem" key={i}>{recipe.title}</li>})}
          </ul>
        </div>
      </div>
    )
  }
}

export default connectProfile(RecipeSearch);
