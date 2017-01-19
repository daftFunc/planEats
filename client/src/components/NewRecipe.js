import React, {Component} from 'react';
import './RecipeBook.css';
import { Form, ControlLabel, FormControl, Button, HelpBlock, Panel } from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import noImg from '../../public/noImg.jpg';
import request from 'superagent';
import Dropzone from 'react-dropzone';

class NewRecipe extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: [],
      recipeName: '',
      ingredients: '',
      prepTime: '',
      cookTime: '',
      instructions: '',
      ingredientArr: [],
      instructionArr: [],
      imageUpload: '',
      imageUrl: '',
      unitList: ['unit', 'ml','tsp','Tbs','fl-oz','cup','l','pnt'],
      amount: '',
      units: ''
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
    });
  }

  handleChange(ignore, toPush) {
    var context = this;
    //toPush.target.id = value of the updated Id field (recipeName, etc)
    //toPush.target.value = value of the text box on change

    var changedId = toPush.target.id;
    var changedVal = toPush.target.value;

    context.setState({
      [changedId]: changedVal
    })
  }

  handleSubmit(event) {
    var context = this;
    event.preventDefault();

    var splitInst = this.state.instructions.split(',');
    var ready = parseInt(this.state.prepTime) + parseInt(this.state.cookTime);
    
    var newRecipe = {
      extendedIngredients: this.state.ingredientArr,
      readyInMinutes: ready,
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
  }

  handleDynamicAdd(option) {
    var string = this.state.amount + ' ' + this.state.units + ' ' + this.state.ingredientName;

    var updateArr = this.state.ingredientArr.slice();

    var newIngredient = {
      name: this.state.ingredientName,
      unit: this.state.units,
      amount: this.state.amount,
      originalString: string,
    }

    updateArr.push(newIngredient);

    this.setState({
      ingredientArr: updateArr,
      ingredientName: '',
      units: '',
      amount: '',
    });
  }

  onImageDrop(files) {
    var context = this;

    this.setState({
      imageUpload: files[0]
    }, function() {
      context.handleImageUpload(files[0]);
    });
  }

  handleImageUpload(file) {
    var context = this;
    var cloudinary_url = '';
    var cloudinary_preset = '';

    axios.get('/api/apiKeys', {headers: {
      url: 'cloudinary'
      }
    })
      .then(function(data) {
        cloudinary_preset = data.data.api_key;
        cloudinary_url = data.data.url;
        let upload = request.post(cloudinary_url)
                            .field('upload_preset', cloudinary_preset)
                            .field('file', file);

        upload.end((err, response) => {
          if (err) {
            console.error('image post error!', err);
          }
          if (response.body.secure_url !== '') {
            context.setState({
              imageUrl: response.body.secure_url
            });
          }
        });
      });
  }

  render() {
    return (
      <div className="NRcontainer">
          <h1>Create a New Recipe</h1>
          <Panel className="addRecipePanel">
            <form ref="formRef">
              <ControlLabel htmlFor="recipeName" >Recipe Name</ControlLabel>
              <FormControl
                id="recipeName"
                type="text"
                value={this.state.recipeName}
                onChange={this.handleChange.bind(this, 'recipeName')}
                placeholder="Recipe Name"
              />

              <Form inline>
                <span onClick={this.handleDynamicAdd.bind(this)}><FontAwesome name="plus-circle" className="plusSign" /></span>
                <FormControl
                  id="amount"
                  type="text"
                  aria-label="Amount"
                  value={this.state.amount}
                  onChange={this.handleChange.bind(this, 'amount')}
                  placeholder="Amount"
                />

                <FormControl
                  id="units"
                  componentClass="select"
                  aria-label="Units"
                  placeholder="Units"
                  onChange={this.handleChange.bind(this, 'units')}
                  >
                  {this.state.unitList.map((item, i) => {
                    return <option value={item} key={i}>{item}</option>
                  })}

                </FormControl>

                <FormControl
                  id="ingredientName"
                  type="text"
                  aria-label="Ingredient Name"
                  value={this.state.ingredientName}
                  onChange={this.handleChange.bind(this, 'ingredientName')}
                  placeholder="Ingredient"
                />
              </Form>

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
                <p>OPTIONAL: drag or double-click to upload an image of your dish!</p>
              </Dropzone>

              <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </form>
        </Panel>
      </div>
    )
  }
}

export default NewRecipe;
