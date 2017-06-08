import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import App from "./components/app";
import LoginForm from "./components/login_form";
import SignupForm from "./components/signup_form";
import Dashboard from "./components/dashboard";
import requireAuth from "./components/require_auth";
import "./style/style.css";

const networkInterface = new createNetworkInterface({
  uri: "/graphql",
  opts: {
    credentials: "same-origin"
  }
});

const client = new ApolloClient({
  dataIdFromObject: obj => obj.id,
  networkInterface
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
