/**
 * Job's task is to occationally get the feeds and store it to a file.
 */

var async = require('async')
  , lib = require('./lib.js')
  , fs = require('fs')
  , config = require('../config.js');

module.exports = function(callback) {

  // Hit the feeds parallely
  async.parallel([

    function(cb) {
      lib.careers20(cb, 'non-test');
    },/*
    function(cb) {
      lib.authenticjobs(cb, 'non-test');
    },*/
    function(cb) {
      lib.github(cb, 'non-test');
    },
    function(cb) {
      lib.weworkremotely(cb, 'non-test');
    },


  ], function(e, results){
    if(e) {
      console.error(e);
      callback(e);

    }else {
      var r = new Array();

      async.each(results, function(site, cb1){

        async.each(site, function(row, cb2) {
          r.push({
            title: row.title,
            description:  encodeURI(row.description),
            link: row.link,
            date: row.date,
          });
          cb2();

        }, function(err){
          if(err) cb2(err);
          cb1();
        });

      }, function(err){
        if(err) callback(err);

        // Do some filteraton

        // sort as per date
        r.sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        })

        fs.writeFile(config.PROJECT_DIR + '/public/data/' + 'data.js', 'var data = ' + JSON.stringify(r), function(err){
          if(err) callback(err);
        })
        console.log('TASK COMPLETE');
        callback();
      });
    }
  });
}
