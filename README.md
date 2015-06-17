This is starter kit for API with Sails.js, passport-local, passport-bearer

!!! IMPORTANT: Use at your own risk. This is pretty basic example. Have fun!

## Installing

1) Install Sails.js
```
$ sudo npm install sails -g
```

2) Clone the project and get in
```
$ git clone https://github.com/Igor-lkm/sails-api-bearer-kit.git
$ cd sails-api-bearer-kit
```

3) npm install install dependencies 
```
$ npm install
```

4) Run test
```
$ npm test
```

5) If everything is ok, then provide settings for your connection in config/connections.js
```
mongodbServerOne: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: '***',
    password: '***',
    database: '***',
},
```

6) Start the porject

```
$ sails lift
```

7) Test your api with [POSTMAN](https://www.getpostman.com)

## Api endpoints:

| URL           | HTTP Verb     |     Arguments    |
|:-------------:|:-------------:|:----------------:|
|/v1/signup     | POST          | email, password  |      
|/v1/login      | POST          | email, password  |
|/v1/forgot     | POST          | email            |
|/v1/reset      | POST          | resetToken       |
|/v1/topSecret  | POST          | (bearer token)   |

### Testing

To run test:
```
npm test
```

### Packeges
- [passport](https://github.com/jaredhanson/passport) - is authentication middleware for Node.js.
- [passport-local](https://github.com/jaredhanson/passport-local) - passport strategy for authenticating with a username and password.
- [passport-http-bearer](https://github.com/jaredhanson/passport-http-bearer) - HTTP Bearer authentication strategy for Passport.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - an implementation of JSON Web Tokens.
- [winston](https://github.com/winstonjs/winston) - a multi-transport async logging library for node.js. 
- [moment](https://github.com/moment/moment) - a lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [bcrypt](https://github.com/ncb000gt/node.bcrypt.js) - lib to help you hash passwords.

Testing:
- [barrels](https://github.com/bredikhin/barrels) - simple DB Fixtures for Sails.js with associations support
- [mocha](https://github.com/mochajs/mocha) - is a feature-rich JavaScript test framework running on node.js 
- [sails-memory](https://github.com/balderdashy/sails-memory) - non-persistent in-memory adapter for Sails.js / Waterline
- [should](https://github.com/shouldjs/should.js) - should is an expressive, readable, framework-agnostic assertion library. 
- [supertest](https://github.com/visionmedia/supertest) - Super-agent driven library for testing HTTP servers

Some references:
- http://stackoverflow.com/questions/28015873/disable-some-built-in-functionality-in-sails-js
- Testing: https://github.com/bredikhin/sailsjs-mocha-testing-barrels-fixtures-example

Feel free to contribute the project!

# License

MIT License Copyright © 2014 Igor Likhomanov


