import React, {Component} from 'react';
import './RecipeBook.css';
import { Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import RecipeList from './RecipeList';
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
        //split for pagination
        var pages = [];

        while (recipes.data[0].Recipes.length >= 10) {
          pages.push(recipes.data[0].Recipes.splice(0, 10));
        }

        if (recipes.data[0].Recipes.length) {
          pages.push(recipes.data[0].Recipes);
        }

        context.setState({
          recipes: pages,
          totalPages: pages.length
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
      <div>
      <h1 id="recipeBook">Recipe Book</h1>
      <Link to='/new-recipe'>
        <Button id="createARecipe">Create a Recipe</Button>
      </Link>
      <div className="RBcontainer">

        <div>
          {this.state.recipes.map((page, index) => {
            console.log(page)
            page.map((recipe, i) => {
              return
              (<RecipeList
                className="item recipe"
                recipe={recipe}
                key={i}
                readyInMinutes={parseInt(recipe.recipe.cookTime) + parseInt(recipe.recipe.cookTime)}
             />)
             })
           })
          }


          </div>
          <Pagination
            bsSize="medium"
            items={this.state.totalPages}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
            />
      </div>
    </div>
    )
  }
}

export default Book;
