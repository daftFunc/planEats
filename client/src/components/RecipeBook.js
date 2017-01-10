import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import swal from 'sweetalert2';
// import {Link} from 'react-router';
import './RecipeBook.css';
import recipes from '../data/recipes.js';
import { /*FieldGroup, */FormGroup, /*HelpBlock, ControlLabel, */FormControl, Button/*, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Brit', //TODO: getting logged in username
      recipes: [],
      recipeName: '',
      ingredients: [],
      prepTime: null,
      cookTime: null,
      instructions: []
    }
  }

  componentDidMount() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('/api/recipe')
      .then(function(recipes) {
      //recipes.data[0] is an object holding a Recipes array. Recipes array has all of the user's recipe objects
      context.setState({
        recipes: recipes.data[0].Recipes
      })
    })
  }

  handleChange(event, toPush) {
    //TODO: handle ingredients and instructions so they can be pushed into array
    // if (toPush) {
    //   this.setState({
    //     [toPush]: this.state.toPush.concat(toPush)
    //   })
    // } else {
      var changedId = event.target.id;
      var changedVal = event.target.value;

      this.setState({
        [changedId]: changedVal //[] around var name lets it be used as key in ES6
      })
    // }

  }

  handleSubmit(event) {
    event.preventDefault();
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
    var newRecipe = {
      ingredients: this.state.recipeName,
      prepTime: 10,
      cookTime: 20,
      instructions: []
    }

    axios.post('/api/recipe', {
      name: this.state.recipeName,
      recipe: newRecipe
    })

    this.setState({
      recipeName: '',
      ingredients: [],
      prepTime: '',
      cookTime: '',
      instructions: []
    }, function() {
      this.forceUpdate();
    });

  }

  render() {
    return (
      <div className="container">
        <div className="recipes">
          <h1>Recipe Book</h1>
          <ul className="recipeList">
            {this.state.recipes.map((recipe, i) => {return <li className="recipeItem" key={i}>{recipe.name}</li>})}
          </ul>
        </div>
        <div className="addNew">
          <h1>Create a New Recipe</h1>
          <form ref="formRef">
            <FormGroup>
              <FormControl
                id="recipeName"
                type="text"
                value={this.state.recipeName}
                onChange={this.handleChange.bind(this)}
                placeholder="Recipe Name"
              />
              <FormControl
                id="ingredients"
                type="text"
                value={this.state.ingredients}
                onChange={this.handleChange.bind(this, 'ingredients')} //TODO: handling multiple inputs
                placeholder="Ingredients"
              />
              <FormControl
                id="prepTime"
                type="text"
                value={this.state.prepTime}
                onChange={this.handleChange.bind(this)}
                placeholder="Prep-Time in Minutes"
              />
              <FormControl
                id="cookTime"
                type="text"
                value={this.state.cookTime}
                onChange={this.handleChange.bind(this)}
                placeholder="Cook-Time in Minutes"
              />
              <FormControl
                id="instructions"
                type="text"
                value={this.state.instructions}
                onChange={this.handleChange.bind(this, 'instructions')}
                placeholder="Instructions"
              />
              <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </FormGroup>
        </form>
        </div>
      </div>
    )
  }
}

export default connectProfile(Book);
