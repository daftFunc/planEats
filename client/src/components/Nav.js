import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connectProfile, logout} from '../auth';
import recipe from './images/white_notebook.png';
import calendar from './images/white_calendar.png';
import cart from './images/white_shop.png';
import eat from './images/white_cook.png';
import prof from './images/white_prof.png';
import meals from './images/white_meals.png';
import search from './images/white_search.png';
import {Navbar, Nav, Row, Col, Image} from 'react-bootstrap';
import logo from './images/planEatsLogo.png';
import delivery from './images/no_time.png';
import './Nav.css';


class Site extends Component {
  static propTypes = {
    ...connectProfile.PropTypes,
    children: PropTypes.any
  };
  constructor(){
    super();
    this.state = {
      width:window.innerWidth,
      isToggled:false
    }
  }

  componentDidMount () {
    var app = this;
    window.addEventListener("resize", function(event) {
      app.setState({
        width:window.innerWidth
      })
    })
  }
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
  toggeleDrop
  renderUserControls() {
    const {profile} = this.props;
    var path=this.props.location.pathname;
    if (profile) {
      return (
        <div>
         <Row>
            <Col xs={1} md={1}>
              <Link to ='/delivery'>
                <img src={delivery} id='delivery-button' alt='delivery'/>
              </Link>
            </Col>
            <Col xs={10} md={10}>
              <Link to='/'>
                <img src={logo} id="desktop-header-logo" alt="logo" />
              </Link>
           </Col>
           <Col xs={1} md={1}>
            <Link to="/profile/edit">
              <img id="header-image" src={prof} alt="prof"/>
            </Link>
           </Col>
         </Row>

          {!(path === '/' && this.state.width>767) && (<Navbar onToggle={()=>{this.setState({isToggled:!this.state.isToggled})}} expanded={this.state.isToggled} id="Site-header-nav"
                                                               inverse >

            <Navbar.Header className="menu-header">
              &nbsp;
              <Link to="/">
                <img id="header-logo" src={logo} alt="Logo" />
              </Link>
              <Link to="/profile/edit">
                <img id="header-image" src={prof} alt="prof"/>
              </Link>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse >
              <Nav>
                <Row style={{display:"flex",justifyContent:"space-around"}}>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/calendar" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image responsive className="menu-item-drop" src={calendar} alt="Calendar"/>
                      <div className="menu-head">&nbsp;Plan</div>
                    </Link>
                  </Col>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/meals" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image responsive  className="menu-item-drop" src={meals} alt="Meals"/>
                      <div className="menu-head">&nbsp;Meals</div>
                    </Link>
                  </Col>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/recipe" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image className="menu-item-drop" src={recipe} alt="recipe"/>
                      <div className="menu-head">&nbsp;Recipes</div>
                    </Link>
                  </Col>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/recipeSearch" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image responsive   className="menu-item-drop" src={search} alt="Recipe Search"/>
                      <div className="menu-head">&nbsp;Search</div>
                    </Link>
                  </Col>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/shop" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image responsive   className="menu-item-drop" src={cart} alt="Shop"/>
                      <div className="menu-head">&nbsp;Shop</div>
                    </Link>
                  </Col>
                  <Col className="contain-menu-drop" xs={2} md={2}>
                    <Link to="/eat" onClick={()=>{this.setState({isToggled:false})}}>
                      <Image responsive   className="menu-item-drop" src={eat} alt="Eat"/>
                      <div className="menu-head">&nbsp;Cook</div>
                    </Link>
                  </Col>
                </Row>
              </Nav>
            </Navbar.Collapse>
          </Navbar>)}


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
          {!((path ==="/" || path !== '/login') && this.state.width>767) && (<Navbar className="Site-header Site-profileControls" inverse collapseOnSelect>

          </Navbar>)}
          <Link to="/">
            <img id="header-logo" src={logo} alt="Logo" style={{marginLeft:'auto' ,marginRight:"auto",display:'block'}}/>
          </Link>
        </div>
      );
    }
  }
}

export default connectProfile(Site);