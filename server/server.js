var express = require('express'),
    morgan = require('morgan'),
    cors = require('cors'),
    parser = require('body-parser'),
    router = require('./config/routes');

var app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cors());
app.use(morgan('dev'));
app.use(parser.json());
app.use(express.static('../client/build'));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

module.exports = app;