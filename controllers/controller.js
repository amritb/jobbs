var async = require('async')
  , lib = require('../lib/lib.js')
  , task = require('../lib/task.js');

module.exports = function(req, res) {
  task(function(data){
    res.json(data);
  });
}
