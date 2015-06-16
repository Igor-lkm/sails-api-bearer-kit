var should = require('should');

describe('User model / v1', function() {
    it('user list should not be empty', function(done) {
        User.find().exec(function(err, users) {
            should.not.exist(err);

            users.length.should.not.be.eql(0);
            done();
        });
    });

    it('create new user', function(done) {
        User.create({
            email: 'user3@test.test',
            password: 'superpass'
        }).exec(function(err, user) {
            should.not.exist(err);

            user.password.should.not.be.eql('superpass');
            done();
        });
    });

    it('try password "WRONG_PASS" for user1', function(done) {
        User.findOneById(1).exec(function(err, user) {
            should.not.exist(err);

            user.verifyPassword('WRONG_PASS').should.not.be.eql(true);
            done();
        });
    });

    it('try password "123456" for user1', function(done) {
        User.findOneById(1).exec(function(err, user) {
            should.not.exist(err);

            user.verifyPassword('123456').should.be.eql(true);
            done();
        });
    });

    it('update password for user1', function(done) {
        User.findOneById(1).exec(function(err, user) {
            should.not.exist(err);

            user.newPassword = 'newpassword';
            user.save(function(err, updUser) {
                should.not.exist(err);

                updUser.verifyPassword('newpassword').should.be.eql(true);
                done();
            });
        });
    });
});