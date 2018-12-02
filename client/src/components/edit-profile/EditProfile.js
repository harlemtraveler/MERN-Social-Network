import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

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
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    // Check if "profile" has come in from state
    // Prefill fields with existing data if profile Obj. true
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring Skills array bacl as CSV
      const skillsCSV = profile.skills.join(',');

      // If profile field doesn't exist, make empty string
      // [!] MUST be done for every field
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      // Check social accounts Object
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      // Check individual social accounts (each is a string property of the social Obj.)
      profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
      profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    }

    // Get form contents, call "createProfile" endpoint to create/update profile
    this.props.createProfile(profileData, this.props.history);
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
      );
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
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb">* = required fields</small>

              <form onSubmit={ this.onSubmit }>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={ this.state.handle }
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
                    type="button"
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));

/*
  What's Happening in this Component?
  -----------------------------------

  1. "Profile" is fetched in the "componentDidMount()" lifecycle method via the "getCurrentProfile()" function.

  2. The fetched "Profile" is then mapped to the "profile" prop via the "mapStateToProps()" method (...enables us to access the data via props).

  3. The step prior triggers the "componentWillReceiveProps()" lifecycle method:

  4. The logic within "componentWillReceiveProps()" checks for the profile data.

  5. If data exists, it will be assigned as a value to a variable named "profile" (so we can access all fields).

  6. Convert the "Skills" array back to a string (...as a CSV).

  7. Check all fields. If empty, return empty string (...or empty Object for Skills, Edu, & Exp arrays) in corresponding field, else return the value.

  8. Set the state of each field to the values determined in the step prior.
*/
