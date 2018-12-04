import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {

  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              // We're able to fetch "user" & "avatar" from the "profile" object by using
              // the ".populate()" method within a route on the back-end server.
              // The ".populate()" method is from the "mongoose" library pkg.
              src={ profile.user.avatar }
              alt="user's avatar"
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{ profile.user.name }</h3>
            {/* Test if "company" field has a value in below <p /> tag: */}
            <p>
              { profile.status } { isEmpty(profile.company) ? null : <span>at { profile.company }</span> }
            </p>
            <p>
              { isEmpty(profile.location) ? null : <span>{ profile.location }</span> }
            </p>
            <Link to={ `/profile/${profile.handle}` } className="btn btn-info">
              View Profile
            </Link>
          </div>
          {/* If device screen is smaller than medium, skills won't display */}
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {/* Only grabs & displays the first 4 skills from skills array */}
              { profile.skills.slice(0, 4).map((skill, index) => (
                <li key={ index } className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  { skill }
                </li>
              )) }
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;
