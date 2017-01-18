import React, {Component, Link} from 'react';
import {connectProfile} from '../auth';
import './RecipeBook.css';
import { FormGroup, ControlLabel, FormControl, Button, FieldGroup, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import noImg from '../../public/noImg.jpg';
import request from 'superagent';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Dropzone from 'react-dropzone';

class NewRecipe extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: [],
      recipeName: null,
      ingredients: null,
      prepTime: null,
      cookTime: null,
      instructions: null,
      ingredientArr: [],
      instructionArr: [],
      imageUpload: '',
      imageUrl: ''
    }
  }

  componentDidMount() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('/api/recipe')
      .then(function(recipes) {
      //recipes.data[0] is an object holding a Recipes array. Recipes array has all of the user's recipe objects
      context.setState({
        recipes: recipes.data[0].Recipes || []
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
    // var context = this;
    // event.preventDefault();

    /*TODO: update handling to include below instead of an instructions property
      NEEDS:
        1. form update to handle amt, unit and name
        2. push in obj & push into extendedIngredients arr before posting
    */
    // extendedIngredients = []
    // extendedIngredients.push({
    //   name:(name of ingredient),
    //   unit:(tsp, tbsp, etc),
    //   amount:(numerical amount)
    //   originalString: amount + unit + name},
    // })
    var splitInst = this.state.instructions.split(',');

    var newRecipe = {
      ingredients: this.state.ingredientArr,
      prepTime: this.state.prepTime,
      cookTime: this.state.cookTime,
      instructions: splitInst,
      image: this.state.imageUrl || noImg
    }

    axios.defaults.headers.username = this.state.username;
    axios.post('/api/recipe', {
      username: this.state.username,
      name: this.state.recipeName,
      recipe: newRecipe
    }, function(posted) {
      console.log(posted)
    })

    this.setState({
      recipeName: null,
      ingredients: null,
      prepTime: null,
      cookTime: null,
      instructions: null,
      ingredientArr: [],
      instructionArr: []
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
        ingredients: ''
      }, function(){
        console.log(context.state.ingredients)
      });
    }

    // if (option === 'instructions') {
    //   var updateInst = context.state.instructionArr.slice();
    //   updateInst.push(context.state.instructions);
    //
    //   context.setState({
    //     instructionArr: updateInst,
    //     instructions: ''
    //   });
    // }
  }

  onImageDrop(files) {
    this.setState({
      imageUpload: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    var context = this;
    const CLOUDINARY_UPLOAD_PRESET='dfkrm5sc'
    const CLOUDINARY_UPLOAD_URL='https://api.cloudinary.com/v1_1/djuydlfup/image/upload'

    let upload = request.post(process.env.CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error('image post error!', err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          imageUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="addRecipe" id="addRecipe">
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

              <ControlLabel htmlFor="prepTime" >Prep-Time in Minutes</ControlLabel>
              <FormControl
                id="prepTime"
                type="text"
                value={this.state.prepTime}
                onChange={this.handleChange.bind(this, 'prepTime')}
                placeholder="Prep-Time in Minutes"
              />

              <ControlLabel htmlFor="cookTime" >Cook-Time in Minutes</ControlLabel>
              <FormControl
                id="cookTime"
                type="text"
                value={this.state.cookTime}
                onChange={this.handleChange.bind(this, 'cookTime')}
                placeholder="Cook-Time in Minutes"
              />

              <ControlLabel htmlFor="instructions">Instructions</ControlLabel>
              <HelpBlock htmlFor="instructions">Enter instructions with each item separated by a comma</HelpBlock>
              <FormControl
                id="instructions"
                componentClass="textarea"
                value={this.state.instructions}
                onChange={this.handleChange.bind(this, 'instructions')}
                placeholder="Instructions"
              />

              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>OPTIONAL: drag or click to upload an image of your dish!</p>
              </Dropzone>

              <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
            </FormGroup>
        </form>
        </div>
      </div>
    )
  }
}

export default NewRecipe;
