var request = require('supertest'),
    should = require('should');

describe('v1/securedAreaController', function() {

    var token = null;

    // get user token
    before(function(done) {
        request(sails.hooks.http.app)
            .post('/v1/login')
            .send({
                email: 'user1@test.test',
                password: '123456'
            })
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);

                token = res.body.token;
                done();
            });
    });

    it('Try without token', function(done) {
        request(sails.hooks.http.app)
            .post('/v1/topSecret')
            .expect(401, done);
    });

    it('Try with valid token', function(done) {
        request(sails.hooks.http.app)
            .post('/v1/topSecret')
            .set('Authorization', 'bearer ' + token)
            .expect(200, done);
    });

    it('Try with invalid token', function(done) {
        request(sails.hooks.http.app)
            .post('/v1/topSecret')
            .set('Authorization', 'bearer ' + 'WRONG_TOKEN')
            .expect(401, done);
    });
});