const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation - Profile | Experience
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load Models - Profile | User
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @routes GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({
  msg: '[+] Profile Works'
}));

// @routes GET api/profile
// @desc   Get current user's profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    // populate() fetches specific fields from the Model's Schema via the "ref" name:
    // the promise will only return the field's "id" by default
    // Can specify multiple fields by invoking them within an array
    // Syntax: .populate('ref', ['field1', field2])
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = '[!] There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @routes GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
  .populate('user', ['name', 'avatar'])
  .then(profiles => {
    if(!profiles) {
      errors.noprofile = '[!] There are no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles);
  })
  .catch(err => res.status(404).json({ profiles: '[!] There is no profiles' }));
})

// @routes GET api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  // req.params.handle fetches the param passed in place of ":handle" in GET req. route
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = '[!] There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @routes GET api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get('/user/:user_id', (req, res) => {
  // req.params.handle fetches the param passed in place of ":handle" in GET req. route
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = '[!] There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: '[!] There is no profile for this user' }));
});

// @routes POST api/profile
// @desc   Create OR Edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateProfileInput(req.body);

  // Check validation - (done at the beginning of any validation process)
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

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
  if(typeof(req.body.skills) !== 'undefined') {
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
    .then(profile => {
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
            errors.handle = '[!] That handle already exists';
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })

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

});

// @routes POST api/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to experience array
      // .unshift() adds the data to the front of the array
      profile.experience.unshift(newExp);

      // Returns the current authenticated user's profile with the new "experience" object
      profile.save().then(profile => res.json(profile));
    })
});

// @routes POST api/profile/education
// @desc   Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }

      // Add to education array
      // .unshift() adds the data to the front of the array
      profile.education.unshift(newEdu);

      // Returns the current authenticated user's profile with the new "education" object
      profile.save().then(profile => res.json(profile));
    })
});

// @routes DELETE api/profile/experience/:exp_id
// @desc   Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Splice out of array
    profile.experience.splice(removeIndex, 1);

    // Save
    profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
});

// @routes DELETE api/profile/education/:edu_id
// @desc   Delete education from profile
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // Splice out of array
    profile.education.splice(removeIndex, 1);

    // Save
    profile.save().then(profile => res.json(profile));
  })
  .catch(err => res.status(404).json(err));
});

// @routes DELETE api/profile
// @desc   Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      // We're passing "_id" to match the "id" rather than the "user"
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }));
    });
});

module.exports = router;
