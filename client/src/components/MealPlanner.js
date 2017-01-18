import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './MealPlanner.css';
import { FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import axios from 'axios'
class MealPlanner extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email, //TODO: update to get user's ID in location
      mealName: '',
      recipes: [],
      clicked: [],
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: '',
      mealTime: '',
      clickedName: [],
      list: ''
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange(meal, index) {
    if (meal.target) { //meal name has been entered
      this.setState({
        mealName: meal.target.value
      });

    }
  }

  handleAddRemove(name) {
    this.setState({
      clickedName: name
    })
  }

  handleRemove(item) {
    var context = this;
    var updateIds = this.state.clicked.slice();
    updateIds.splice(item, 1);

    var updatedName = this.state.clickedName.slice();
    updatedName.splice(item, 1);

    this.setState({
      clicked: updateIds,
      clickedName: updatedName
    }, function() {
      context.forceUpdate();
    })

  }

  handleSubmit(event) {
    event.preventDefault();
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
    var newMeal = {
      username: this.state.username,
      name: this.state.mealName,
      recipe: JSON.stringify(this.state.clicked)
    };
    this.postMeal(newMeal);
  }

  getRecipes() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('/api/recipe')
      .then(function(recipes) {
      //recipes.data[0] is an object holding a Recipes array. Recipes array has all of the user's recipe objects
      context.setState({
        recipes: recipes.data[0].Recipes
      }, function() {
        context.listRecipes();
      })
    });
  }

  postMeal(newMeal) {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.post('/api/meals', newMeal)
      .then(function(event){
      console.log("posted", event)
      context.setState({
        mealName: '',
        clicked: [],
        mealTime: '',
        clickedName: []
      });
    });
  }

  recipeListChange(val) {
    console.log("Selected: " + val);
  }

  listRecipes() {
    var context = this;
    var arr = [];

    this.state.recipes.map((recipe, i) => {
      var obj = {
        value: i,
        label: recipe.name
      }
      arr.push(obj);
    });

    this.setState({
      list: arr
    }, function() {
      console.log('state', context.state.list)
    });
  }

  render() {
    return (
      <div className="MPcontainer">
        <div className="recipeBookML">
          <div className="headerMP">
            <text className="MPHeaderText">Click a recipe to add it to your book and write a name for your creation below!</text>
            <form id="newMealForm">
              <FormControl
                id="recipeName"
                type="text"
                value={this.state.mealName}
                onChange={this.handleChange.bind(this)}
                placeholder="Meal Name"
              />
            </form>
            <text>Click an item to remove from your meal</text>
            <Select
              name="form-field-name"
              value={this.state.clickedName}
              options={this.state.list}
              multi={true}
              onChange={this.handleAddRemove.bind(this)}
            />
          </div>
          <Button type="submit" onClick={this.handleSubmit.bind(this)}>Save Meal</Button>
        </div>
      </div>
    )
  }
}

export default MealPlanner;
