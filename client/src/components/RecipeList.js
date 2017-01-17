import React, {Component} from 'react';
import {connectProfile} from '../auth';
import { Button } from 'react-bootstrap';
import {Link} from 'react-router';

const RecipeList = ({recipes}) => {
  return (
    <div>
      <h1 id="recipeBook">Recipe Book</h1>
      <Link to='/new-recipe'>
        <Button id="createARecipe">Create a Recipe</Button>
      </Link>
      <ul className="recipeList">
        {recipes.map((recipe, i) => {return <li className="recipeLi" key={i}>{recipe.name}</li>})}
      </ul>
      {/* {recipes.map((recipe, i) => {return <img src={recipe.recipe.image}/>})} */}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: React.PropTypes.array.isRequired
};

export default RecipeList;

// var buf = new Buffer(recipe.image.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
