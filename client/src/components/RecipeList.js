import React from 'react';
import { Panel } from 'react-bootstrap';

const RecipeList = ({recipe}) => {
  return (
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item recipeHeader">
          <h2>{recipe.name}</h2>
          <text>Ready in {recipe.recipe.readyInMinutes} minutes!</text>
        </div>

        <div className="recipeImage item">
          <img src={recipe.recipe.image} alt={recipe.name} className="scaleImg"/>
        </div>
      </Panel>
    </div>
  );
};

RecipeList.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default RecipeList;
