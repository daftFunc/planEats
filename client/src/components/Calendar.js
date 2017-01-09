import React/*, {Component}*/ from 'react';
import {connectProfile} from '../auth';
// import {Link} from 'react-router';
import './Calendar.css';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
// import events from '../data/events.js';
import moment from 'moment';
import swal from 'sweetalert2';
import axios from 'axios';
import TimePicker from 'react-bootstrap-time-picker';


class Calendar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired //needed to push to the ScheduleMeal page without a <Link>
  }

  constructor() {
    super();
    this.state = {
      username: 'Brit', //TODO: update to get user's ID in location
      date: null,
      events: null,
      meals: null,
      inputs: null
    }
  }

  componentDidMount() {
    var context = this;

    axios.defaults.headers.username = this.state.username;

    axios.get('/api/events') //get user's events for calendars
      .then(function(events) {
        context.setState({
          events: events.data[0].Events
        }, function(){
          //TODO: fix this mess - db update needed?
          var timeHack = "2017-01-09T" + context.state.events[1].meal_time
          context.state.events[1].meal_time = timeHack;
        })
      })

    axios.get('/api/meals') //get user's recipes
      .then(function(meals) {
        var options = {}
        meals.data[0].Meals.map(function(obj){
          return options[obj.name] = obj.name
        })
        context.setState({
          inputs: options
        })
        // loop through and get their .name property
      })

    const {calendar} = this.refs;
    $(calendar).fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,agendaDay'
			},
      events: this.state.events,
      droppable: true,
      defaultTimedEventDuration: '01:00:00', //default length of event is an hour on the cal. can update this based on the total prep+cook time of each recipe in the meal
      drop: function() {
        console.log('dropped', this)
      },

      eventClick: function(calEvent, jsEvent, view){
        console.log(calEvent, jsEvent, view)
      },

      dayClick: function(calEvent, jsEvent, view) { //TODO: this is not a finished feature!

        swal({
          input: 'select',
          inputOptions: context.state.inputs,
          confirmButtonText: 'Add to Plan',
          inputValidator: function (mealClicked) {
            return new Promise(function (resolve, reject) {
              if (mealClicked) {
                resolve()
              } else {
                reject('Please select a meal for this date')
              }
            })
          }
        }).then(function(clickedMeal) {
          console.log(clickedMeal)
          swal.closeModal();
        });

        //get date clicked for plan
        var dateSelected = moment(calEvent._d).add(1, 'day').format('YYYY-MM-DD');

        // this.setState({date: dateSelected}, function(){
        //   this.context.router.push({
        //     pathname: '/schedule',
        //     state:{date: this.state.date}
        //   });
        // })
        // console.log(time)
        // var time = moment(calEvent._d).format('YYYY-MM-DD')
        /*
        to follow moment formatting, will need to add on the time they specifiy. if no time specified, it defaults to 12am.

        in meal pop-up, have user select time (24hr under the hood. will append to the date like so):
          date = date + 'T17:00:00'
        */
      }.bind(this)
    });
  }

  handleTimeChange(time) {
   this.convertTime(time);

   this.setState({
     date: this.state.date + 'T' + time
   });
  }

  convertTime(seconds) {
    var sec_num = parseInt(seconds, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  render() {
    return (
      <div ref="calendar"></div>
      // <div><TimePicker onChange={this.handleTimeChange}/></div>
    );
  }
};

export default connectProfile(Calendar);
