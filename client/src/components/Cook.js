import React, {Component} from 'react';
import Axios from 'axios'
import moment from 'moment';
import './Cook.css';
export default class Cook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookingInstructions: []
    }
  }

  componentDidMount() {
    Axios.get('/api/events', {headers:{username:JSON.parse(localStorage.profile).email}})
      .then((events) => {
        return this.getNextEvent(events.data[0].Events);
      })
      .then((nextEvent) => {
        return this.getEventRecipes(nextEvent);
      })
      .then((mealRecipe) => {
        var instructions = mealRecipe.data[0][0].Recipes.map((recipeData)=>{

          console.log('recipe',recipeData.recipe);
          return [recipeData.name, recipeData.recipe.instructions, recipeData.recipe.image, recipeData.recipe.extendedIngredients];
        });
        console.log(instructions);
        this.setState({
          cookingInstructions:instructions
        })
        console.log(mealRecipe);
      })
      .catch((error)=>{
        console.log('Error:',error);
      })
  }
  getEventRecipes(event){
    return Axios.get('/api/getEventRecipes',
            {
              headers: {
                events: JSON.stringify([event])
              }
            })
  }
  getNextEvent(events){
    return events.reduce((a,b)=>{
      var momentPrev = a.start;
      var momentNext = b.start;
      var val;
      if(moment(momentNext).diff(moment()) > moment(momentPrev).diff(moment())) {
        val = a;
      } else {
        val = b;
      }
      return val;
    })
  }
  render() {
    return  (
      <div>
        <h1 style={{textAlign:'center'}}>Cook</h1>
        <div id='instruction-box'>
          <CookingInstruction instructions={this.state.cookingInstructions} />
        </div>
      </div>
    );
  }
}

var CookingInstruction = ({instructions}) => (


  <ul>

    {console.log("instructions",instructions)}
    {instructions.map((element,i) => (
      <p>
        <li key={element[0]}><div id="title">{element[0]}</div>
          <div style={{display:'inline'}}>
            <img className="recipe-image" src={element[2]} alt={element[0]} />

          <Ingredients style={{display:'inline'}} ingredients={element[3]}/>
            {console.log("next recipe",element)}
          </div>
          <Instructions instructions={element[1]} />
        </li>
      </p>
      ))}
  </ul>

);

var Ingredients = ({ingredients}) => (

  <ul id = "ing-ul">

    {ingredients.map((ingredient) => {
      var ingredientStr = ingredient.originalString;

      return (
        <li className="ingredients-cook" id={ingredientStr}>
            {ingredientStr}
        </li>
      );
    })}
  </ul>
);
var Instructions = ({instructions}) => (
    <ol>
    {instructions && instructions
                      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                      .split("|")
                      .map((step,i) => {
                        if( step !== '' ) {
                          console.log("next step",step);
                          return (<li id='cook-steps' key={i + step}>
                            {step}
                          </li>);
                        }
                    })
    }
    </ol>
  );