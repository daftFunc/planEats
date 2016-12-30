import React, {Component} from 'react';
import Axios from 'axios'
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: [1, 2, 3, 4, 5, 6, 7, 5, 4, 23, 54, 6, 78, 432, 435, 34, 54, 65, 64, 435, 234, 132, 43, 54, 54, 56, 65, 65, 34, 324, 324, 243, 324, 324, 234, 54, 45, 34, 54, 34, , 234, 324, 324, 234],
      freq: '7'
    }
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  componentDidMount() {
    //axios.get('/getRecipes').then((list) => {
    //  this.setState({
    //    groceryList: list,
    //    freq:'week'
    //  });
    //})
  }


  dropdownChange(event) {
    this.setState({freq: event.target.value});
  }


  render() {
    return (
      <div>
        <select value={this.state.freq} onChange={this.dropdownChange.bind(this)}>
          <option value='7'>For next week</option>
          <option value='31'>For next month</option>
        </select>
        <div style={{overflow:'auto',height:200+'px'}}>
        <GroceryList groceryList={this.state.groceryList}
                     freq={this.state.freq}/>
        </div>
      </div>
    );
  }
}

var GroceryList = ({groceryList,freq}) => (
  <ul  style={{listStyleType:'none'}}>
    {groceryList.map((element,i)=>(
        <li key={element} style={i>freq&&{display:'none'}||{}}><input type='checkbox'/>{element}</li>
      )
    )}
  </ul>
);