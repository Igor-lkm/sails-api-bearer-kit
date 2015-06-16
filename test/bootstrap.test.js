var Sails = require('sails'),
    Barrels = require('barrels'),
    fixtures;

// Global before hook
before(function(done) {
    // Lift Sails with test database
    Sails.lift({
        log: {
            level: 'error'
        },
        models: {
            connection: 'memoryDb',
            migrate: 'drop'
        }
    }, function(err) {
        if (err) return done(err);

        // Load fixtures (defaults from ./test/fixtures).
        fixtures = new Barrels();

        // Populate the DB
        fixtures.populate(function(err) {
            done(err);
        });
    });
});

// Global after hook
after(function(done) {
    console.log(); // Skip a line before displaying Sails lowering logs
    Sails.lower(done);
});