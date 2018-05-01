// @flow
import React, { Fragment } from "react";
import { withState } from "recompose";
import { Query } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";

import { ME_QUERY } from "./data/queries";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";

import Loading from "./components/Loading";
import Nav from "./components/Nav";

const App = ({ token, setToken }: { token: String, setToken: Function }) => {
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Query query={ME_QUERY} fetchPolicy="network-only">
      {({ client, loading, error, data: { viewer } = {} }) => {
        const clearState = () => {
          localStorage.clear();
          client.resetStore();
          setToken(null);
        };

        if (error) {
          clearState();
          return <Login setToken={setToken} />;
        }

        if (loading) {
          return <Loading />;
        }

        if (viewer) {
          return (
            <Router>
              <Fragment>
                <Nav />
                <Dashboard />
              </Fragment>
            </Router>
          );
        }

        return <Login setToken={setToken} />;
      }}
    </Query>
  );
};

export default withState("token", "setToken", localStorage.getItem("token"))(
  App
);
