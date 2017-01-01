import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './Calendar.css';
import fullCalendar from 'fullcalendar';
import $ from 'jquery';
import events from '../data/events.js';

class Calendar extends React.Component {
  componentDidMount() {
    const {calendar} = this.refs;
    $(calendar).fullCalendar({
      header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
      events: events,
      droppable: true,
      defaultTimedEventDuration: '01:00:00', //default length of event is an hour on the cal. can update this based on the total prep+cook time of each recipe in the meal
      drop: function() {
        console.log('dropped', this)
      },
      eventClick: function(calEvent, jsEvent, view){
        console.log(calEvent, jsEvent, view)
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
