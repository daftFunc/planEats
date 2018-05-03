import React, { Component, PropTypes } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connectProfile, logout } from "../auth";
import recipe from "./images/white_notebook.png";
import calendar from "./images/white_calendar.png";
import cart from "./images/white_shop.png";
import eat from "./images/white_cook.png";
import prof from "./images/white_prof.png";
import meals from "./images/white_meals.png";
import search from "./images/white_search.png";
import { Navbar } from "react-bootstrap";
import { Nav, Row, Col } from "react-bootstrap";
import Home from "./Home";
import Login from "./Login";
import Shop from "./Shop";
import EditProfile from "./EditProfile";
import Calendar from "./Calendar";
import Schedule from "./ScheduleMeal";
import Book from "./RecipeBook";
import Cook from "./Cook";
import MealPlanner from "./MealPlanner";
import RecipeSearch from "./RecipeSearch";
import RecipeSearchResult from "./RecipeSearchResult";
import NewRecipe from "./NewRecipe";
import Delivery from "./Delivery";
import AboutUs from "./AboutUs";
import logo from "./images/planEatsLogo.png";
import delivery from "./images/no_time.png";
import { requireAuth } from "../auth";

import "./Nav.css";

var history;
class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };
  constructor(props) {
    super(props);
    history = this.props.history;
    this.state = {
      width: window.innerWidth,
      isToggled: false
    };
  }

  componentDidMount() {
    var app = this;
    console.log("console", this);
    window.addEventListener("resize", function(event) {
      app.setState({
        width: window.innerWidth
      });
    });
  }
  render() {
    return (
      <div className="Site">
        {this.renderUserControls()}
        <div className="Site-page">
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/shop" render={passCmptToRequireAuth(Shop)} />
          <Route
            path="/profile/edit"
            render={passCmptToRequireAuth(EditProfile)}
          />
          <Route path="/calendar" render={passCmptToRequireAuth(Calendar)} />
          <Route path="/schedule" render={passCmptToRequireAuth(Schedule)} />
          <Route path="/recipe" render={passCmptToRequireAuth(Book)} />
          <Route path="/new-recipe" render={passCmptToRequireAuth(NewRecipe)} />
          <Route
            path="/recipeSearch"
            render={passCmptToRequireAuth(RecipeSearch)}
          />
          <Route
            path="/recipeSearchResult"
            render={passCmptToRequireAuth(RecipeSearchResult)}
          />
          <Route path="/meals" render={passCmptToRequireAuth(MealPlanner)} />
          <Route path="/eat" render={passCmptToRequireAuth(Cook)} />
          <Route path="/delivery" render={passCmptToRequireAuth(Delivery)} />
          <Route path="/aboutus" render={passCmptToRequireAuth(AboutUs)} />
        </div>
      </div>
    );
  }
  renderUserControls() {
    const { profile } = this.props;
    var path = this.props.location.pathname;
    if (profile) {
      return (
        <div>
          <Row id="desktop-header">
            <Col xs={1} md={1}>
              <Link to="/delivery">
                <img src={delivery} id="delivery-button" alt="delivery" />
              </Link>
            </Col>
            <Col xs={10} md={10}>
              <Link to="/">
                <img src={logo} id="desktop-header-logo" alt="logo" />
              </Link>
            </Col>
            <Col xs={1} md={1}>
              <Link to="/profile/edit">
                <img id="header-image" src={prof} alt="prof" />
              </Link>
            </Col>
          </Row>

          {!(path === "/" && this.state.width > 767) && (
            <Navbar
              onToggle={() => {
                this.setState({ isToggled: !this.state.isToggled });
              }}
              expanded={this.state.isToggled}
              id="Site-header-nav"
              inverse
            >
              <Navbar.Header className="menu-header">
                &nbsp;
                <Link to="/">
                  <img id="header-logo" src={logo} alt="Logo" />
                </Link>
                <Link to="/profile/edit">
                  <img id="header-image" src={prof} alt="prof" />
                </Link>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse className="contain-menu-drop">
                <Nav>
                  <Link
                    to="/calendar"
                    onClick={() => {
                      this.setState({ isToggled: false });
                    }}
                  >
                    <img
                      className="menu-item-drop"
                      src={calendar}
                      alt="Calendar"
                    />
                    <div className="space-fill">&nbsp;Plan</div>
                  </Link>
                  <Link
                    to="/meals"
                    onClick={() => {
                      this.setState({ isToggled: false });
                    }}
                  >
                    <img className="menu-item-drop" src={meals} alt="Meals" />
                    <div className="space-fill">&nbsp;Meals</div>
                  </Link>
                  <Link
                    to="/recipe"
                    onClick={() => {
                      this.setState({ isToggled: false });
                    }}
                  >
                    <img className="menu-item-drop" src={recipe} alt="recipe" />
                    <div className="space-fill">&nbsp;Recipes</div>
                  </Link>
                  <Link
                    to="/recipeSearch"
                    onClick={() => {
                      this.setState({ isToggled: false });
                    }}
                  >
                    <img className="menu-item-drop" src={search} alt="Shop" />
                    <div className="space-fill">&nbsp;Search</div>
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => {
                      this.setState({ isToggled: false });
                    }}
                  >
                    <img className="menu-item-drop" src={cart} alt="Shop" />
                    <div className="space-fill">&nbsp;Shop</div>
                  </Link>
                  <Link to="/eat">
                    <img className="menu-item-drop" src={eat} alt="Eat" />
                    <div className="space-fill right-sideOf">&nbsp;Cook</div>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          )}

          {/*{path==='/profile/edit'*/}
          {/*&& <img className="Site-profilePicture"*/}
          {/*src={profile.picture}*/}
          {/*alt={profile.nickname} />}*/}
          {/*<Link to="/profile/edit">{profile.nickname}</Link> &middot; <Link to="/calendar">Plan</Link> &middot; <Link to="/shop">Shop</Link> &middot; <a onClick={() => logout()}>Log Out</a>*/}
        </div>
      );
    } else {
      return (
        <div>
          <div id="desktop-header">
            {/*<img src={logo} alt="logo"/>*/}
            {/*<Link to="/profile/edit">*/}
            {/*<img id="header-image" src={prof} alt="prof"/>*/}
            {/*</Link>*/}
          </div>
          {!((path === "/" || path !== "/login") && this.state.width > 767) && (
            <Navbar
              className="Site-header Site-profileControls"
              inverse
              collapseOnSelect
            />
          )}
          <Link to="/">
            <img
              id="header-logo"
              src={logo}
              alt="Logo"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}
            />
          </Link>
        </div>
      );
    }
  }
}
export function getHistory() {
  return history;
}
var passCmptToRequireAuth = cmpt => {
  return props => {
    return requireAuth(props, cmpt);
  };
};
export default connectProfile(Site);
