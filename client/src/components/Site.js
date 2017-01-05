import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connectProfile, logout} from '../auth';
import recipe from './images/white_notebook.png';
import calendar from './images/white_calendar.png';
import cart from './images/white_shop.png';
import eat from './images/white_cook.png';
import prof from './images/white_prof.png';
import {MenuItem} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';


import './Site.css';


class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };

  render() {
    return (
      <div className="Site">
          {this.renderUserControls()}
        <div className="Site-page">
          {this.props.children}
        </div>
      </div>
    );
  }

  renderUserControls() {
    const {profile} = this.props;
    var path=this.props.location.pathname;
    if (profile) {
      return (
       <div>

         <Navbar className="Site-header Site-profileControls" inverse collapseOnSelect>
           <Navbar.Header>
             <Link to="/profile/edit">
            <img id="header-image" src={prof} />
             </Link>
           <Navbar.Toggle />
           </Navbar.Header>

           <Navbar.Collapse>
             <Nav className="row">
              <Link to="/calendar">
               <img className="col-md-1" src={calendar} />
              </Link>
              <Link to="/recipe">
               <img className="col-md-1" src={recipe} />
              </Link>
              <Link to="/shop">
                <img className="col-md-1" src={cart} />
              </Link>
               <Link to="/eat">
                <img className="col-md-1" src={eat} />
               </Link>
             </Nav>
           </Navbar.Collapse>

         </Navbar>


          {/*{path==='/profile/edit'*/}
            {/*&& <img className="Site-profilePicture"*/}
                    {/*src={profile.picture}*/}
                    {/*alt={profile.nickname} />}*/}
          {/*<Link to="/profile/edit">{profile.nickname}</Link> &middot; <Link to="/calendar">Plan</Link> &middot; <Link to="/shop">Shop</Link> &middot; <a onClick={() => logout()}>Log Out</a>*/}

          </div>
      );
    } else {
      return (
        <div className="Site-profileControls">
          <span>Guest</span> &middot; <Link to="/login">Log In</Link>
        </div>
      );
    }
  }
}

export default connectProfile(Site);
