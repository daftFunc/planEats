import React, {Component} from 'react';
import { Panel, Image } from 'react-bootstrap';

const RecipeList = ({recipe}) => {
  return (
    // <div className="RBcontainer">
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item recipeHeader">
          <h2>{recipe.name}</h2>
          <text>Ready in {recipe.recipe.readyInMinutes} minutes!</text>
        </div>

        <div className="recipeImage item">
          <Image src={recipe.recipe.image} alt={recipe.name} responsive></Image>
        </div>
      </Panel>

    </div>
  );
};

RecipeList.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default RecipeList;
