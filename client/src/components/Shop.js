import React, { Component } from "react";
import Axios from "axios";
import "./Shop.css";
import Convert from "convert-units";
import spoonRecipes from "../data/shop.js";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "./daterangepicker.css";
import { DropdownButton, Panel, Button, Checkbox, Form } from "react-bootstrap";

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceryList: {},
      addedItems: [],
      events: [],
      modalActive: false,
      startDate: moment(),
      endDate: moment(),
      formQuant: "",
      formUnits: "",
      formIngred: ""
    };
    this.getEventRecipes = this.getEventRecipes.bind(this);
  }

  componentDidMount() {
    Axios.get("/api/events", {
      headers: {
        username: JSON.parse(localStorage.profile).email
      }
    })
      .then(events => {
        this.setState({
          events: events.data[0].Events
        });
        return Axios.get("/api/shoppinglist", {
          headers: {
            username: JSON.parse(localStorage.profile).email
          }
        });
      })
      .then(list => {
        console.log("list", list);
        this.setState({
          groceryList: list.data[0].list
        });
        console.log("hihi", this.state.groceryList);
      })
      .catch(error => {
        console.log("Error getting events:", error);
      });

    //    .then((events) => {
    //    console.log('Here"s the List',events.data[0].Events);
    //  var oneWeek = this.eventsInDays(events.data[0].Events, 7);
    //  console.log("one week",oneWeek);
    //  return Axios.get('/api/getEventRecipes',
    //    {
    //      headers: {
    //        events: JSON.stringify(oneWeek)
    //      }
    //    })
    //})
    //.then((recipes) => {
    //    console.log("Heres the recipes",recipes.data);
    //  var groceryList = {};
    //  this.parseList(recipes.data, groceryList);
    //  console.log("groceries",groceryList);
    //  this.setState({
    //    groceryList: groceryList
    //  })
    //})
    //.catch((error)=>{
    //    console.log("Error getting recipe:", error);
    //})
    console.log(
      "spoons",
      spoonRecipes[0].extendedIngredients,
      spoonRecipes[1].extendedIngredients,
      spoonRecipes[2].extendedIngredients
    );
  }

  getRecipes(events) {
    return Axios.get("/api/getEventRecipes", {
      headers: {
        events: JSON.stringify(events)
      }
    });
  }
  eventRangeDates(date1, date2) {
    return this.state.events.filter(function(element) {
      var parsedEvent = element.start;
      return moment(parsedEvent).isBetween(date1, date2, "days", "[]");
    });
  }

  parseList(masterList, groceryList) {
    var masterList = masterList.reduce((a, b) => {
      console.log("whattt", b);
      return a.concat(
        b[0].Recipes.reduce((c, d) => {
          console.log("what", c, d);
          if (typeof d.recipe === "string") {
            c.push(JSON.parse(d.recipe));
          } else {
            c.push(d.recipe);
          }
          return c;
        }, [])
      );
    }, []);
    var amountOrder = ["ml", "tsp", "Tbs", "fl-oz", "cup", "l", "pnt"];
    console.log("final list", masterList);
    var abbrev = {
      milliliter: "ml",
      liter: "l",
      teaspoon: "tsp",
      tablespoon: "Tbs",
      "fluid ounce": "fl-oz",
      quart: "qt",
      pint: "pnt",
      T: "Tbs",
      tbl: "Tbs",
      t: "tsp",
      tbsp: "Tbs",
      C: "cup",
      ounce: "oz"
    };

    for (var i = 0; i < masterList.length; i++) {
      if (!masterList[i].extendedIngredients) {
        continue;
      }
      var ingredients = masterList[i].extendedIngredients;

      for (var j = 0; j < ingredients.length; j++) {
        var ingredientMaster = ingredients[j];
        var itemInList = groceryList[ingredientMaster.name];
        ingredientMaster.unit = ingredientMaster.unit.replace(/s$/g, "");

        if (abbrev[ingredientMaster.unit]) {
          ingredientMaster.unit = abbrev[ingredientMaster.unit];
        }

        if (!itemInList) {
          groceryList[ingredientMaster.name] = [
            [ingredientMaster.amount, ingredientMaster.unit]
          ];
        } else {
          var itemAdded = false;

          for (var k = 0; k < itemInList.length; k++) {
            //console.log('hihihi');
            //console.log(itemInList[k]);
            if (itemInList[k][1] === ingredientMaster.unit) {
              itemInList[k][0] += ingredientMaster.amount;
              console.log(
                groceryList[ingredientMaster.amount],
                itemInList[k][0]
              );
              itemAdded = true;
            } else if (
              amountOrder[ingredientMaster.unit] &&
              amountOrder[itemInList[k][1]]
            ) {
              console.log(
                "Converting",
                ingredientMaster.amount,
                itemInList[k][0]
              );
              if (
                amountOrder[ingredientMaster.unit] >
                amountOrder[itemInList[k][1]]
              ) {
                itemInList[k][0] =
                  ingredientMaster.amount +
                  Convert(itemInList[k][0])
                    .from(itemInList[k][1])
                    .to(ingredientMaster.unit);
              } else {
                itemInList[k][0] =
                  itemInList[k][0] +
                  Convert(ingredientMaster.amount)
                    .from(ingredientMaster.unit)
                    .to(itemInList[k][1]);
              }
              //console.log("Conversion",itemInList[k][0]);
              itemAdded = true;
            }
          }

          if (!itemAdded) {
            itemInList.push([ingredientMaster.amount, ingredientMaster.unit]);
          }
        }
      }
    }

    console.log("shoppingList", groceryList);
  }

  handleInputChange(field, event) {
    event.preventDefault();
    if (field === "Quantity") {
      this.setState({
        formQuant: event.target.value
      });
    }
    if (field === "Units") {
      this.setState({
        formUnits: event.target.value
      });
    }
    if (field === "Ingredient") {
      this.setState({
        formIngred: event.target.value
      });
    }
  }

  toggleAdd(event) {
    event.preventDefault();
    this.setState({
      modalActive: !this.state.modalActive
    });
  }

  getEventRecipes(event, picker) {
    event.preventDefault();
    console.log(picker.startDate, picker.endDate);
    var dates = this.eventRangeDates(picker.startDate, picker.endDate);
    console.log("dates", dates, this.state.events);
    this.getRecipes(dates)
      .then(recipes => {
        console.log("recipes", recipes);
        var groceryList = {};
        this.parseList(recipes.data, groceryList);
        this.setState(
          {
            groceryList: groceryList
          },
          this.pushUpList
        );
      })
      .catch(error => {
        console.log("Error getting recipe:", error);
      });
    console.log(picker.startDate, picker.endDate);
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  }
  handleAddItem(event) {
    event.preventDefault();
    var newItems = this.state.addedItems.slice();
    newItems.push([
      this.state.formQuant,
      this.state.formUnits,
      this.state.formIngred
    ]);
    this.setState(
      {
        addedItems: newItems,
        formQuant: "",
        formUnits: "",
        formIngred: "",
        modalActive: !this.state.modalActive
      },
      this.pushUpList
    );
  }
  pushUpList() {
    var copy = JSON.parse(JSON.stringify(this.state.groceryList));
    this.state.addedItems.map((element, i) => {
      copy[element[2]] = [[element[0], element[1]]];
      this.state.addedItems[i] = [];
    });
    console.log("adjusted", copy);
    this.setState({
      groceryList: copy
    });
    Axios.put("/api/shoppinglist", {
      list: copy,
      username: JSON.parse(localStorage.profile).email
    })
      .then(created => {
        console.log(created);
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Shop</h1>
        <Panel className="shoppingPanel">
          <DateRangePicker
            onApply={this.getEventRecipes}
            startDate={moment()}
            endDate={moment()}
          >
            <DropdownButton
              title={`${this.state.startDate.format(
                "dddd, MMMM Do"
              )} - ${this.state.endDate.format("dddd, MMMM Do")}`}
            />
          </DateRangePicker>

          <Button
            style={{ float: "right" }}
            onClick={() => {
              this.setState({ groceryList: {} }, this.pushUpList);
            }}
          >
            Clear List
          </Button>
          <AddItemButtonAndPopup
            modalActive={this.state.modalActive}
            toggleAdd={this.toggleAdd.bind(this)}
            handleAddItem={this.handleAddItem.bind(this)}
            handleInputChange={this.handleInputChange.bind(this)}
            parent={this}
            quant={this.state.formQuant}
            units={this.state.formUnits}
            ingredient={this.state.formIngred}
          />
          <div>
            <GroceryList
              groceryList={this.state.groceryList}
              freq={this.state.freq}
              addedItems={this.state.addedItems}
            />
          </div>
          <div />
        </Panel>
      </div>
    );
  }
}

