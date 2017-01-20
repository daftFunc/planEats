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
        <p>Welcome to PlanEats, a platform for all your meal-planning needs. PlanEats helps you plan your meals and keep track of your recipes.
        </p>
        <p>
          For starters, we suggest you visit our <strong>Search</strong> page, where you can search for recipes to add to your recipe book, or you can create one yourself on our <strong>Recipes</strong> page. Once you've added recipes to your recipe book, you can create meals with those recipes on the <strong>Meals</strong> page.
        </p>
        <p>
          You can then schedule your meals using our calendar platform on the <strong>Plan</strong> page and populate your shopping list based on those meals on the <strong>Shop</strong> page. When you're all ready to cook,
          you can go to the <strong>Cook</strong> page which will provide you with ingredients and the cooking instructions for your next meal.

        </p>
      </div>
    );
  }
}

export default connectProfile(AboutUs);
