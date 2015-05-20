# {{x-human}}

An API built with November.

Prerequisites
-------------
You will need:
- [Node.js](https://nodejs.org) with [NPM](https://www.npmjs.com)
- [November CLI](https://github.com/t4t5/november-cli).
- A local database supported by [Sequelize](http://docs.sequelizejs.com/en/latest)


Install and run
---------------
- `git clone <repository-url>` this repository
- go to the app’s directory
- `npm install`
- `npm start` (or `nodemon` for live-reload)
Visit the API at http://localhost:9000

Generators
----------
- `november g model <model-name>` will generate new models with CRUD actions
- `november g action <action-name>` will generate new actions