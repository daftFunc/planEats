import React, {Component} from 'react';
import {connectProfile} from '../auth';
// import {Link} from 'react-router';
import './MealPlanner.css';
import meals from '../data/savedMeals.js';
// import { FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, Button, Checkbox, Radio } from 'react-bootstrap';
import recipes from '../data/recipes.js'

/* NOT CURRENTLY IN USE - PLACEHOLDER FOR A STANDALONE CREATE RECIPE*/
class MealPlanner extends Component {
  constructor() {
    super();
    this.state = {
      meals: meals,
      recipes: recipes,
      clicked: [],
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: ''
    }
  }

  handleChange(meal) {
    // console.log(meal)
    this.state.clicked.push(meal)

    // this.setState({
    //   clicked: this.state.clicked.push(meal)
    // })
  }

  handleSubmit() {
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
  }

  render() {
    return (
      <div className="container">
        <div className="recipes">
          <h1>Add Recipe to New Meal</h1>
          <ul className="recipeList">
            {this.state.recipes.map((recipe, i) => {return <li className="recipeItem" id={i} onClick={this.handleChange.bind(this, recipe.title)}>{recipe.title}</li>})}
          </ul>
        </div>
        <div className="addNew">
          <h1>New Meal</h1>
          <ul>
            <li>{this.state.clicked}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connectProfile(MealPlanner);
