import React from 'react';
import {connectProfile} from '../auth';
import './Calendar.css';
import $ from 'jquery';
require('fullcalendar');
import moment from 'moment';
import { default as swal } from 'sweetalert2'
import axios from 'axios';
import time from '../data/timeConversion.js';

class CalendarSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      date: null,
      events: [],
      savedMeals: null,
      mealTime: null,
      mealName: null,
      selectedMealId: null,
      savedMealIds: null
    }
    this.checkAuth = this.checkAuth.bind(this);
    this.handleAuthResult = this.handleAuthResult.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.insertEvent = this.insertEvent.bind(this);
  }

  componentDidMount() {
    this.getEventsOnLoad();
    this.getMeals();
    // handleAuthClick();
  }

  // var CLIENT_ID = '998213442315-36am84caphfp5kve49oom63murreksr4.apps.googleusercontent.com';
  // var SCOPES = ["https://www.googleapis.com/auth/calendar"];

  checkAuth() {
    window.gapi.auth.authorize(
      {
        'client_id': '998213442315-36am84caphfp5kve49oom63murreksr4.apps.googleusercontent.com',
        'scope': ["https://www.googleapis.com/auth/calendar"].join(' '),
        'immediate': true
      }, this.handleAuthResult);
  }

  handleAuthResult(authResult) {
    // var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      // authorizeDiv.style.display = 'none';
      this.loadCalendarApi();
    } // else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      // authorizeDiv.style.display = 'inline';
    // }
  }

  handleAuthClick(event) {
    window.gapi.auth.authorize(
      {client_id: '998213442315-36am84caphfp5kve49oom63murreksr4.apps.googleusercontent.com', scope: ["https://www.googleapis.com/auth/calendar"], immediate: true},
      this.handleAuthResult);
    return true;
  }

  loadCalendarApi() {
    window.gapi.client.load('calendar', 'v3', this.insertEvent);
  }

  calendarSettings() {
    var context = this;
    const {calendar} = this.refs;
    $(calendar).fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,agendaDay'
      },
      events: context.state.events,
      editable: true,
      droppable: true,
      defaultTimedEventDuration: '01:00:00', //default length of event is an hour on the cal. can update this based on the total prep+cook time of each recipe in the meal
      eventDrop: function(event, delta, revertFunc, jsEvent, ui, view) {
        console.log('moved event: ', event, delta, revertFunc, jsEvent, ui, view);
      },

      eventClick: function(calEvent, jsEvent, view){
        var mealDate = moment(calEvent.start._d).add(1, 'day').format('MMMM Do[,] YYYY');
        swal({
          title: 'Meal for ' + mealDate + ':',
          text: calEvent.title,
          confirmButtonText: 'Back'
        })
      },

      dayClick: function(calEvent, jsEvent, view) {
        var dateSelected = moment(calEvent._d).add(1, 'day').format('MMMM Do');

        context.setState({
          date: moment(calEvent._d).add(1, 'day').format('YYYY-MM-DD')
        });

        swal.setDefaults({
          confirmButtonText: 'Select Meal Time &rarr;',
          showCancelButton: true,
          animation: false,
          progressSteps: ['1', '2']
        });

        var steps = [ //input options
          {
            title: 'Select a meal for ' + dateSelected + ':',
            input: 'select',
            inputOptions: context.state.savedMeals
          },
          {
            title: 'What time would you like to eat?',
            input: 'select',
            inputOptions: time //using half hour count
          }
        //   {
        //     title: 'Would you like to link your Google Calendar?',
        //     type: 'info',
        //     html: '<div id="authorize-div" style="display: none">' +
        //       '<span>Authorize access to Google Calendar API</span>' +
        //       '<button id="authorize-button" onclick="handleAuthClick(event)">Authorize</button>' +
        //     '</div>'
        //   }
        ];

        swal.queue(steps).then(function (result) {
          swal.resetDefaults()
          swal({
            title: 'All done!',
            html:
            '<pre> You want to have: ' +
            result[0] + ' at ' + time[result[1]] +
            '</pre>',
            confirmButtonText: 'Lovely!',
            showCancelButton: true,
            cancelButtonText: 'Add to Google Calendar',
            showCancelButton: true
          }).then(function() {
            //get user-selected data from fields
            context.setState({
              mealName: result[0], //name of the meal
              mealTime: result[1], //time selected for the meal
              selectedMealId: context.state.savedMealIds[result[0]]
            }, function(){
              // console.log(context.state);
              this.handleNewEvent();
            });
          }, function(dismiss) {
            if (dismiss === 'cancel') {
              context.handleAuthClick();
            }
          })
        }, function () {
          swal.resetDefaults();
        });

        /*
         var time = moment(calEvent._d).format('YYYY-MM-DD')
         to follow moment formatting, will need to add on the time they specifiy. if no time specified, it defaults to 12am.
         in meal pop-up, have user select time (24hr under the hood. will append to the date like so):
         date = date + 'T17:00:00'
         */
      }
    });
  }

  insertEvent() {
   var endTime = function (time) {
     var hours = time.slice(0,2);
     if (hours === '23') {
       hours = '00';
     } else {
       hours++;
     }
     return hours + time.slice(2);
   }
   var defaultEnd = endTime(this.state.mealTime);
   var request = window.gapi.client.calendar.events.insert({
     'calendarId': 'primary',
     'end': {'dateTime': this.state.date + 'T' + defaultEnd, 'timeZone': 'America/Los_Angeles'},
     'start': {'dateTime': this.state.date + 'T' + this.state.mealTime, 'timeZone': 'America/Los_Angeles'},
     'summary': this.state.mealName,
     'reminders': {
       'useDefault': false,
       'overrides': [{'method': 'popup', 'minutes': 30}]
     },
     'description': 'Enjoy your meal! - planEats',
     'visibility': 'private'
   });

   request.execute(function(event) {
     console.log('Event created: ' + event.htmlLink);
     // appendPre('Event created: ' + event.htmlLink);
   });
  }

  handleNewEvent() {
    var context = this;

    this.handleAuthClick();

    axios.defaults.headers.username = this.state.username;
    axios.post('/api/events', {
      username: this.state.username,
      title: this.state.mealName,
      start: this.state.date + 'T' + this.state.mealTime,
      meal_id: this.state.selectedMealId
    }).then(function() {
      const { calendar } = context.refs;
      $(calendar).fullCalendar('destroy');
      context.getEventsOnLoad();
    });
  }

  convertTime(secs) {
    var sec_num = parseInt(secs, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  getEventsOnLoad() {
    var context = this;

    axios.defaults.headers.username = context.state.username;

    axios.get('/api/events', {username: context.state.username})
      .then(function(events) {
        if (events) {
          // console.log('events', events.data[0].Events);
          var holder = []
          events.data[0].Events.forEach((val) => {
            holder.push(val)
          })
          context.setState({
            events: holder
          }, function(){
            // console.log('state set to: ', context.state.events);
            this.calendarSettings();
          })
        }
        else {
          this.calendarSettings();
        }
      });
  }

  getUpdatedEvents() {
    var context = this;

    axios.defaults.headers.username = context.state.username;

    axios.get('/api/events', {username: context.state.username})
      .then(function(events) {
        // console.log('events', events.data[0].Events);
        if (events) {
          var holder = []
          events.data[0].Events.forEach((val) => {
            holder.push(val)
          })
          context.setState({
            events: holder
          })
        }
      });
  }

  getMeals() {
    var context = this;

    axios.get('/api/meals')
      .then(function(meals) {
        var options = {}
        var ids = {}

        meals.data[0].Meals.map(function(obj){
          ids[obj.name] = obj.id
          return options[obj.name] = obj.name
        });
        context.setState({
          savedMeals: options,
          savedMealIds: ids
        });
      });
  }
  render() {
    return (
      <div ref="calendar"></div>
    );
  }
}

export default CalendarSettings;
