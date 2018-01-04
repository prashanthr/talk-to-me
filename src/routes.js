import { default as App } from './App'
import { Route } from 'react-router'
import React from 'react'
const routes = (
  <div>
    <Route exact path='/' component={App} />
  </div>
)
export default routes
