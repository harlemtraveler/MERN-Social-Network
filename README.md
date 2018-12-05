---
Title: MERN Social Media Application
Author: Mr. Robot
Date: December 4, 2018
---

# MERN Social Media Application

This is a social media application that provides users the fundamental functionality the makes up the foundation of many of the social media applications available today. Users can create profiles, make posts, and comment & like each other's posts.

Beyond the usual __ToDo__ projects that proliferate repositories across the globe, users can personalize their profiles by integrating third-party social apps, integrate an avatar via Gravatar, list prior education and experience, provide detailed descriptions of yourself, and link their Github account to share with the rest of the this application's community.

Authentication is integrated into the app, but what makes this feature stand out is that it was created from scratch using Node.js and minimal dependencies (No turn-key auth services here!).

This project was created with the guidance of a tutorial, which will be linked to below. The purpose of this project is to provide a refresher on the MERN stack, which is one of my personal favorites. However, I'll be using the architecture employed here to create a particular project of my own. Once this personal project is complete, it will be listed below for anyone to take a look.

### Tutorial
**Course:** [MERN Stack Front To Back: Full Stack React, Redux & Node.js](https://www.udemy.com/mern-stack-front-to-back "A Udemy Course")
**Instructor:** Brad Traversy
**Duration:** 16.5 hours on-demand video
**Skill level:** Intermediate Level
**Students:** 13,224
**Languages:** English
**Lectures:** 78

### Personal Project
**__COMING SOON!__**

## Getting Started

To download this application locally to your device, see the **__Installing__** section below.

### Prerequisites

To run this project, you'll need a few programs already installed.
* React
* Create React App
* Node.js
* NPM package manager
* And Mongo Community Edition (if running the DB locally)

#### Check if they're installed with the following commands:

React

```
react --verison
```

Create React App

```
create-react-app --verison
```

Node

```
node --verison
```

NPM

```
npm --verison
```

MongoDB

```
mongod --verison && mongo --version
```

### Installing

Clone the repository locally:

```
git clone https://github.com/harlemtraveler/MERN-Social-Network.git
```

Navigate to the root of the application:

```
cd MERN-Social-Network
```

Run the following command to install dependencies via *NPM*:

```
npm i && cd client && npm i && cd ..
```

The step prior should have brought you back to the root of the app.
If this didn't happen, then just *cd* into the root directory.
Start the app with the following command (this will start both the Express back-end server & the React Front-end):

```
npm run dev
```

If you're using **__Mongo Community Edition__** locally, start Mongo up in a separate Terminal window:

```
sudo mongod
```

After both the front and back-end finish initializing, the application should be running and ready to go! Check the Terminal for any errors that may occur.

## Running the tests

Test the application by registering in the app, logging in, creating a profile, and creating a post. For a lower level test, use a tool such as Postman and hit the paths available in */server.js*, api paths in the */routes/api/*, and Github API route in */client/components/profile/ProfileGithub*.

### Break down into end to end tests

// Coming Soon

### And coding style tests

// Coming Soon

## Deployment

// Coming Soon

## Built With

**Device:**
* [node]
* [npm]
* [react]
* [create-react-app]

**Backend:**
* [bcryptjs]
* [body-parser]
* [concurrently]
* [express]
* [gravatar]
* [jsonwebtoken]
* [mongodb]
* [mongoose]
* [passport]
* [passport-jwt]
* [validator]

**Frontend:**
* [axios]
* [classnames]
* [jwt-decode]
* [moment]
* [react]
* [react-dom]
* [react-moment]
* [react-redux]
* [react-router-dom]
* [react-scripts]
* [redux]
* [redux-thunk]

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Git](http://git-scm.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/harlemtraveler/MERN-Social-Network/tags).

## Authors

* **Timothy Keaveny** - *Initial work* - [PurpleBooth](https://github.com/harlemtraveler/MERN-Social-Network)

See also the list of [contributors](https://github.com/harlemtraveler/MERN-Social-Network/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Big thanks to [Brad Traversy](http://www.traversymedia.com/). One of my core resources when learning new material or just giving myself a refresher.
* Shout out to [Troy Web Consulting](https://www.troyweb.com/)! My experience with the team has helped me understand how the tech industry is operated. One of the best!
* **__Many more to follow, just way too many to mention of the back of my hand__**
