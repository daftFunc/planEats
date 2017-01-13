import React, {Component} from 'react';
import {connectProfile} from '../auth';
import './RecipeBook.css';
import { Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import RecipeList from './RecipeList';


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
  //  var query = this.props.location.query;
  //  query.page = eventKey;
  //  ProductStore.fetchProductList(query);
}

  render() {
    return (
      <div className="RBcontainer">
        <div className="recipeBook">

          <RecipeList recipes={this.state.recipes}/>
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
