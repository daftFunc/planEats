import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './CreateRecipe.css';
import recipes from '../data/recipes.js'
import { FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, Button, Checkbox, Radio } from 'react-bootstrap';


class CreateRecipe extends Component {
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
    event.preventDefault();

    var clickedId = event.target.id;
    var clickedVal = event.target.value;

    this.setState({
      clickedId: clickedVal
    })
  }

  handleSubmit() {
    /*on submit, data needs to be updated so that it renders in the recipe book (send to recipes array)*/
  }

  render() {
    return (
      <div className="container">
        <h1>Create a New Recipe</h1>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <FormControl
              id="recipeName"
              type="text"
              onChange={this.handleChange.bind(this)}
              placeholder="Recipe Name"
            />
            <FormControl
              id="ingredients"
              type="text"
              onChange={this.handleChange.bind(this)}
              placeholder="Ingredients"
            />
            <FormControl
              id="prepTime"
              type="text"
              onChange={this.handleChange.bind(this)}
              placeholder="Prep-Time in Minutes"
            />
            <FormControl
              id="cookTime"
              type="text"
              onChange={this.handleChange.bind(this)}
              placeholder="Cook-Time in Minutes"
            />
            <FormControl
              id="instructions"
              type="text"
              onChange={this.handleChange.bind(this)}
              placeholder="Instructions"
            />
            <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </FormGroup>
      </form>
      </div>
    )
  }
}

export default connectProfile(CreateRecipe);
