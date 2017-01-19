import React from 'react';
import { Panel, Button, Image } from 'react-bootstrap';

const RecipeList = ({recipe}) => {
  return (
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item recipeHeader">
          <h2>{recipe.name}</h2>
          <text>Ready in {recipe.recipe.readyInMinutes} minutes!</text>
        </div>

        <div className="recipeImage item">
          <Image src={recipe.recipe.image} alt={recipe.name} className="scaleImg" responsive/>
        </div>

        <div className="buttonRow">
          <Button className="btnRL" bsStyle="info">Ingredients</Button>
          <Button className="btnRL" >Summary</Button>
          <Button className="btnRL" bsStyle="info">Full Recipe</Button>
        </div>
      </Panel>
    </div>
  );
};

RecipeList.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default RecipeList;
