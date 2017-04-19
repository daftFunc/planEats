import React, {Component} from 'react';
// import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './ScheduleMeal.css'; //for optional CSS styling
import moment from 'moment';
import meals from '../data/savedMeals.js';
import {connectProfile/*, logout*/} from '../auth';

class Schedule extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired //needed to push to the ScheduleMeal page without a <Link>
  }

  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      focused: null,
      meals: meals,
      mealNames: [<option key="default" defaultValue>Select a Meal</option>],
      selectedMeal: {} //make the meal object to be saved in the db
    }
  }

  componentDidMount() {
    this.setState({date: this.props.location.state.date});
    this.populateSavedMeals();
  }

  populateSavedMeals() {
    this.state.meals.forEach((meal, i) =>
      this.state.mealNames.push(<option name={meal.name} key={i}>{meal.name}</option>)
    );
  }

  handleSubmit(val) {
    //save the data in the form
    //send update to db showing the date and the meal planned
    var value = document.getElementById('selectedMeal').value; //get selected item to add
    console.log('you selected', value);

    this.setState({selectedMeal: {
      name: value
    }}, function(){
      this.context.router.push({
        pathname: '/calendar',
        state:{newMeal: {
          title: value,
          allDay: false,
          start: this.state.date + "T12:00:00"
        }}
      });
    });
  }

  render() {
    return (
      <div className="schedule">
        <h4>{moment(this.props.location.state.date).format('MMMM Do[,] YYYY')}</h4>
        {/*after MVP, implement feature to select a date range here*/}
        <div className="saved">
          <select id="selectedMeal">
            {this.state.mealNames}
          </select>
          <br />
          <button onClick={this.handleSubmit.bind(this)}>Save Plan</button>
        </div>
      </div>
    );
  }
}

export default connectProfile(Schedule);
