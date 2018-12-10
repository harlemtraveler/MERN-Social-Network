[_metadata_:title]:- "MERN Social Media Application"
[_metadata_:author]:- "Mr. Robot"
[_metadata_:date]:- "December 4, 2018"


# MERN Social Media Application

This is a social media application that provides users the fundamental functionality the makes up the foundation of many of the social media applications available today. Users can create profiles, make posts, and comment & like each other's posts.

Beyond the usual __ToDo__ projects that proliferate repositories across the globe, users can personalize their profiles by integrating third-party social apps, integrate an avatar via Gravatar, list prior education and experience, provide detailed descriptions of yourself, and link their Github account to share with the rest of the this application's community.

Authentication is integrated into the app, but what makes this feature stand out is that it was created from scratch using Node.js and minimal dependencies (No turn-key auth services here!).

This project was created with the guidance of a tutorial, which will be linked to below. The purpose of this project is to provide a refresher on the MERN stack, which is one of my personal favorites. However, I'll be using the architecture employed here to create a particular project of my own. Once this personal project is complete, it will be listed below for anyone to take a look.

### Tutorial
**Course:** [MERN Stack Front To Back: Full Stack React, Redux & Node.js](https://www.udemy.com/mern-stack-front-to-back "A Udemy Course")
* **Instructor:** Brad Traversy
* **Duration:** 16.5 hours on-demand video
* **Skill level:** Intermediate Level
* **Students:** 13,224
* **Languages:** English
* **Lectures:** 78

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

Within the root of the application, inside of the __/config__ folder, create a file named __keys_dev.js__ to hold the **MongoDB URI** and **secretOrKey** variables that will be used to connect to a MongoDB database (the path of the newly created file should be: __/config/keys_dev.js__):

```
touch /config/keys_dev.js
```

Now, enter the following code inside of the __keys_dev.js__ file. You can use __localhost__ to reference your personal device, or link to a database from a cloud provider such as [mLab](https://mlab.com). For this example, I'm linking to a [Mongo Community Edition](https://docs.mongodb.com/manual/administration/install-community/) database hosted locally on my device through __localhost:27017__ (In the code below, replace <username> and <password> with your credentials for the corresponding database. Replace <secret-key-string> with any string of your choice):

```
module.exports = {
  mongoURI: 'mongodb://<username>:<password>@localhost:27017/merndb',
  secretOrKey: '<secret-key-string>'
};
```

In the root of the project, create a __.env__ file to hold the applications __Environment Variables__. This is a secure place to store sensitive data such as API keys, passwords, etc. For us, we'll use it to store our Github API Key, Github Secret, MongoDB URI, and Node's __secretOrKey__ value:

```
touch .env
```

Now enter the following code into the newly created __.env__ file (Replacing the values within the angle brackets "< >" with your own values):

```
CLIENT_ID: "<github-api-client-id>",
CLIENT_SECRET: "<github-api-client-secret>",
MONGO_URI: "<mongodb-uri-path-with-username-&-password>",
SECRET_OR_KEY: "<your-application-secretOrKey-value>"
```

**!IMPORTANT!**
Add the path of the __.env__ file to your __.gitignore__ file. The contents of the __.gitignore__ file are prevented from being committed to a __Git__ repository. You do **NOT** want to have your passwords and other sensitive data publicly available on a service such as Github for the entire world to see! With this in mind, we'll also add the path to the __keys_dev.js__ file in __.gitignore__ as well (It contains your DB username and password).

The __.gitignore__ file should already exist in your project if it's in a active Git repository. The contents of the file should be the path to the __node_modules__ folder.

Add the path of the __.env__ and __keys_dev.js__ files to __.gitignore__:

```
.env
/node_modules
/config/keys_dev.js
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

## Security Issues

This project is not meant to be a production application as is, but rather an educational project meant to help learn the basics of creating a social media app using the MERN stack. With that being said, there are some severe vulnerabilities with the how the application was developed. What is listed below does not represent all vulnerabilities, but the list will be continually updated. Please feel free to contact me to resolve any issues you come across (The API keys, links to database, etc within this project's commits are no longer active).

**Exposed Keys** - __[commit: 9970008bad4f42021c5923a83da3ed14f2ae950b]__
The database URI that contains the database username and password was committed to the Git repository. As mentioned in the installation instructions, you MUST secure this data from being made publicly available. Although the __keys_dev.js__ file path was recommended to be placed in the __.gitignore__ file, we initially created the __keys.js__ file to hold this information (This was done for instructional purposes). I recommend add the __/config/keys.js__ path to the __.gitignore__ file before you even make your first commit.

**Exposed Github API Credentials** __[commit: 73d50e4b02e08969845bfaee1a398e43c9852998]__
Similar to the vulnerability above, we are exposing sensitive data by placing the API credentials directly in the React component that is responsible for fetching the first five repositories from your Github account. This problem indicates an issue with application architecture.

Just hiding the credentials from the Git repository is not the solution. The reason being is because when a user loads a profile, the API credentials are available in React/Redux State, in plaintext for anyone to see. To properly resolve this issue, we must move the API call to the backend server and have the React frontend fetch the data from the server.

You can see how I resolved this by referencing the changes made [here](https://github.com/harlemtraveler/MERN-Social-Network/commit/a3219785cfae38d274553bd185defbd0eb73468a) in [commit: a3219785cfae38d274553bd185defbd0eb73468a].

**More To Follow**
Additional security vulnerabilities are going to be published here over time. Time is going to be set aside time every month to review and Pen Test this project to help users identify potential issues when constructing a social media application of their own. As always, please reach out if there are any potential problems you come across. All help is welcome. The goal is to help developers produce quality products that keep users safe.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Git](http://git-scm.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/harlemtraveler/MERN-Social-Network/tags).

## Authors

* **Timothy Keaveny** - *Initial work* - [MERN Social Media App](https://github.com/harlemtraveler/MERN-Social-Network)

See also the list of [contributors](https://github.com/harlemtraveler/MERN-Social-Network/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Big thanks to [Brad Traversy](http://www.traversymedia.com/). One of my core resources when learning new material or just giving myself a refresher.
* Shout out to [Troy Web Consulting](https://www.troyweb.com/)! My experience with the team has helped me understand how the tech industry is operated. One of the best!
* **__Many more to follow, just way too many to mention of the back of my hand__**
