import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Errors from './Errors';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Login';

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 340px;
  margin: 50px auto;
  text-align: center;
`;

const Form = styled.form`
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 20px 30px 30px 30px;
`;

class Login extends Component {
  state = { username: '', password: '', errors: [], redirect: false };

  onLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    this.props
      .mutate({
        variables: { username, password },
        refetchQueries: [{
          query
        }
        ]
      })
      .then(() => this.setState({redirect: true}))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/dashboard" />;

    return (
      <Container className="container">
        <Row class="row">
          <FormWrapper className="col-xs-4">
            <Errors errors={this.state.errors} />
            <Form className="form-signin">
              <h2>Please Login</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </div>

              <button
                disabled={!this.state.username || !this.state.password}
                type="submit"
                className="btn btn-success btn-block"
                onClick={this.onLogin}
              >
                Log In
              </button>
            </Form>
            <hr />
            <Link to="/signup">Create an Account</Link>
          </FormWrapper>
        </Row>
      </Container>
    );
  }
}

export default compose(
  graphql(query),
  graphql(mutation)
)(withRouter(Login));
