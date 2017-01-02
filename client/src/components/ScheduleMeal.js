import React, {Component} from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './ScheduleMeal.css'; //for optional CSS styling
import moment from 'moment';

class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      focused: null
    }
  }

  componentDidMount() {
    console.log("PROPS", this.props.location.state.date)
  }

  render() {
    return (
      <div className="schedule">
        <h1>Planner</h1>
        <SingleDatePicker
          id="date_input"
          date={this.state.date}
          focused={this.state.focused}
          onDateChange={(date) => { this.setState({ date }); }}
          onFocusChange={({ focused }) => { this.setState({ focused }); }}
        />
      </div>
    );
  }
}

export default Schedule;
