import React, {Component} from 'react';
// import Axios from 'axios'
export default class Eat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ['Preheat the oven to 350F and line a large baking sheet with parchment paper.',
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
    //axios.get('/getRecipes').then((list) => {
    //  this.setState({
    //    groceryList: list,
    //    freq:'week'
    //  });
    //})
  }

  render() {
    return  (
      <div>
        <div>Eat</div>
        <div style={{overflow:'auto',height:200+'px'}}>
          <CookingInstruction instructions={this.state.recipe} />
        </div>
      </div>
    );
  }
}


var CookingInstruction = ({instructions}) => (

  <ol>
    {instructions.map((element,i)=>(
        <li key={element} style={{padding: 5 + 'px'}}>
          <input type='checkbox'/>{element}
        </li>
      )
    )}
  </ol>

);
