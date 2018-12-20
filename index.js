// require all the libraries we need for the app:
var express         = require('express');
var mustache        = require('mustache-express');
var port            = 3000;
var logger          = require('morgan');  // makes pretty console logs
var bodyParser      = require('body-parser');  // lets us attach data to the request
var methodOverride  = require('method-override'); // lets us make forms that edit and delete

var lessenController = require('./controllers/lessenController');
var subjectController = require('./controllers/subjectController');
// var noteController = require('./controllers/noteController');
// var studentController = require('./controllers/subjectController');

var app = express();
app.use('/static', express.static(__dirname + '/public'));

// mustache config:
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// morgan config:
app.use(logger('dev'));


// body-parser config:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use('/lesson' , lessenController);
app.use('/subject' , subjectController);

app.get('/', function(req, res){
  res.render('./index');
})

app.listen(port, function(){
  console.log('Muneera it is runnin');
})