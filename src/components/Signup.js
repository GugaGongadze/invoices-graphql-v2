import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import mutation from '../mutations/Signup';

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
  constructor(props) {
    super(props);

    this.state = { username: '', email: '', password: '' };
  }

  OnSignUp(e) {
    e.preventDefault();

    const { username, email, password } = this.state;

    this.props
      .mutate({
        variables: { username, email, password }
      })
      .then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <Container className="container">
        <Row>
          <FormWrapper className="col-xs-4">
            <Form className="form-signin">
              <h2>Registration Form</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={e =>
                    this.setState({
                      username: e.target.value
                    })
                  }
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
                  onChange={e =>
                    this.setState({
                      email: e.target.value
                    })
                  }
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
                  onChange={e =>
                    this.setState({
                      password: e.target.value
                    })
                  }
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
                onClick={this.OnSignUp.bind(this)}
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
