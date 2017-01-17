import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
import './Delivery.css';
import { /*FieldGroup, FormGroup, HelpBlock, ControlLabel, FormControl, Button, Checkbox, Radio */} from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      searchValue: null
    }
  }

  componentDidMount() {
    console.log('1', this.state.restaurants);
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();
    // console.log('Input', this.state.searchValue);
    axios.get('/api/searchRestaurants')
      .then(res => {
        this.setState({restaurants: res.data.restaurants})
        console.log('2', this.state.restaurants);
      });
    // 5628 Sabetha Way Plano TX
    // 5628+Sabetha+Way+Plano+TX
  }

  render() {
    return (
      <div classname='deliveryContainer'>
        <div>
          <div id='delivery'>
            <h1>No worries!</h1>
            <h4>Find a restaurant</h4>
          </div>
        </div>
        <form id='delivery' onSubmit={this.handleSearch.bind(this)}>
          <input id='form' type='text' placeholder='Input address ex. 1600 Pennsylvania Ave, Washington, DC' onChange={this.handleChange.bind(this)}></input>
          <input id='button' type='submit' value='Search' onSubmit={this.handleSearch.bind(this)}></input>
        </form>
        <div id='delivery'>
          <h4>Food near you</h4>
          {this.state.restaurants.map((restaurant) => {
            return (
              <div>
                <li>{restaurant.name}</li>
              </div>
              );
          })}
        </div>
      </div>
    )
  }
}

export default connectProfile(Delivery);
