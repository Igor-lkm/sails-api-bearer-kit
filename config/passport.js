var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    BearerStrategy = require('passport-http-bearer').Strategy;

var LocalStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        id: id
    }, function(err, user) {
        done(err, user);
    });
});

/** 
 * Local Login
 */

passport.use('local-login', new LocalStrategy(LocalStrategyOptions,
    function(email, password, done) {
        User.findOne({
            'email': email
        }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, {
                message: 'Invalid Credentials.'
            });

            user.verifyPassword(password, function(err, res) {
                if (err || !res) return done(null, false, {
                    message: 'Invalid Credentials.'
                });

                bcrypt.genSalt(10, function(err, salt) {
                    // generate new access token
                    var genToken = jwt.sign({
                        id: user.id,
                        email: user.email
                    }, salt);

                    user.tokens.add({
                        token: genToken,
                        createdAt: new Date()
                    });

                    user.save();

                    return done(err, genToken, {
                        message: 'Logged In Successfully.'
                    });
                });
            });
        });
    }
));

/**
 * Local Signup
 */

passport.use('local-signup', new LocalStrategy(LocalStrategyOptions,
    function(email, password, done) {
        // check if user with provided email exists
        User.findOne({
            'email': email
        }, function(err, user) {
            // if there are any errors, return the error
            if (err) return done(err);

            // if user with provided email exists, return with status code 409
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken.',
                    status: 409
                });
            } else {
                // if there is no user with provided email - create the user
                var newUser = {
                    email: email,
                    password: password
                };

                User.create(newUser)
                    .exec(function(err, user) {
                        return done(err, user);
                    });
            }
        });
    }
));

/**
 * BearerStrategy
 */

passport.use('bearer', new BearerStrategy(
    function(accessToken, done) {
        Token.findOne({
            token: accessToken
        }, function(err, token) {
            if (err) return done(err);
            if (!token) return done(null, false);

            if (!_.isNull(token.owner)) {
                User.findById(token.owner, function(err, user) {
                    if (err) return done(err);
                    if (!user) return done(null, false);

                    token.lastUsed = new Date();
                    token.save();
                    done(null, user);
                });
            } else {
                done(true);
            }
        });
    }
));