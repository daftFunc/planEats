import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';

import './Home.css';

class AboutUs extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };


  render() {

    var subheaderStyle = {
      textAlign:'center'
    }

    return (

      <div>
        <h1>About Us</h1>
        <p>Welcome to PlanEats, a platform for all your meal planning needs. PlanEats helps you plan your meals and keep track of your recipes.
          For starters we suggest you visit our 'Search' page to search for recipes that you can add to your recipe book or you can create one yourself on the recipe page. You may then create your meals using those recipes.
          You may then schedule your meals using our calendar platform on the 'Plan' page and populate your shopping list based on those meals on our 'Shop'. When your all ready to cook,
          you may go to the 'Cook' page which will provide you with ingredients and the cooking instructions for your next meal.

        </p>
      </div>
    );
  }
}

export default connectProfile(AboutUs);
