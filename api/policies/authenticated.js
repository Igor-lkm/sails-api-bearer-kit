/**
 * Allow any authenticated user.
 */
var passport = require('passport');

module.exports = function(req, res, done) {
    passport.authenticate('bearer', {
        session: false
    }, function(err, user) {
        if (err) return done(err);
        if (user) return done();

        return res.send(401);
    })(req, res);
};