/**
 * Job's task is to occationally get the feeds occationally and update redis.
 */

var async = require('async')
  , lib = require('./lib.js');

module.exports = function() {
  var jobs = new Array();

  async.parallel([

    function(cb) {
      lib.careers20(cb, 'non-test');
    },
    function(cb) {
      lib.authenticjobs(cb, 'non-test');
    },
    function(cb) {
      lib.github(cb, 'non-test');
    },
    function(cb) {
      lib.weworkremotely(cb, 'non-test');
    }

  ], function(e, results){
    console.log(results.length);
    console.log('√ async completed');
  });
}
