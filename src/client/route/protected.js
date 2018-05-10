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
      const pathname = props.location.pathname
      const nextUrl = pathname && pathname !== '/'
        ? `/?next=${encodeURIComponent(pathname)}`
        : '/'
      return isAuthValid
        ? <Component {...props} routes={routes} />
        : <Redirect to={nextUrl} />
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
  return {
    isAuthValid: isAuthValid(state) || false
  }
}

const ProtectedRoute = withRouter(
  connect(mapStateToProps, null)(Protected)
)

export default ProtectedRoute
