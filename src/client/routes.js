import Home from './views/home'
import Room from './views/room'
import Welcome from './views/welcome'
import { Route } from 'react-router'
import React from 'react'

const routes = (
  <div>
    <Route exact path='/' component={Home} />
    <Route exact path='/welcome' component={Welcome} />
    <Route exact path='/room/:id' component={Room} />
  </div>
)
export default routes
