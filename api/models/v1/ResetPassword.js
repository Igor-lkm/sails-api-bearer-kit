var moment = require('moment'),
    bcrypt = require('bcrypt');


module.exports = {
    schema: true,
    autoUpdatedAt: false,
    attributes: {
        token: {
            type: 'string',
            required: true
        },
        expiredAt: {
            type: 'date',
            required: true
        },
        isUsed: {
            type: 'boolean',
            defaultsTo: false
        },
        owner: {
            model: 'user'
        },
        meta: {
            type: 'json'
        }
    },
    beforeValidate: function(resetToken, cb) {
        resetToken.token = require('crypto').randomBytes(32).toString('hex');
        resetToken.expiredAt = moment().add('1', 'hour').toDate();
        cb();
    }
};