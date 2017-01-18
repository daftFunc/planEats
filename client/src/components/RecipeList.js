import React, {Component} from 'react';
import {connectProfile} from '../auth';
import { Button, Panel, Image } from 'react-bootstrap';

const RecipeList = ({recipe}) => {
  return (
    <div>
      <Panel className="recipeBookPanel">
        <div className="itemHeader item">
          <h2>{recipe.name}</h2>
          <text>Ready in {recipe.recipe.readyInMinutes} minutes!</text>
        </div>

        <div className="recipeImage item">
          <Image src={recipe.recipe.image} responsive alt={recipe.name}></Image>
        </div>
      </Panel>

    </div>
  );
};

RecipeList.propTypes = {
  recipe: React.PropTypes.object.isRequired
};

export default RecipeList;



  {/* {recipes.map((recipe, i) => {return <img src={recipe.recipe.image}/>})} */}