var GroceryList = ({ groceryList, freq, addedItems, parent }) => (
  <div>
    <Panel id="listPanel">
      <ul style={{ listStyleType: "none" }} className="checkbox-par">
        {Object.keys(groceryList).map(key => {
          var amount = "";

          if (groceryList[key].length > 1) {
            groceryList[key].map((element, i) => {
              console.log(element);
              amount +=
                " and " + groceryList[key][i][0] + " " + groceryList[key][i][1];
            });
            amount = amount.substring(5, amount.length);
          } else {
            amount = amount =
              groceryList[key][0][0] + " " + groceryList[key][0][1];
          }

          return (
            <li id={key} className="shop-list">
              <Checkbox style={{ marginTop: "0", paddingTop: "10px" }}>
                <div>{amount + " " + key}</div>
              </Checkbox>
            </li>
          );
        })}
      </ul>
    </Panel>
  </div>
);

var AddItemButtonAndPopup = ({
  modalActive,
  toggleAdd,
  handleAddItem,
  handleInputChange,
  parent,
  quant,
  units,
  ingredient
}) => (
  <div>
    <Button name="increase" value="+" onClick={toggleAdd}>
      +
    </Button>
    <div>
      {modalActive && (
        <Form style={{ textAlign: "center" }} onSubmit={handleAddItem}>
          <div>
            <h1>Add Item</h1>
            <input
              type="text"
              name="item"
              placeholder="Quantity"
              value={quant}
              onChange={handleInputChange.bind(parent, "Quantity")}
            />
            <input
              type="text"
              name="item"
              placeholder="Units"
              value={units}
              onChange={handleInputChange.bind(parent, "Units")}
            />
            <input
              type="text"
              name="item"
              placeholder="Ingredient"
              value={ingredient}
              onChange={handleInputChange.bind(parent, "Ingredient")}
            />
            <Button type="submit" value="Add">
              Add
            </Button>
          </div>
        </Form>
      )}
    </div>
  </div>
);
