import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './Calendar.css';
import fullCalendar from 'fullcalendar';
import $ from 'jquery';
import events from '../data/events.js';
import moment from 'moment';

class Calendar extends React.Component {
  componentDidMount() {
    const {calendar} = this.refs;
    $(calendar).fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,agendaDay'
			},
      events: events,
      droppable: true,
      defaultTimedEventDuration: '01:00:00', //default length of event is an hour on the cal. can update this based on the total prep+cook time of each recipe in the meal
      drop: function() {
        console.log('dropped', this)
      },
      eventClick: function(calEvent, jsEvent, view){
        console.log(calEvent, jsEvent, view)
      },
      dayClick: function(calEvent, jsEvent, view) {
        //get date clicked for plan
        var time = moment(calEvent._d).format('YYYY-MM-DD')
        /*
        to follow moment formatting, will need to add on the time they specifiy. if no time specified, it defaults to 12am.

        in meal pop-up, have user select time (24hr under the hood. will append to the date like so):
          time = time + 'T17:00:00'
        */
      }
    });
  }

  render() {
    return (
      <div ref="calendar"></div>
    );
  }
};

export default Calendar;
