import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { LocationDescriptor } from 'history'
import { useAuth } from '../data/Auth'

export interface PrivateRouteProps extends RouteProps {
  redirect: LocationDescriptor
}

const PrivateRoute = React.memo(({ redirect, ...rest }: PrivateRouteProps) => {
  return useAuth().token ? <Route {...rest} /> : <Redirect to={redirect} />
})

export default PrivateRoute
