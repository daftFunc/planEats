import React, {Component} from 'react';
// import Axios from 'axios'
import './Shop.css'
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: ['celery','3lbs steak', 'sauce', 'milk','eggs','cabbage','chicken','limabeans','cauliflower','sweet and sour'],
      addedItems: [],
      freq: '7',
      modalActive: false,
      itemAddedValue:''
    }
  }

  componentDidMount() {

    console.log('spoons',spoonRecipes[0].extendedIngredients,spoonRecipes[1].extendedIngredients,spoonRecipes[2].extendedIngredients);
    var abbrev = {
    }
    var groceryList = {};

    for ( var i = 0; i < spoonRecipes.length; i++ ) {
      var ingredients = spoonRecipes[i].extendedIngredients;

      for ( var j = 0; j < ingredients.length; j++ ) {
        var ingredient = ingredients[j];
        var itemInList = groceryList[ingredient.name];

        if ( !itemInList ) {
          groceryList[ingredient.name] = [[ingredient.amount,ingredient.unit]];
        } else {
          var itemAdded = false;

          for ( var k = 0; k < groceryList[ingredient.name].length; k++ ) {
            if ( itemInList[k].unit === ingredient.unit ) {
              itemInList[k].amount += ingredient.amount;
              itemAdded = true;
            } else {

            }
          }

          if ( !itemAdded ) {
            itemInList.push ( [ingredient.amount,ingredient.unit] );
          }
        }
      }
    }
    console.log('test list',groceryList);
    //axios.get('/api/recipe', {
      //  username:JSON.parse(localStorage.profile).email
      //  })
      //  .then((list) => {
      //    this.setState({
      //      groceryList: list,
      //      freq:'week'
      //    });
      //    console.log('RECIPES', this.state.groceryList);})
      //  .catch((error)=>{
      //    console.log("Error getting recipe:", error);
      //  })

>>>>>>> pre rebase 2
  }

  handleInputChange(event) {
    event.preventDefault();
    this.setState({
      itemAddedValue: event.target.value
    });
  }

  toggleAdd(event) {
    event.preventDefault();
    this.setState({
      modalActive: !this.state.modalActive
    });
  }

  dropdownChange(event) {
    event.preventDefault();
    this.setState({freq: event.target.value});
  }

  handleAddItem(event) {
    event.preventDefault();
    var newItems = this.state.addedItems.concat([this.state.itemAddedValue]);
    this.setState({
      addedItems:newItems,
      itemAddedValue:'',
      modalActive: !this.state.modalActive
    });

  }

  render() {
    return (

      <div>
        <div>Shop</div>
        <select value={this.state.freq} onChange={this.dropdownChange.bind(this)}>
          <option value='7'>For next week</option>
          <option value='31'>For next month</option>
        </select>
        <div style={{overflow:'auto',height:200+'px'}}>
        <GroceryList groceryList={this.state.groceryList}
                     freq={this.state.freq}
                     addedItems={this.state.addedItems}
                     />
        </div>
        <div>
          <AddItemButtonAndPopup modalActive={this.state.modalActive}
                                 toggleAdd={this.toggleAdd.bind(this)}
                                 handleAddItem={this.handleAddItem.bind(this)}
                                 itemAddedValue={this.state.itemAddedValue}
                                 handleInputChange={this.handleInputChange.bind(this)}/>
        </div>
      </div>
    );
  }
}


var GroceryList = ({groceryList, freq, addedItems}) => (

  <div>
    <ul style={{listStyleType:'none'}}>
      {groceryList.map((element,i) => {
          return i<=freq && (
            <li className="item" id={element}>
              <input type='checkbox'/>
                <label htmlFor={element}>
                  <span></span>{element}
                </label>
            </li>
          );
        })
      }
      {addedItems.map((element) => (
        <li className="item">
          <input type="checkbox" id={element} />
            <label htmlFor={element}>
              <span></span>{element}
            </label>
        </li>
      ))}
    </ul>
  </div>

);

var AddItemButtonAndPopup = ({modalActive, toggleAdd, handleAddItem, itemAddedValue,handleInputChange}) => (

  <div>
  <input type="button"
         name="increase"
         value="+"
         onClick={toggleAdd} />
    <div>
    {modalActive && (
      <form onSubmit={handleAddItem}>
        <div>
          <h3>Add Item</h3>
          <input type="text"
                 name="item"
                 placeholder="Add Item"
                 value={itemAddedValue}
                 onChange={handleInputChange} />
          <input type="submit" value="Add" />
        </div>
      </form>)}
      </div>
  </div>
);
