var async = require('async')
  , lib = require('../lib/lib.js');

lib();

module.exports = function(req, res) {
  res.send('123');
}
