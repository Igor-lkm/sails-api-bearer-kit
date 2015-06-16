/**
 * SecuredAreaController
 */

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    topSecret: function(req, res) {
        res.send('secret data is...');
    }

};