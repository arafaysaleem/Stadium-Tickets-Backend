# Stadium Tickets App REST API Using Express With MVC Architecture

<!-- [![Node Build, Test And Lint CI](https://github.com/cyntaria/UniPal-Backend/actions/workflows/build-test.yml/badge.svg)](https://github.com/cyntaria/UniPal-Backend/actions/workflows/build-test.yml) 
[![Build And Deploy To Azure](https://github.com/cyntaria/UniPal-Backend/actions/workflows/deploy-azure.yml/badge.svg)](https://github.com/cyntaria/UniPal-Backend/actions/workflows/deploy-azure.yml) 
[![Pull Request Labeler](https://github.com/cyntaria/UniPal-Backend/actions/workflows/label.yml/badge.svg)](https://github.com/cyntaria/UniPal-Backend/actions/workflows/label.yml) 
[![Deploy To Heroku](https://github.com/cyntaria/UniPal-Backend/actions/workflows/deploy-heroku.yml/badge.svg)](https://github.com/cyntaria/UniPal-Backend/actions/workflows/deploy-heroku.yml) 
[![GitHub issues](https://img.shields.io/github/issues/cyntaria/UniPal-Backend?color=orange)](https://github.com/cyntaria/UniPal-Backend/issues) 
[![GitHub stars](https://img.shields.io/github/stars/cyntaria/UniPal-Backend?color=yellow)](https://github.com/cyntaria/UniPal-Backend/stargazers) 
[![Lines of code](https://sloc.xyz/github/cyntaria/UniPal-Backend/)](https://github.com/boyter/scc/) 
[![GitHub license](https://img.shields.io/github/license/cyntaria/UniPal-Backend?color=cyan)](https://github.com/cyntaria/UniPal-Backend/blob/master/LICENSE.md)  -->

[![BadgeNodeJS](https://img.shields.io/badge/MADE%20WITH-NODEJS-brightgreen?style=for-the-badge&logo=Node.js)](https://shields.io/) [![BadgeExpress](https://img.shields.io/badge/USES-EXPRESS-red?style=for-the-badge)](https://shields.io/) [![BadgeMySQL](https://img.shields.io/badge/USES-MYSQL-4479A1?style=for-the-badge&logo=MySQL)](https://shields.io/) [![BadgeAzure](https://img.shields.io/badge/DATABASE-AZURE-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=007FFF)](https://shields.io/) [![BadgeAzureAppService](https://img.shields.io/badge/DEPLOYED-AZURE%20APP%20SERVICE-2560E0?style=for-the-badge&logo=azurepipelines&logoColor=007FFF)](https://shields.io/) [![BadgeHeroku](https://img.shields.io/badge/STAGING-HEROKU-430098?style=for-the-badge&logo=Heroku)](https://shields.io/)

### :memo: Documentation

The documentation was generated using Postman and is divided into collections at the following URLs:

Endpoint | URL
--- | ---
Auth | https://documenter.getpostman.com/view/13348269/TzzHnZDS

### :dvd: Installation
#### 1. Getting Started

``` sh
# Clone this repo to your local machine using
git clone https://github.com/cyntaria/Stadium-Tickets-Backend

# Get into the directory
cd Stadium-Tickets-Backend

# Make it your own
rm -rf .git && git init (For Linux/MacOS)
rm .git -r -fo; git init (For Windows PowerShell)

# Copy example.env and create your own .env file in envs folder
cp .env.example envs/.env

# Move into the envs dir
cd envs

# Edit .env file and add your postgre username, password and db name, host,
# port, jwt_secret
vscode .env

# Create different .env.{NODE_ENV} file for each environment and override only your
# required variables. The missing ones will be loaded from .env by default.
# For example if you want dev, production and test environments:
cp .env .env.dev
cp .env.dev .env.production
cp .evn.dev .env.test

# When the NODE_ENV variable is set while running, the correct .env loads automatically.
# e.g. Setting NODE_ENV=production is going to load the .env.production file

# Add a gitignore to ignore node_modules and your .env file
echo -e 'node_modules \n envs \n' >> .gitignore
```

#### 2. Setting up node js

``` sh
# Install dependencies
npm install

# Run the server locally with default .env file
npm start

# Run the server in dev mode with nodemon with .env.dev file
npm run dev

# While deploying to production with .env.production file
npm run production

# To run lint checks or to run and fix them
npm run lint or npm run lint:fix

# To run unit tests
npm run test:unit

# To run integration tests
npm run test:intg

# To run all tests (unit+intg) or run all tests and generate coverage
npm run test or npm run test:coverage
```

### :electron: Setup CI (Github Actions)

If you want to run the github testing and PR labelling workflows in the CI then:

Create the following repository secrets:
  * DB_HOST: your_db_host (If using CI mysql service set to 127.0.0.1)
  * DB_USER: your_db_user (If using CI mysql service set this to 'root')
  * DB_PASS: your_db_password (If using CI mysql service set this to 'root')
  * DB_TEST_DATABASE: your_test_database_name
  * SENDGRID_API_KEY: value should be your .env file variable => sendgrid_api_key
  * SENDGRID_SENDER: value should be your .env file variable => from_email
  * SECRET_JWT: value should be your .env file variable => your_secret
  * PRODUCTION_ENV: contents of the base `.env + .env.production` files
  * HEROKU_API_KEY: value for the heroku api key
  * AZURE_PUBLISH_PROFILE: the contents of the downloaded publish profile from Azure
  * WEBAPP_NAME: name of the deployed webapp, should match heroku/azure project name

### :closed_book: Important Notes

- The `healthcheck` endpoint is to ensure the status of the API from the CI so we can be sure we are deploying a working API only.
- If you add/remove/change the names of any folders/file extensions make sure to update the [labeler.yml](.github/labeler.yml)

**Enjoy :)**

### :closed_lock_with_key: Security
Take the following steps to ensure security of configurations

```sh
# 1. Convert the envs folder to zip file
# 2. Encrypt it using gpg passphrase
gpg --output encrypted_envs.gpg --symmetric envs.rar
# 3. Decrypt it using gpg passphrase
gpg --output envs.rar --decrypt encrypted_envs.gpg
```

### :wrench: Tech

This example uses a number of open source projects to work properly:

* [node.js]
* [express]
* [bcryptjs]
* [cors]
* [cross-env]
* [deep-email-validator]
* [dotenv-flow]
* [express-validator]
* [jsonwebtoken]
* [mysql2]
* [@babel/eslint-parser]
* [@babel/core]
* [mocha]
* [chai]
* [supertest]
* [sinon]
* [decache]
* [eslint-config-strongloop]
* [@sendgrid/mail]
* [otp-generator]

### :bookmark_tabs: License
Stadium-Tickets-Backend © 2021 by Abdur Rafay Saleem is licensed under CC BY 4.0 

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/arafaysaleem/nodejs_starter_template>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [bcryptjs]: <https://github.com/dcodeIO/bcrypt.js#readme>
   [cors]: <https://github.com/expressjs/cors#readme>
   [cross-env]: <https://github.com/kentcdodds/cross-env>
   [deep-email-validator]: <https://github.com/mfbx9da4/deep-email-validator>
   [dotenv-flow]: <https://github.com/kerimdzhanov/dotenv-flow>
   [express-validator]: <https://express-validator.github.io/docs/>
   [jsonwebtoken]: <https://github.com/auth0/node-jsonwebtoken#readme>
   [mysql2]: <https://github.com/sidorares/node-mysql2#readme>
   [@babel/eslint-parser]: <https://github.com/babel/babel>
   [@babel/core]: <https://github.com/babel/babel>
   [mocha]: <https://github.com/mochajs/mocha>
   [chai]: <https://github.com/chaijs/chai>
   [supertest]: <https://github.com/visionmedia/supertest>
   [sinon]: <https://github.com/sinonjs/sinon>
   [decache]: <https://github.com/dwyl/decache>
   [eslint-config-strongloop]: <https://github.com/strongloop/eslint-config-strongloop>
   [@sendgrid/mail]: <https://github.com/sendgrid/sendgrid-nodejs>
   [otp-generator]: <https://github.com/Maheshkumar-Kakade/otp-generator#readme>
