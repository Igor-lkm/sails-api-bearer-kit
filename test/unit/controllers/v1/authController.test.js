var request = require('supertest'),
    should = require('should'),
    resetToken,
    resetEmail,
    newPassword;

describe('v1/authController', function() {
    describe('#signup()', function() {
        it('Try to signup', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/signup')
                .send({
                    email: 'user4@test.test',
                    password: '123456'
                })
                .expect(200, done);
        });

        it('Try to signup with not unique email', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/signup')
                .send({
                    email: 'user1@test.test',
                    password: '123456'
                })
                .expect(409, done);
        });
    });

    describe('#login()', function() {
        it('Try to login: invalid email', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/login')
                .send({
                    email: 'not_valid@test.test',
                    password: '123456'
                })
                .expect(401, done);
        });

        it('Try to login: invalid password', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/login')
                .send({
                    email: 'user1@test.test',
                    password: 'NOT_WALID'
                })
                .expect(401, done);
        });

        it('Try to login with valid credentials', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/login')
                .send({
                    email: 'user1@test.test',
                    password: '123456'
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);

                    should.exist(res.body.token);
                    done();
                });
        });
    });

    describe('Retrive password', function() {
        resetEmail = 'user2@test.test';
        newPassword = 'newPassword123';

        it('#forgot()', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/forgot')
                .send({
                    email: resetEmail
                })
                .expect(200)
                .end(function(err) {
                    should.not.exist(err);

                    ResetPassword.find().exec(function(err, resetPassword) {
                        should.not.exist(err);

                        resetToken = resetPassword[0].token;
                        done();
                    });
                });
        });

        it('#reset()', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/reset')
                .send({
                    newPassword: newPassword,
                    token: resetToken
                })
                .expect(200)
                .end(function(err) {
                    should.not.exist(err);

                    done();
                });
        });

        it('Try new password', function(done) {
            request(sails.hooks.http.app)
                .post('/v1/login')
                .send({
                    email: resetEmail,
                    password: newPassword
                })
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);

                    should.exist(res.body.token);
                    done();
                });
        });
    });
});