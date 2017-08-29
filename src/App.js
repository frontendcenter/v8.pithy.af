import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import Author from './components/Author'
import Work from './components/Work'
import Quote from './components/QuotePage'

export default () => (
  <Router>
    <div>
      <Nav/>
      <main>
        <Route exact path="/" component={Home}/>
        <Route path="/authors/*-:id" component={Author}/>
        <Route path="/works/*-:id" component={Work}/>
        <Route path="/quote/*-:id" component={Quote}/>
      </main>
    </div>
  </Router>
)
