var should = require('should')
  , FeedParser = require('feedparser')
  , request = require('request')
  , dns = require('dns')
  , careers20 = require('../lib/careers20.js');

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
    var req = request('http://careers.stackoverflow.com/jobs/feed?searchTerm=&allowsremote=True')
      , feedparser = new FeedParser();

    req.on('error', function(e) {
      done(e);
    });

    req.on('response', function(res){
      var stream = this;
      console.error(res.bodt);
      if(res.statusCode !== 200) done(new Error('wrong status code'));
      stream.pipe(feedparser);
    });

    feedparser.on('error', function(e) {
      done(e);
    });

    feedparser.on('readable', function() {
      var stream = this
        , meta = this.meta
        , item;

      while (item = stream.read()) {
        console.log(item.title);
      }

    });

    feedparser.on('end', function(){ done() });
  });
});

