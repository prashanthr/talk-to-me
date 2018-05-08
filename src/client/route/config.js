import React from 'react'
import Home from '../views/home'
import Room from '../views/room'
import Welcome from '../views/welcome'
import ProtectedRoute from './protected'
import PublicRoute from './public'
import { Switch, Redirect } from 'react-router-dom'

const routes = (
  <Switch>
    <PublicRoute exact path='/' component={Home} />
    <ProtectedRoute exact path='/welcome' component={Welcome} />
    <ProtectedRoute path='/room/:id' component={Room} />
    <Redirect exact from='/room' to='/' />
    <Redirect from='/home' to='/' />
  </Switch>
)

export default routes
