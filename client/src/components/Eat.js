import React, {Component} from 'react';
import Axios from 'axios'
export default class Eat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: ['Put macaroni into oven', 'Bake for 10 mins', 'Serve']
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
        <li key={element}>
          <input type='checkbox'/>{element}
        </li>
      )
    )}
  </ol>

);