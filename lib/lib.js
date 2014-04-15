var FeedParser = require('feedparser')
  , request = require('request')
  , dns = require('dns');

exports.careers20 = function(cb, mode) {
  hit('http://careers.stackoverflow.com/jobs/feed?searchTerm=&allowsremote=True', cb, mode);
}

exports.authenticjobs = function(cb, mode) {
  hit('http://www.authenticjobs.com/rss/index.xml', cb, mode);
}

exports.github = function(cb, mode) {
  hit('https://jobs.github.com/positions.atom?description=&location=', cb, mode);
}

exports.weworkremotely = function(cb, mode) {
  hit('https://weworkremotely.com/categories/2/jobs.rss', cb, mode);
}

function hit(path, cb, mode) {
  var req = request(path)
    , feedparser = new FeedParser();

  var data = new Array();

  req.on('error', function(e) {
    cb(e);
  });

  req.on('response', function(res){
    var stream = this;
    if(res.statusCode !== 200) cb(new Error('wrong status code'));
    stream.pipe(feedparser);
  });

  feedparser.on('error', function(e) {
    cb(e);
  });

  feedparser.on('readable', function() {
    var stream = this
      , meta = this.meta
      , item;

    while (item = stream.read()) {
      data.push(item);
    }

  });

  feedparser.on('end', function(){
    // If testing, do not send data
    if(mode === 'test') { cb(); } else { cb(null, data); }
  });
}
