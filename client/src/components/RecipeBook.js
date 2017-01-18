import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './RecipeBook.css';
import { Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import RecipeList from './RecipeList';
import Flexbox from 'flexbox-react';
import {Link} from 'react-router';

class Book extends Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      recipes: [],
      recipeName: null,
      ingredients: '',
      prepTime: null,
      cookTime: null,
      instructions: '',
      ingredientArr: [],
      instructionArr: [],
      activePage: 1,
      nextIndex: 0,
      totalPages: 1
    }
  }

  componentDidMount() {
    this.fetchUserSavedRecipes();
  }

  fetchUserSavedRecipes() {
    var context = this;
    axios.defaults.headers.username = this.state.username;

    axios.get('/api/recipe')
      .then(function(recipes) {
      context.setState({
        recipes: recipes.data[0].Recipes,
        totalPages: Math.ceil(context.state.recipes.length/10)
      });
    });
  }

  handlePageSelect(eventKey) {
   this.setState({
     activePage: eventKey
   });
 }

  render() {
    return (
      <div className="RBcontainer">
        {/* <h1 id="recipeBook">Recipe Book</h1>
        <Link to='/new-recipe'>
          <Button id="createARecipe">Create a Recipe</Button>
        </Link> */}
        <div>
          {this.state.recipes.map((recipe, i) =>
               (<RecipeList
                className="item recipe"
                recipe={recipe}
                key={i}
               />)
            )
          }

          {/*
          TODO: pagination features
          <Pagination
              items={this.state.totalPages}
              activePage={this.state.activePage}
            /> */}
          </div>
      </div>
    )
  }
}

export default Book;
