import { default as App } from './App'
import Room from './components/room'
import RoomSocket from './components/room-socket'
import { Route } from 'react-router'
import React from 'react'

const routes = (
  <div>
    <Route exact path='/' component={App} />
    <Route exact path='/room/:id' component={Room} />
    <Route exact path='/room-socket/:id' component={RoomSocket} />
  </div>
)
export default routes
