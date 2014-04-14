var express = require('express')
  , app = express()
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

require('./routes.js')(app);

var port = 3000;

app.listen(port);
console.log('Server started on port ' + port);
