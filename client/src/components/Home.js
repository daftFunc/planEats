import React, {Component} from 'react';
import {connectProfile} from '../auth';
import {Link} from 'react-router';
// import logo from './images/planEatsLogo.png'
import recipe from './images/white_notebook.png';
import calendar from './images/white_calendar.png';
import cart from './images/white_shop.png';
import eat from './images/white_cook.png';
import {login} from '../auth';

import './Home.css';

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };


  render() {

    const newToSite = {
      textAlign:'center',

    }

    return (
      <div>
      <style dangerouslySetInnerHTML={{
        __html:[
          'a:link {'+
          '   color:black;'+
          '}'+
          'a:visited {'+
          '   color:grey;'+
          '}'+
          'a:hover {'+
          '   color:grey;'+
          '}'
        ]
      }} />
        <div className="Home">
          <div style={newToSite}><Link to="/aboutus">New to PlanEats? Click here to get started</Link></div>
        </div>
        <div id="menu">
          <div className="menu-item top-left">
            <Link to="/calendar">
              <img src={calendar} className="menu-image" alt="Calendar"/>
            </Link>

          </div>
          <div className="menu-item top-right">
            <Link to="/recipe">
              <img src={recipe} className="menu-image" alt="Recipe"/>
            </Link>
          </div>
          <div className="menu-item bottom-left">
            <Link to="/shop">
              <img src={cart} className="menu-image" alt="Shop"/>
            </Link>
          </div>
          <div className="menu-item bottom-right">
            <Link to="/eat">
             <img src={eat} className="menu-image cook-pic" alt="Eat"/>
            </Link>
         </div><br />
          <div id="menu-text-span">
            <div className="menu-text planA">Plan</div>
            <div className="menu-text recipeA">Recipes</div>
            <div className="menu-text shopA">Shop</div>
            <div className="menu-text eatA">Cook</div>
          </div>
        </div>
        <div className="Login intro">
          {!this.props.profile ? <a className="Login-loginButton" onClick={() => login()}>Log In with Auth0</a> : <h3>Hello {this.props.profile.name}!</h3>}
        </div>
      </div>
    );
  }
}

export default connectProfile(Home);
