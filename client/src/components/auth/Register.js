import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import classnames from 'classnames';
// In order to use Redux with a component, import "connect" from 'react-redux'.
// Also, a contianer is a react component that'll work with Redux.
import { connect } from 'react-redux';
// Import the desired "action" to use with this component
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Any action we bring in, we call through "props", where it's stored.
    this.props.registerUser(newUser);

    // axios
    //   .post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));

  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        { user ? user.name : null }
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">

              <h1
                className="display-4 text-center">
                Sign Up
              </h1>
              <p
                className="lead text-center">
                Create your DevConnector account
              </p>

              <form noValidate onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.name})}
                    placeholder="Name"
                    name="name"
                    value={ this.state.name }
                    onChange={ this.onChange } />
                    {errors.name && (<div className="invalid-feedback">
                      {errors.name}
                    </div>)}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}
                    placeholder="Email Address"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.onChange } />
                    {errors.email && (<div className="invalid-feedback">
                      {errors.email}
                    </div>)}
                  <small
                    className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                    placeholder="Password"
                    name="password"
                    value={ this.state.password }
                    onChange={ this.onChange } />
                    {errors.password && (<div className="invalid-feedback">
                      {errors.password}
                    </div>)}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})}
                    placeholder="Confirm Password"
                    name="password2"
                    value={ this.state.password2 }
                    onChange={ this.onChange } />
                    {errors.password2 && (<div className="invalid-feedback">
                      {errors.password2}
                    </div>)}
                </div>

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4" />
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }

}

Register.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

// Stores "auth" state from root reducer in a variable so it can be access later, like "this.props.auth.user"
const mapStateToProps = (state) => ({
  // state.auth comes from the root reducer (i.e. index.js within "reducers" dir)
  auth: state.auth
});

/*
  NOTICE:
  When using Redux with a component, you must use connect to export the component:

    export default connect(firstParam, ObjToMapActions)(myComponentName)
*/

export default connect(mapStateToProps, { registerUser })(Register);
