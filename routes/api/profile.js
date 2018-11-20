const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @routes GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile Works'
}));

// @routes GET api/profile
// @desc   Get current user's profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @routes POST api/profile
// @desc   Create OR Edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  // Skills
  if(typeOf.req.body.skills !== 'undefined') {
    // Skills imports as a CSV and is separated by the commas (',') to create an array
    profileFields.skills = req.body.skills.split(',');
  };

  // Social - Social is an array of objects. Must initialize empty object to avoid errors
  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id })
    .then(profile) => {
      if(profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if(profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    }

  // // Education
  // profileFields.education = {};
  // if(req.body.school) profileFields.education.school = req.body.school;
  // if(req.body.degree) profileFields.education.degree = req.body.degree;
  // if(req.body.fieldofstudy) profileFields.education.fieldofstudy = req.body.fieldofstudy;
  // if(req.body.from) profileFields.education.from = req.body.from;
  // if(req.body.to) profileFields.education.to = req.body.to;
  // if(req.body.current) profileFields.education.current = req.body.current;
  // if(req.body.description) profileFields.education.description = req.body.description;
  //
  // // Experience
  // profileFields.experience = {};
  // if(req.body.title) profileFields.experience.title = req.body.title;
  // if(req.body.company) profileFields.experience.company = req.body.company;
  // if(req.body.location) profileFields.experience.location = req.body.location;
  // if(req.body.from) profileFields.experience.from = req.body.from;
  // if(req.body.to) profileFields.experience.to = req.body.to;
  // if(req.body.current) profileFields.experience.current = req.body.current;
  // if(req.body.description) profileFields.experience.description = req.body.description;


  if(req.body.handle) profileFields.handle = req.body.handle;
});

module.exports = router;
