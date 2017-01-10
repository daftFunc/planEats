import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import swal from 'sweetalert2';
// import {Link} from 'react-router';
import './RecipeBook.css';
import recipes from '../data/recipes.js';
import { /*FieldGroup, */FormGroup, HelpBlock, ControlLabel, FormControl, Button/*, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Brit', //TODO: getting logged in username
      recipes: [],
      recipeName: null,
      ingredients: null,
      prepTime: null,
      cookTime: null,
      instructions: null,
      ingredientArr: [],
      instructionArr: []
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

  handleChange(ignore, toPush) {
    var context = this;
    //toPush.target.id = value of the updated Id field (recipeName, etc)
    //toPush.target.value = value of the text box on change

    var changedId = toPush.target.id;
    var changedVal = toPush.target.value;

    context.setState({
      [changedId]: changedVal //[] around var name lets it be used as key in ES6
    })
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
      recipeName: null,
      ingredients: null,
      prepTime: null,
      cookTime: null,
      instructions: null,
      ingredientArr: [],
      instructionArr: []
    }, function() {
      this.forceUpdate();
    });

  }

  handleDynamicAdd(option) {
    //BUG: the text field isn't being updated? it's null on the backend, but not updating
    var context = this;

    if (option === 'ingredients') {
      var updateIng = context.state.ingredientArr.slice();
      updateIng.push(context.state.ingredients);

      context.setState({
        ingredientArr: updateIng,
        ingredients: null
      });
    }

    if (option === 'instructions') {
      var updateInst = context.state.instructionArr.slice();
      updateInst.push(context.state.instructions);

      context.setState({
        instructionArr: updateInst,
        instructions: null
      });
    }
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
              <ControlLabel htmlFor="recipeName" >Recipe Name</ControlLabel>
              <FormControl
                id="recipeName"
                type="text"
                value={this.state.recipeName}
                onChange={this.handleChange.bind(this, 'recipeName')}
                placeholder="Recipe Name"
              />

              <span onClick={this.handleDynamicAdd.bind(this, 'ingredients')}><FontAwesome name="plus-circle" className="plusSign" /></span>
              <ControlLabel htmlFor="ingredients" >Ingredients</ControlLabel>
              <FormControl
                id="ingredients"
                type="text"
                value={this.state.ingredients}
                onChange={this.handleChange.bind(this, 'ingredients')}
                placeholder="Ingredients"
              />

              <ControlLabel htmlFor="prepTime" >Prep-Time</ControlLabel>
              <FormControl
                id="prepTime"
                type="text"
                value={this.state.prepTime}
                onChange={this.handleChange.bind(this, 'prepTime')}
                placeholder="Prep-Time in Minutes"
              />

              <ControlLabel htmlFor="cookTime" >Cook-Time</ControlLabel>
              <FormControl
                id="cookTime"
                type="text"
                value={this.state.cookTime}
                onChange={this.handleChange.bind(this, 'cookTime')}
                placeholder="Cook-Time in Minutes"
              />

              <span onClick={this.handleDynamicAdd.bind(this, 'instructions')}><FontAwesome name="plus-circle" className="plusSign" /></span>
              <ControlLabel htmlFor="instructions" >Instructions</ControlLabel>
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
