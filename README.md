# JamFactory Static

<p align="center">
    <img src="docs/logo.svg" alt="Logo" width="80" height="80">
</p>

<p align="center">
Checkout the live version on
<a href="https://jamfactory.app"><strong>Jamfactory.app</strong></a>
</p>

## What is JamFactory

JamFactory is a collaborative playback controller. A JamSession is a private party with **one** host to set it up, and
many attendees to join in.

Your friends or party guests can vote for the songs they like and want to listen to, and the song with the most votes
gets played next. JamFactory acts as the conductor of your music and is not the playback device itself. Therefore, you
are free to **choose your own playback device**.

The host of a JamSession has to have a Spotify premium account, the guests can join the without a Spotify account.

JamFactory consists of independent applications that form the ecosystem together. This project contains the static
landingpage

### Built With

JamFactory Static is build among others using these awesome projects

* [webpack](https://webpack.js.org/)
* [babel](https://babeljs.io/)

### Last Release

The static landingpage does currently not follow a release cycle

## Getting started with local development

Make sure you have a working `Node.js V14` installation. Run `npm install` to install the required node modules.

### Development server

Run `npm run start` to stat a dev server. Navigate to `http://localhost:9000/`. The site will automatically reload if
you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Getting started with docker development

### Development server

Run `docker-compose up -d` to start a dev server inside a docker container. Navigate to `http://localhost:9000/`. The
site will automatically reload if you change any of the source files.

**For Windows**: Make sure the src directory is enabled for file sharing in docker.
See [https://stackoverflow.com/a/60814428](https://stackoverflow.com/a/60814428)