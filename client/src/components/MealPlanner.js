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
      mealName: null,
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
    //value of the text box
    if (meal.target) {
      this.setState({
        mealName: meal.target.value
      })
    } else {
      //item to add to array
      var update = this.state.clicked.slice()
      update.push(meal)

      this.setState({
        clicked: update
      })
    }
  }

  handleRemove(item) {

    var update = this.state.clicked.slice()
    update.splice(item, 1)

    this.setState({
      clicked: update
    }, function() {
      this.forceUpdate()
    })

  }

  handleSubmit(event) {
    event.preventDefault();
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
    var newMeal = {
      id: null,
      name: this.state.mealName,
      recipes: this.state.clicked
    };

    var updatedMeals = meals.concat(newMeal);

    this.setState({
      meals: updatedMeals,
      mealName: ''
    }, function(){
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="container">
        <div className="recipes">
          <h3>Click to add a recipe to your new meal</h3>
          <ul className="recipeList">
            {this.state.recipes.map((recipe, i) => {return <li className="recipeItem" id={i} onClick={this.handleChange.bind(this, recipe.title)}>{recipe.title}</li>})}
          </ul>
        </div>
        <div className="addNew">
          <form>
            <FormControl
              id="recipeName"
              type="text"
              value={this.state.mealName}
              onChange={this.handleChange.bind(this)}
              placeholder="Meal Name"
            />
            <ul>
              {this.state.clicked.map((val, i) => {
                return <li className="mealItems" id={i} onClick={this.handleRemove.bind(this, i)}>{val}</li>
              })}
            </ul>
            <Button type="submit" onClick={this.handleSubmit.bind(this)}>Add Meal</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default connectProfile(MealPlanner);
