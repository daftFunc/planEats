import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {requireAuth} from '../auth';
import Site from './Site';
import Home from './Home';
import Login from './Login';
import Shop from './Shop';
import EditProfile from './EditProfile';
import Calendar from './Calendar';
import Schedule from './ScheduleMeal';
import Eat from './Eat.js';

class App extends Component {
  render() {
    return (

      <Router history={browserHistory}>

          <Route component={Site}>
          <Route path="/" component={Home} />
          <Route onEnter={requireAuth}>
            
            {/* Place all authenticated routes here */}
            <Route path="/shop" component={Shop}/>
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/eat" component={Eat} />
          </Route>
          <Route path="/login" component={Login} />
        </Route>

      </Router>

    );
  }
}

export default App;
