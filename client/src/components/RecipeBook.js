import React, {Component} from 'react';
import './RecipeBook.css';
import { Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import RecipeList from './RecipeList';
import {Link} from 'react-router-dom';
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
       imageWidth: 312,
       imageHeight: 231,
       title: res.data.title,
       html: res.data.summary,
       showConfirmButton: false,
       showCancelButton: true,
       cancelButtonText: 'close',
     }))
  }

  displayIngredients(recipe) {
    var htmlSt = '<div><p style={{font-weight: "bold"; text-align: "center"}}>Ingredients</p><ul style={{text-align: "right"}}>'
    var ing = recipe.recipe.extendedIngredients
                    .map((ingredient) => {
                      console.log(ingredient)
                        htmlSt = htmlSt.concat(`<li>${ingredient.originalString}</li>`)
                    })

    htmlSt = htmlSt.concat('</ol></div><hr style={{border: 0; height: "1px"; background-image: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"}}/>');
    console.log(htmlSt)
   swal({
     title: recipe.name,
     html: htmlSt,
     showConfirmButton: false,
     showCancelButton: true,
     cancelButtonText: 'close',
   })
  }

  displayInstructions(recipe) {
    var htmlStr = '<div><p style={{font-weight: "bold"; text-align: "center"}}>Instructions</p><ul style={{text-align: "right"}}>';

    var inst = recipe.recipe.instructions
                      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                      .split("|")
                      .map((step,i) => {
        if( step !== '' ) {
          htmlStr = htmlStr.concat(`<li key=${i + step}>
            ${step}
          </li>`);
        }
    });
    htmlStr = htmlStr.concat('</ul></div>')

    swal({
      title: recipe.name,
      html: htmlStr,
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
              displayIngredients={this.displayIngredients}
              displayInstructions={this.displayInstructions}
             />
            ))}
            <div className="clear"></div>
        </div>
      </div>
    )
  }
}

export default Book;
