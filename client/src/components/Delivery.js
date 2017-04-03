import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router-dom';
import './Delivery.css';
import { /*FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, Button, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import 'react-select/dist/react-select.css';
import { FormControl, Button } from 'react-bootstrap';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      searchValue: null
    }
  }

  componentDidMount() {
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();
    // console.log('Input', this.state.searchValue);
    axios.post('/api/searchRestaurants', {
      location: this.state.searchValue.split(' ').join('+')
    })
      .then(res => {
        this.setState({restaurants: res.data.restaurants})
      });
  }

  findDay() {
    var week = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    var today = new Date(Date.now());
    return week[today.getDay()];
  }

  render() {
    return (
      <div id='deliveryContainer'>
        <div>
          <div>
            <h1>No time? No worries!</h1>
            <h4>Search for restaurants near you</h4>
          </div>
        </div>
        <form id='delivery' onSubmit={this.handleSearch.bind(this)}>
          <input id='form' type='text' placeholder='Input address ex. 944 Market Street, San Franciso, CA' onChange={this.handleChange.bind(this)}></input>
          <Button type='submit' onSubmit={this.handleSearch.bind(this)}>Search</Button>
        </form>
        <div id='delivery'>
          {this.state.restaurants.map((restaurant) => {
            return (
              <div>
                  <img src={restaurant.logoUrl} width='150' height='150'></img>
                  <li>{restaurant.name}</li>
                  <a href={restaurant.url}>View on EatStreet!</a>
                  <li>Hours Today: {restaurant.hours[this.findDay()]}</li>
                  <li>{restaurant.streetAddress}</li>
                  <li>{restaurant.phone}</li>
                  <hr></hr>
              </div>
              );
          })}
        </div>
      </div>
    )
  }
}

export default connectProfile(Delivery);
