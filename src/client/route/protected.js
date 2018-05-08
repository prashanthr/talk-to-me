import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { isAuthValid } from '../redux/selectors/auth'

const Protected = ({ component: Component, exact = false, path, isAuthValid, routes = [] }) => (
  <Route
    exact={exact}
    path={path}
    render={props => {
      return isAuthValid
        ? <Component {...props} routes={routes} />
        : <Redirect to={'/'} />
    }}
  />
)

Protected.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  isAuthValid: PropTypes.bool.isRequired,
  routes: PropTypes.array,
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  console.log('isAuthValid', isAuthValid(state), isAuthValid(state) || false)
  return ({
    isAuthValid: isAuthValid(state) || false
  })
}

const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
)

export default ProtectedRoute
