import React from 'react';
import { Panel, Button, Image } from 'react-bootstrap';

const RecipeList = ({recipe, displaySummary, displayIngredients, displayInstructions}) => {
  return (
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item recipeHeader">
          <p className="recipeTitle">{recipe.name}</p>
          <p className="readyIn" style={{textAlign: 'center'}}>Ready in {recipe.recipe.readyInMinutes} minutes!</p>
        </div>

        <div className="recipeImage item">
          <Image src={`https://spoonacular.com/recipeImages/${recipe.recipe.id}-636x393.jpg`} alt={recipe.name} className="scaleImg" responsive/>
          <div className="buttonRow">
            <Button className="btnRL" bsStyle="success" onClick={() => displaySummary(recipe.recipe.id)}>Summary</Button>
            <Button className="btnRL" onClick={() => displayIngredients(recipe)}>Ingredients</Button>
            <Button className="btnRL" bsStyle="primary" onClick={() => displayInstructions(recipe)}>Instructions</Button>
          </div>
        </div>
      </Panel>
    </div>
  );
};

RecipeList.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default RecipeList;
