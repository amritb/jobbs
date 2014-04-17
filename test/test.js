var should = require('should')
  , dns = require('dns')
  , lib = require('../lib/lib.js');

// Create a new test suite for our searching crawl/activity
describe('Remote jobs tests:', function() {

  // Check internet connectivity
  it('Internet connection', function(done) {
    dns.resolve('google.com', function(e) {
      if(e) {
        done(e);
      } else {
        done();
      }
    })
  });

  it('Get feed from Careers 2.0 (Stackoverflow)', function(done) {
    lib.careers20(done, 'test');
  });

  it('Get feed from AuthenticJobs', function(done) {
    lib.authenticjobs(done, 'test');
  });

  it('Get feed from GitHub jobs', function(done) {
    lib.github(done, 'test');
  });

  it('Get feed from WeWorkRemotely jobs', function(done) {
    lib.github(done, 'test');
  });

});
