import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";
import AuthForm from "./auth_form";
import mutation from "../mutations/login";
import query from "../queries/current_user";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user &&
            nextProps.data.user) {
            hashHistory.push("/dashboard");
        }
    }

    formSubmit({ email, password }) {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{ query }]
        })
            .then(() => {
                this.setState({
                    errors: []
                });
            })
            .catch(response => {
                const errors = response.graphQLErrors
                    .map(error => error.message);
                this.setState({ errors });
            });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.formSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);