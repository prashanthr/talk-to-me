import { default as App } from './App'
import Room from './components/room'
import { Route } from 'react-router'
import React from 'react'

const routes = (
  <div>
    <Route exact path='/' component={App} />
    <Route exact path='/room/:id' component={Room} />
  </div>
)
export default routes
