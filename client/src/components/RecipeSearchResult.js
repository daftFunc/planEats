import React, {Component} from 'react';
import {connectProfile} from '../auth';
import swal from 'sweetalert2';
import SweetAlert from 'sweetalert-react';
import {Link} from 'react-router';
import './RecipeSearchResult.css';
import { /*FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, */Button/*, Checkbox, Radio*/} from 'react-bootstrap';
import axios from 'axios';
// import FontAwesome from 'react-fontawesome';
import Visible from 'visible-react';


class RecipeSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipe: this.props.recipe
    }
  }

  componentDidMount() {
    axios.defaults.headers.username = this.state.username;

    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipe.id}/information?includeNutrition=true`, {
      headers: {
        'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({
        recipe: res.data
      });
    });
  }

  addToRecipeBook(event) {
    axios.post('/api/recipe', {
      username: this.state.username,
      name: this.state.recipe.title,
      recipe: this.state.recipe
    });
    event.preventDefault();
  };

  displayFullRecipe(event){
    let recipe = this.state.recipe;
    swal({
      imageUrl: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`,
      imageWidth: 312,
      imageHeight: 231,
      title: recipe.title,
      text: 'Modal with a custom image.',
      confirmButtonText: 'Add To Recipe Book',
      showCancelButton: true,
      cancelButtonText: 'Nah, not this one',
      animation: false,
      customClass: 'animated bounceIn'
    })
      .then(() => {
        axios.post('/api/recipe', {
          username: this.state.username,
          name: this.state.recipe.title,
          recipe: this.state.recipe
        });
      });
  };

  render() {
    return (
      <div className="RecipeSearchResult container">
        <h2>{this.state.recipe.title}</h2>
        Ready in {this.state.recipe.readyInMinutes} minutes!
        <div className="recipeImage">
          <img src={`https://spoonacular.com/recipeImages/${this.state.recipe.id}-240x150.jpg`} width="240" height="150" alt={this.state.recipe.title}></img>
        </div>
        <Button bsStyle="primary" active bsSize="large" onClick={this.addToRecipeBook.bind(this)}>Add To Recipe Book</Button>
        <Button bsStyle="info" active bsSize="large" onClick={this.displayFullRecipe.bind(this)}>Full Recipe</Button>
      </div>
    )
  }
}

export default connectProfile(RecipeSearchResult);
