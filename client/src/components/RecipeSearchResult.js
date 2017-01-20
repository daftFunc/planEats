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
          <p className="recipeTitle">{recipe.title}</p>
          <p className="readyIn" style={{textAlign: 'center'}}>Ready in {recipe.readyInMinutes} minutes!</p>
        </div>
        <div className="recipeImage item">
          <Image src={`https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`} alt={recipe.title} className="scaleImg" responsive/>
        </div>
        <div className="buttonRow">
          <Button className="btnRS" bsStyle="success" onClick={() => addToRecipeBook(recipe.id)}>Add To Recipe Book</Button>
          <Button className="btnRS" bsStyle="primary" onClick={() => displayRecipeSummary(recipe.id)}>More Info</Button>
        </div>
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