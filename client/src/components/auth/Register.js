import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// "withRouter" will allows us to pass actions redirect ability "this.props.history"
// MUST wrap component name in "withRouter" when exported
// i.e. "export default withRouter(myComponent)"
import { withRouter } from 'react-router-dom';
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

  // Runs when component recieves new properties
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // Runs when an element with the "onChange" property is modified
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Runs when an element with the "onSubmit" property is submitted.
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Any action we bring in, we call through "props", where it's stored.
    // By passing "this.props.history" as second param, we can redirect from within...
    // the "registerUser" action (we normally can't use this redirect method in actions).
    this.props.registerUser(newUser, this.props.history);

  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

// Stores "auth" state from root reducer in a variable so it can be access later, like "this.props.auth.user"
const mapStateToProps = (state) => ({
  // state.auth comes from the root reducer (i.e. index.js within "reducers" dir)
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

/*
  NOTICE:
  When using Redux with a component, you must use connect to export the component:

    export default connect(firstParam, ObjToMapActions)(myComponentName)

------------------------------------------------------------------------------------

  Package: withRouter

  Steps to using withRouter:
  1. Import the package:

    import { withRouter } from 'react-router-dom';

  2. Wrap exported component in "withRouter"

    export default withRouter(myComponentName);

  3. When calling an action, pass "this.props.history" to give it redirect ability:

    this.props.myAction(firstParam, this.props.history)

  4. Now you can redirect from within the action file:

    export const registerUser = (userData, history) => dispatch => {
      axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }));
    };
*/
