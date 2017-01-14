import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './RecipeSearchResult.css';
import {Button, ButtonToolbar, Image, Panel} from 'react-bootstrap';
import Flexbox from 'flexbox-react';


const RecipeSearchResult = ({recipe, addToRecipeBook, displayRecipeSummary}) => {
  return (
    <Panel className="recipeSearchResult container">
      <div className="itemHeader item">
        <h2>{recipe.title}</h2>
        Ready in {recipe.readyInMinutes} minutes!
      </div>
      <div className="recipeImage item">
        <Image src={recipe.image} responsive alt={recipe.title}></Image>
      </div>
      <div className="recipeButtons item">
        <ButtonToolbar bsSize="large">
          <Button bsStyle="primary" active onClick={() => addToRecipeBook(recipe.id)}>Add To Recipe Book</Button>
          <Button bsStyle="primary" active onClick={() => displayRecipeSummary(recipe.id)}>More Info</Button>
        </ButtonToolbar>
      </div>
    </Panel>
  )
};

RecipeSearchResult.propTypes = {
  recipe: React.PropTypes.object.isRequired,
  addToRecipeBook: React.PropTypes.func.isRequired,
  displayRecipeSummary: React.PropTypes.func.isRequired
};

export default /*connectProfile*/(RecipeSearchResult);









// class RecipeSearchResult extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: JSON.parse(localStorage.profile).email,
//       show: false,
//       recipe: this.props.recipe
//     }
//   }
//
//   componentDidMount() {
//     axios.defaults.headers.username = this.state.username;
//
//     axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${this.props.recipe.id}/information?includeNutrition=true`, {
//       headers: {
//         'X-Mashape-Key': process.env.REACT_APP_SPOONACULAR_API_KEY,
//         'Accept': 'application/json'
//       }
//     })
//     .then(res => {
//       this.setState({
//         recipe: res.data
//       });
//     });
//   }
//
//   addToRecipeBook(event) {
//     axios.post('/api/recipe', {
//       username: this.state.username,
//       name: this.state.recipe.title,
//       recipe: this.state.recipe
//     });
//     swal(
//       'Added to your recipe book!',
//       'We can taste it already. Yum!'
//     );
//     event.preventDefault();
//   };
//
//   displayFullRecipe(event){
//     let user = this.state.username;
//     let recipe = this.state.recipe;
//     console.log(recipe);
//     let ingredients = '<h3>Ingredients:</h3><ol>';
//     for(let i = 0; i < recipe.extendedIngredients.length; i++){
//       ingredients = ingredients.concat(`<li>${recipe.extendedIngredients[i].originalString}</li>`);
//     }
//     ingredients = ingredients.concat('</ol>');
//     console.log(ingredients);
//     swal({
//       imageUrl: `https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`,
//       imageWidth: 312,
//       imageHeight: 231,
//       title: recipe.title,
//       html: ingredients,
//       confirmButtonText: 'Add To Recipe Book',
//       showCancelButton: true,
//       cancelButtonText: 'Nah, not this one',
//       animation: true,
//       customClass: 'animated bounceIn'
//     })
//     .then(() => {
//       axios.post('/api/recipe', {
//         username: user,
//         name: recipe.title,
//         recipe: recipe
//       });
//       swal(
//         'Added to your recipe book!',
//         'We can taste it already. Yum!'
//       );
//     });
//   };
//
//   render() {
//     return (
//       <div className="RecipeSearchResult container">
//         <h2>{this.state.recipe.title}</h2>
//         Ready in {this.state.recipe.readyInMinutes} minutes!
//         <div className="recipeImage">
//           <img src={`https://spoonacular.com/recipeImages/${this.state.recipe.id}-240x150.jpg`} width="240" height="150" alt={this.state.recipe.title}></img>
//         </div>
//         <ButtonToolbar>
//          <Button bsStyle="primary" active bsSize="large" onClick={this.addToRecipeBook.bind(this)}>Add To Recipe Book</Button>
//          <Button bsStyle="primary" active bsSize="large" onClick={this.displayFullRecipe.bind(this)}>Full Recipe</Button>
//         </ButtonToolbar>
//       </div>
//     )
//   }
// }
//
// export default connectProfile(RecipeSearchResult);