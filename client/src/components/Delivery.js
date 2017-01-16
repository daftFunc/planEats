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
      restaurants: null,
      searchValue: null
    }
  }

  componentDidMount() {
    // axios.defaults.headers.username = this.state.username;
    // var config = {
    //   headers: {'X-Access-Token': 'cc02e93d4e63df1f', 'Accept': 'application/JSON'}
    // };

    // window.ESApi.searchRestaurants({ 'street-address': '316 W. Washington Ave. Madison, WI' }, function(response) {
    //     var address = response.address;
    //     var restaurants = response.restaurants;
    //     console.log(address, restaurants);
    // });

    // axios.get(`https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=5628+Sabetha+Way+Plano+TX?access-token={2b88de533594293f}`);
    // , {
    //   headers: {'X-Access-Token': '2b88de533594293f', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': 'X-Access-Token'}
    // }
    // var url = 'https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&street-address=5628+Sabetha+Way+Plano+TX';
    // fetch(url, {
    //   method: 'GET',
    //   headers: {'X-Access-Token': 'cc02e93d4e63df1f', 'Access-Control-Allow-Origin': '*', 'Access-Control-Expose-Headers': 'X-Access-Token'}
    // })
    //   .then(function(res) {
    //     console.log(res);
    //     // return res.json();
    //   })
    //   .then(function(data) {
    //     console.log(data);
    //   });
    //   .then(function(res) {
    //     console.log(res);
        // this.setState({
        //   restaurants: res.data.restaurants
        // });
      // })
    //   .catch(function(err) {
    //     console.log(err);
    //   })
  }

  handleSearch(e) {
    e.preventDefault();
  //   var config = {
  //     headers: {'X-Access-Token': 'cc02e93d4e63df1f'}
  //   };
  //   axios.get('https://api.eatstreet.com/publicapi/v1/restaurant/search', config);
    //   .then(function(res) {
    //     console.log(res);
    //     this.setState({
    //       restaurants: res.data.restaurants
    //     });
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   })
        window.ESApi.searchRestaurants({ 'street-address': '316 W. Washington Ave. Madison, WI' }, function(response) {
        var address = response.address;
        var restaurants = response.restaurants;
        console.log(address, restaurants);
    });
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
          <input id='form' type='text' placeholder='Input address ex. 1600 Pennsylvania Ave, Washington, DC'></input>
          <input id='button' type='submit' value='Search'></input>
        </form>
        <div id='delivery'>
          <h4>Food near you</h4>
          {this.state.restaurants}
        </div>
      </div>
    )
  }
}

export default connectProfile(Delivery);
