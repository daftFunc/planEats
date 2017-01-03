import React, {Component} from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './ScheduleMeal.css'; //for optional CSS styling
import moment from 'moment';
import meals from '../data/savedMeals.js';
import {connectProfile, logout} from '../auth';

class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      focused: null,
      meals: meals,
      mealNames: [<option defaultValue>Select a Meal</option>]
    }
  }

  componentDidMount() {
    console.log("PROPS", this.props.location.state.date);
    console.log(this.state.meals)
    this.populateSavedMeals();
  }

  populateSavedMeals() {
    this.state.meals.forEach((meal) =>
      this.state.mealNames.push(<option>{meal.name}</option>)
    );
    return this.state.mealNames;
  }

  handleSubmit() {
    //save the data in the form
    //send update to db showing the date and the meal planned
  }

  render() {
    return (
      <div className="schedule">
        <h4>{moment(this.props.location.state.date).format('MMMM Do[,] YYYY')}</h4>
        {/*after MVP, implement feature to select a date range here*/}
        <div className="saved">
          <select>
            {this.populateSavedMeals()}
          </select>
          <br />
          <button onClick={this.handleSubmit.bind(this)}>Save Plan</button>
        </div>
      </div>
    );
  }
}

export default connectProfile(Schedule);
