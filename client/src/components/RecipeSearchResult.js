import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import {Button, ButtonToolbar, Image, Panel} from 'react-bootstrap';
import Flexbox from 'flexbox-react';


const RecipeSearchResult = ({recipe, addToRecipeBook, displayRecipeSummary}) => {
  return (
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item recipeHeader">
          <h2>{recipe.title}</h2>
        </div>
        <div className="recipeImage item">
          <Image src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`} responsive alt={recipe.title}></Image>
        </div>
        <h4>Ready in {recipe.readyInMinutes} minutes!</h4>
        <ButtonToolbar bsSize="large" className="buttonRow">
          <Button bsStyle="primary" active onClick={() => addToRecipeBook(recipe.id)}>Add To Recipe Book</Button>
          <Button bsStyle="primary" active onClick={() => displayRecipeSummary(recipe.id)}>More Info</Button>
        </ButtonToolbar>
      </Panel>
    </div>
  )
};

RecipeSearchResult.propTypes = {
  recipe: React.PropTypes.object.isRequired,
  addToRecipeBook: React.PropTypes.func.isRequired,
  displayRecipeSummary: React.PropTypes.func.isRequired
};

export default /*connectProfile*/(RecipeSearchResult);