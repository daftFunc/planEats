import React from 'react';
import {connectProfile} from '../auth';
import './Calendar.css';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import moment from 'moment';
import { default as swal } from 'sweetalert2';
import axios from 'axios';
import time from '../data/timeConversion.js';

class Calendar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired //needed to push to the ScheduleMeal page without a <Link>
  }

  constructor() {
    super();
    this.state = {
      username: JSON.parse(localStorage.profile).email,
      date: null,
      events: null,
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
    var context = this;

    axios.defaults.headers.username = context.state.username;

    axios.get('/api/events', {username: context.state.username})
      .then(function(events) {
        console.log('events', events.data[0].Events);
        var holder = []
        events.data[0].Events.forEach((val) => {
          holder.push(val)
        })
        context.setState({
          events: holder
        }, function(){
          console.log('state set to: ', context.state.events);
          this.calendarSettings();
        })
      })

    axios.get('/api/meals')
      .then(function(meals) {
        var options = {}
        var ids = {}

        meals.data[0].Meals.map(function(obj){
          ids[obj.name] = obj.id
          return options[obj.name] = obj.name
        })
        context.setState({
          savedMeals: options,
          savedMealIds: ids
        })
      })

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
      droppable: true,
      defaultTimedEventDuration: '01:00:00', //default length of event is an hour on the cal. can update this based on the total prep+cook time of each recipe in the meal
      drop: function() {
        console.log('dropped', this);
      },

      eventClick: function(calEvent, jsEvent, view){
        $('.fc-unthemed').css({display:'none'}); //hide calendar

        var mealDate = moment(calEvent.start._d).format('MMMM Do[,] YYYY');
        swal({
          title: 'Meal for ' + mealDate + ':',
          text: calEvent.title,
          confirmButtonText: 'Back'
        }).then(function(){
          $('.fc-unthemed').css({display:'block'});
          $('.swal2-modal').css({display:'none'});
        })
      },

      dayClick: function(calEvent, jsEvent, view) {
        $('.fc-unthemed').css({display:'none'}); //hide calendar
        //get date clicked for plan
        var dateSelected = moment(calEvent._d).add(1, 'day').format('MMMM Do'); //BUG: full calendar registers the wrong day on click. needed to get the selected date.

        context.setState({
          date: moment(calEvent._d).format('YYYY-MM-DD')
        })

        swal.setDefaults({
          confirmButtonText: 'Select Meal Time &rarr;',
          showCancelButton: true,
          animation: false,
          // progressSteps: ['Plan', 'Schedule'] //TODO: progress steps not working, why?
        })

        var steps = [
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
        ]

        swal.queue(steps).then(function (result) {
          swal.resetDefaults()
          swal({
            title: 'All done!',
            html:
            '<pre> You want to have: ' +
            result[0] + ' at ' + time[result[1]] +
            '</pre>',
            confirmButtonText: 'Lovely!',
            showCancelButton: false
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

            $('.fc-unthemed').css({display:'block'});
            $('.swal2-modal').css({display:'none'});

            context.forceUpdate();
          })
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            //if cancel button is hit, exit the modal and display the calendar
            $('.fc-unthemed').css({display:'block'});
            $('.swal2-modal').css({display:'none'});
          }
          swal.resetDefaults()
        })

        /*
         var time = moment(calEvent._d).format('YYYY-MM-DD')
         to follow moment formatting, will need to add on the time they specifiy. if no time specified, it defaults to 12am.
         in meal pop-up, have user select time (24hr under the hood. will append to the date like so):
         date = date + 'T17:00:00'
         */
      }
    });
  }

  handleTimeChange(time) {
    this.convertTime(time);

    this.setState({
      date: this.state.date + 'T' + time
    });
  }

  insertEvent() {
    console.log('This is running');
    var request = window.gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'end': {'dateTime': '2016-01-13T19:0:00-07:00', 'timeZone': 'America/Los_Angeles'},
      'start': {'dateTime': '2016-01-13T18:00:00-07:00', 'timeZone': 'America/Los_Angeles'},
      'summary': 'Dinner',
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
      console.log('event sent!')
      context.forceUpdate()
    });
    // axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    //   'calendarId': 'primary',
    //     'end': {'dateTime': '2016-01-13T19:0:00-07:00', 'timeZone': 'America/Los_Angeles'},
    //     'start': {'dateTime': '2016-01-13T18:00:00-07:00', 'timeZone': 'America/Los_Angeles'},
    //     'summary': 'Dinner',
    //     'reminders': {
    //       'useDefault': false,
    //       'overrides': [{'method': 'popup', 'minutes': 30}]
    //     },
    //     'description': 'Enjoy your meal! - planEats',
    //     'visibility': 'private'
    // });

    // Google Calendar insert authorization
    // var CLIENT_ID = '998213442315-36am84caphfp5kve49oom63murreksr4.apps.googleusercontent.com';
    // var SCOPES = ["https://www.googleapis.com/auth/calendar"];

    // function checkAuth() {
    //   gapi.auth.authorize(
    //     {
    //       'client_id': CLIENT_ID,
    //       'scope': SCOPES.join(' '),
    //       'immediate': true
    //     }, handleAuthResult);
    // }

    // function handleAuthResult(authResult) {
    //   var authorizeDiv = document.getElementById('authorize-div');
    //   if (authResult && !authResult.error) {
    //     // Hide auth UI, then load client library.
    //     authorizeDiv.style.display = 'none';
    //     loadCalendarApi();
    //   } else {
    //     // Show auth UI, allowing the user to initiate authorization by
    //     // clicking authorize button.
    //     authorizeDiv.style.display = 'inline';
    //   }
    // }

    // function handleAuthClick(event) {
    //   gapi.auth.authorize(
    //     {client_id: CLIENT_ID, scope: SCOPES, immediate: true},
    //     handleAuthResult);
    //   return true;
    // }

    // function loadCalendarApi() {
    //   gapi.client.load('calendar', 'v3', insertEvent);
    // }

    // // Insert event into Google Calendar

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

  render() {
    return (
      <div ref="calendar"></div>
    );
  }
};

export default connectProfile(Calendar);