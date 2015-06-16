/**
 * AuthController
 */

var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {
        passport.authenticate('local-login', function(err, token, info) {
            if (err) return res.send(400, err);
            if (!token) return res.send(401, info);

            return res.send({
                token: token
            });
        })(req, res);
    },

    logout: function(req, res) {
        res.send(200);
    },

    signup: function(req, res) {
        passport.authenticate('local-signup', function(err, user, info) {
            // validation errors will be here:
            if (err) return res.send(400, err);
            // if user with provided email exists error will be here:
            if (!user) return res.send(info.status, info.message);

            return res.send({
                user: user
            });
        })(req, res);
    },

    /* request token for reset password */
    forgot: function(req, res) {
        if (!req.body.email) return res.send(400);

        User.findOneByEmail(req.body.email).exec(function(err, user) {
            if (err) return res.send(401);
            if (!user) return res.send(404);

            user.resetPassword.add({
                meta: {
                    ip: req.connection.remoteAddress,
                    userAgent: req.headers['user-agent']
                }
            });

            user.save(function(err, _user) {
                if (err) return res.send(400);

                var resetToken = _user.resetPassword[_user.resetPassword.length - 1].token;

                // TODO: Here you have to send email with link to reset password.
                // I will just output in response so you can copy it from there.
                res.send({
                    token: resetToken
                });
            });
        });
    },

    /* reset password with provided reset token */
    reset: function(req, res) {
        if (!req.body.newPassword) return res.send(400);

        ResetPassword.findOne({
            token: req.body.token,
            expiredAt: {
                '>=': new Date()
            },
            isUsed: false
        }, function(err, resetPassword) {
            if (err) return res.send(400);
            if (!resetPassword) return res.send(404);

            User.findOneById(resetPassword.owner)
                .exec(function(err, user) {
                    if (err) return res.send(400);
                    if (!user) return res.send(404);

                    resetPassword.isUsed = true;
                    resetPassword.save();

                    user.newPassword = req.body.newPassword;
                    user.save(function(err) {
                        if (err) return res.send(400);

                        res.send(200);
                    });
                });
        });
    }
};