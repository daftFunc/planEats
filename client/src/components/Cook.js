import React, {Component} from 'react';
import Axios from 'axios'
import moment from 'moment';
import './Cook.css';
export default class Cook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookingInstructions: ['Preheat the oven to 350F and line a large baking sheet with parchment paper.',
      'Peel the sweet potato. Using a box grater with the regular-sized grate holes, grate 1.5 cups of sweet potato. Place in large bowl. I had about 1/2 of the sweet potato leftover, so I sliced it into 1-cm rounds and placed it on the baking sheet. Drizzle with oil and toss to coat.',
      'In a large bowl, stir together the grated sweet potato, cilantro, basil, garlic, ginger, and chopped peanuts.',
      'In a food processor, add the oats and process until finely chopped. You want the texture to be like a coarse flour.', 'Stir the oat flour into the bowl with the vegetables.',
      'Now add the drained chickpeas into the processor and process until finely chopped. You want the mixture to be a cross between a coarse paste and finely chopped chickpeas, but don\'t completely puree the chickpeas. Stir the processed chickpeas into the bowl with the vegetables and oat flour.',
      'In a mug, whisk together the ground flax and water. Let it sit for only 20 seconds or so, any longer and it will get too thick. Stir this flax egg into the vegetable chickpea mixture until fully combined.',
      'Stir in the sesame oil, tamari, lime juice, coriander, salt, and pepper all to taste.',
      'Shape the mixture into 6-8 patties, packing each patty tightly between your hands so it holds together well. Place each patty onto the prepared baking sheet along with the sweet potato rounds.',
      'Bake for 20 minutes, then gently flip the patties and potato rounds and bake for another 15-17 minutes until golden on both sides. You might have to remove the sweet potato a bit early - just keep an eye on them so they don\'t burn.',
      'While the burgers are baking, prepare the peanut sauce. Add all sauce ingredients into a food processor and process until smooth. Adjust ingredients to taste if desired. The sauce will thicken up as it sits.',
      'After baking, place patties on a cooling rack for 10 minutes to cool slightly. Serve with toasted buns (or lettuce or whole grain wraps), tomato slices, roasted sweet potato, lettuce, and the peanut sauce.',
      'The peanut sauce will store in the fridge for at least a week. The burgers can be frozen (after baking and cooling) for a couple weeks.']
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
          return [recipeData.name, JSON.parse(recipeData.recipe).instructions];
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
        <h1 style={{textAlign:'center'}}>Eat</h1>
        <div id='instruction-box'>
          <CookingInstruction instructions={this.state.cookingInstructions} />
        </div>
      </div>
    );
  }
}

var CookingInstruction = ({instructions}) => (


  <ul>
    {instructions.map((element,i)=>(
      <p><li key={element[0]}><div id="title">{element[0]}</div>
      <p></p><ol>
        {
          element[1].split(/[1-9]\.|[1-9]\)|\./).map((step) => {
            if( step !== '' ) {
              return (<li id='cook-steps' key={i + step}>
                <input type='checkbox'/>{step}
              </li>);
            }
          })
        }
      </ol>
      </li></p>
      )
    )}
  </ul>

);
