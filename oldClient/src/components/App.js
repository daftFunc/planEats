import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Nav from './Nav'
require('dotenv').config()

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route component={Nav} />
      </BrowserRouter>

    )
  }
}

export default App
