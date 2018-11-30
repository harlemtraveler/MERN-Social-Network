import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log("submit")
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    // Initialize "displaySocialInputs" for use in component
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={ this.state.twitter }
            onChange={ this.onChange }
            error={ errors.twitter }
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={ this.state.facebook }
            onChange={ this.onChange }
            error={ errors.facebook }
          />
          <InputGroup
            placeholder="LinkedIn profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={ this.state.linkedin }
            onChange={ this.onChange }
            error={ errors.linkedin }
          />
          <InputGroup
            placeholder="YouTube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={ this.state.youtube }
            onChange={ this.onChange }
            error={ errors.youtube }
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={ this.state.instagram }
            onChange={ this.onChange }
            error={ errors.instagram }
          />
        </div>
      )
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'DevOps Engineer', value: 'DevOps Engineer' },
      { label: 'Network Engineer', value: 'Network Engineer' },
      { label: 'Penetration Tester', value: 'Penetration Tester' },
      { label: 'Security Engineer', value: 'Security Engineer' },
      { label: 'Solutions Architect', value: 'Solutions Architect' },
      { label: 'Project Manager', value: 'Project Manager' },
      { label: 'Student', value: 'Student' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out.
              </p>
              <small className="d-block pb">* = required fields</small>

              <form onSubmit={ this.onSubmit }>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={ this.state.value }
                  onChange={ this.onChange }
                  error={ errors.handle }
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={ this.state.status }
                  onChange={ this.onChange }
                  options={ options }
                  error={ errors.status }
                  info="Gives us an idea of where you're at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={ this.state.company }
                  onChange={ this.onChange }
                  error={ errors.company }
                  info="This could be your own company or one that you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={ this.state.website }
                  onChange={ this.onChange }
                  error={ errors.website }
                  info="Your own personal website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={ this.state.location }
                  onChange={ this.onChange }
                  error={ errors.location }
                  info="City or city & state... suggested (eg. Bronx, NY)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={ this.state.skills }
                  onChange={ this.onChange }
                  error={ errors.skills }
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={ this.state.githubusername }
                  onChange={ this.onChange }
                  error={ errors.githubusername }
                  info="If you want your latest repositories and a Github link, provide your Github username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={ this.state.bio }
                  onChange={ this.onChange }
                  error={ errors.bio }
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                { socialInputs }
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"/>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }

}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
