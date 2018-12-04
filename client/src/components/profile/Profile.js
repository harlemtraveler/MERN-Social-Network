import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Actions
import { getProfileByHandle } from '../../actions/profileActions';

// Components
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';


class Profile extends Component {
  componentDidMount() {
    // Check and obtain specified prop from the active/current route (...the URL)
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {/* Redux NOT required, just pass data from this component to sub-component */}
          <ProfileHeader profile={ profile } />
          <ProfileAbout />
          <ProfileCreds />
          <ProfileGithub />
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              { profileContent }
            </div>
          </div>
        </div>
      </div>
    );
  }

}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
