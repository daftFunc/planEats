import React, {Component} from 'react';
// import Axios from 'axios'
import './Shop.css';
import Convert from 'convert-units';
import spoonRecipes from '../data/shop.js'
export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: {},
      addedItems: [],
      freq: '7',
      modalActive: false,
      itemAddedValue:''
    }
  }

  componentDidMount() {

    console.log('spoons',spoonRecipes[0].extendedIngredients,spoonRecipes[1].extendedIngredients,spoonRecipes[2].extendedIngredients);
    var amountOrder = { 'ml':1,'l':2,'tsp':3,'Tbs':4,'fl-oz':5,'cup':6,'pnt':7,'qt':8 };
    var groceryList = {};
    var abbrev = {
      milliliter:'ml',
      liter: 'l',
      teaspoon:'tsp',
      tablespoon:'Tbs',
      'fluid ounce': 'fl-oz',
      quart:'qt',
      pint:'pnt',
      T:'Tbs',
      'tbl':'Tbs',
      t: 'tsp',
      tbsp:'Tbs',
      C: 'cup'
    }

    for ( var i = 0; i < spoonRecipes.length; i++ ) {
      var ingredients = spoonRecipes[i].extendedIngredients;

      for ( var j = 0; j < ingredients.length; j++ ) {
        var ingredientMaster = ingredients[j];
        var itemInList = groceryList[ingredientMaster.name];
        ingredientMaster.unit = ingredientMaster.unit.replace(/s$/g,"");

        if(abbrev[ingredientMaster.unit]) {
          ingredientMaster.unit = abbrev[ingredientMaster.unit];
        }

        if ( !itemInList ) {
          groceryList[ingredientMaster.name] = [[ingredientMaster.amount,ingredientMaster.unit]];
        } else {
          var itemAdded = false;

          for ( var k = 0; k < itemInList.length; k++ ) {
            //console.log('hihihi');
            //console.log(itemInList[k]);
            if ( itemInList[k][1] === ingredientMaster.unit ) {
              itemInList[k][0] += ingredientMaster.amount;
              console.log(groceryList[ingredientMaster.amount], itemInList[k][0]);
              itemAdded = true;

            } else if(amountOrder[ingredientMaster.unit] && amountOrder[itemInList[k][1]]) {
              console.log("Converting",ingredientMaster.amount, itemInList[k][0]);
              if(amountOrder[ingredientMaster.unit] > amountOrder[itemInList[k][1]]) {
                itemInList[k][0] = ingredientMaster.amount + Convert(itemInList[k][0])
                                                            .from(itemInList[k][1])
                                                            .to(ingredientMaster.unit);

              } else {
                itemInList[k][0] = itemInList[k][0] + Convert(ingredientMaster.amount)
                                                              .from(ingredientMaster.unit)
                                                              .to(itemInList[k][1]);
              }
              //console.log("Conversion",itemInList[k][0]);
              itemAdded = true;
            }
          }

          if ( !itemAdded ) {
            itemInList.push ( [ingredientMaster.amount,ingredientMaster.unit] );
          }
        }
      }
    }
    console.log('test list',groceryList);
    this.setState({
      groceryList: groceryList
    })
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

      {Object.keys(groceryList).map((key) => {
        var amount = '';

        if (groceryList[key].length > 1) {

          groceryList[key].map((element,i)=> {
            console.log ( element );
            amount += ' and ' + groceryList[key][i][0] + ' ' + groceryList[key][i][1];
          })
          amount = amount.substring(5,amount.length);
        } else {
          amount = amount = groceryList[key][0][0] + ' ' + groceryList[key][0][1];
        }

        return (
          <li className="item" id={key}>
          <input type='checkbox'/>
          <label htmlFor={key}>
            <span></span>{amount + ' ' + key}
          </label>
          </li>
        );
      })
      }
      {addedItems.map((element) => (
        <li className="item">
          <input type="checkbox" id={element} />
            <label htmlFor={element}>
              <input type="checkbox" /><span />{element}
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
