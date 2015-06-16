var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = {
    schema: true,
    attributes: {
        email: {
            type: 'email',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            minLength: 6,
            required: true
        },
        tokens: {
            collection: 'Token',
            via: 'owner'
        },
        resetPassword: {
            collection: 'ResetPassword',
            via: 'owner'
        },
        verifyPassword: function(password, cb) {
            if (_.isFunction(cb)) {
                return bcrypt.compare(password, this.password, cb);
            }
            return bcrypt.compareSync(password, this.password);
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    beforeCreate: function(attrs, next) {
        hashPassword(attrs, next);
    },
    beforeUpdate: function(attrs, next) {
        if (attrs.newPassword) {
            attrs.password = attrs.newPassword;
            delete attrs.newPassword;
            hashPassword(attrs, next);
        } else {
            return next();
        }
    }
};

function hashPassword(attrs, next) {
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function(err, crypted) {
        if (err) return next(err);

        attrs.password = crypted;
        next();
    });
}