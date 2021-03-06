import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import mutation from '../mutations/Signup';
import Errors from './Errors';

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

class Signup extends Component {
  state = { username: '', email: '', password: '', errors: [], redirect: false };

  OnSignUp = e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    this.props
      .mutate({
        variables: { username, email, password }
      })
      .then(() => this.setState({redirect: true}))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/dashboard" />
    return (
      <Container className="container">
        <Row>
          <FormWrapper className="col-xs-4">
            <Errors errors={this.state.errors} />
            <Form className="form-signin">
              <h2>Registration</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email Address"
                  value={this.state.email}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Your password"
                  value={this.state.password}
                  onChange={this.handleInputChange.bind(this)}
                  required
                />
              </div>

              <button
                disabled={
                  !this.state.username ||
                  !this.state.email ||
                  !this.state.password
                }
                type="submit"
                className="btn btn-success"
                onClick={this.OnSignUp}
              >
                Sign Up
              </button>
            </Form>
            <hr />
            <p>Already have an account?</p>
            <Link to="/login">Sign in here</Link>
          </FormWrapper>
        </Row>
      </Container>
    );
  }
}

export default graphql(mutation)(withRouter(Signup));
