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