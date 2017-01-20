import React, {Component} from 'react';
import './RecipeBook.css';
import { Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import RecipeList from './RecipeList';
import {Link} from 'react-router';
import swal from 'sweetalert2';

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

  displayRecipeSummary(recipe) {
   axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipe}/summary`, {
     headers: {
       'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
       'Accept': 'application/json'
     }
   })
   .then(res =>
     swal({
       imageUrl: `https://spoonacular.com/recipeImages/${res.data.id}-312x231.jpg`,
       imageWidth: 312,
       imageHeight: 231,
       title: res.data.title,
       html: res.data.summary,
       showConfirmButton: false,
       showCancelButton: true,
       cancelButtonText: 'close',
     }))
  }

  displayFullRecipe(recipe) {
    var ing = recipe.recipe.extendedIngredients
                    // .map((ingredient) => {
                    //   return <li>{ingredient.originalString}</li>
                    // })
    var inst = recipe.recipe.instructions
                      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                      .split("|")
    //                   .map((step,i) => {
    //     if( step !== '' ) {
    //       return (<li id='cook-steps' key={i + step}>
    //         {step}
    //       </li>);
    //     }
    // })

    // console.log(ing, inst)

   swal({
     imageUrl: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`,
     imageWidth: 312,
     imageHeight: 231,
     title: recipe.name,
     html: ing + '<br />' + inst,
     showConfirmButton: false,
     showCancelButton: true,
     cancelButtonText: 'close',
   })
  }

  render() {
    return (
      <div className="RBcontainer">
        <h1 id="recipeBook">Recipe Book</h1>
            <Link to='/new-recipe'>
              <Button id="createARecipe" bsStyle="info">Create a Recipe</Button>
            </Link>

        <div>
          {this.state.recipes.map((recipe, i) =>(
            <RecipeList
              className="item recipe"
              recipe={recipe}
              key={i}
              displaySummary={this.displayRecipeSummary}
              displayFull={this.displayFullRecipe}
             />
            ))}
            <div className="clear"></div>
        </div>
      </div>
    )
  }
}

export default Book;
