import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import swal from 'sweetalert2';
// import {Link} from 'react-router';
import './RecipeBook.css';
import recipes from '../data/recipes.js';
import { /*FieldGroup, */FormGroup, /*HelpBlock, ControlLabel, */FormControl, Button/*, Checkbox, Radio */} from 'react-bootstrap';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes,
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: ''
    }
  }

  handleChange(event) {
    console.log(event.target)
    var changedId = event.target.id;
    var changedVal = event.target.value;

    this.setState({
      [changedId]: changedVal //[] around var name lets it be used as key in ES6
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
    var newRecipe = {
      id: null,
      title: this.state.recipeName,
      readyInMinutes: this.state.cookTime + this.state.prepTime
    }

    recipes.push(newRecipe);

    this.setState({
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: ''
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
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
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
