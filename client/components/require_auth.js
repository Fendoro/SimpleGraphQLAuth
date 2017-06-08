import React, { Component } from "react";
import { hashHistory } from "react-router";
import { graphql } from "react-apollo";
import query from "../queries/current_user";

export default (ComposedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            const { loading, user } = nextProps.data;
            if (!(loading || user)) {
                hashHistory.push("/login");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    return graphql(query)(RequireAuth);
};