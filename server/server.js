var express = require('express'),
    morgan = require('morgan'),
    cors = require('express-cors'),
    parser = require('body-parser'),
    helmet = require('helmet'),
    router = require('./config/routes');
    bodyParse = require('body-parser');
// Create new app
var app = express();

// Set port to process.env.PORT or 3001
app.set('port', (process.env.PORT || 3001));

// logging, security, parsing data, allowing cors for dev and prod
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParse.urlencoded());
app.use(cors({
  allowedOrigins: ["http://localhost:3001", "http://localhost:3000", "http://www.planEats.xyz/"]
}));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// Serve static files - not positive which to use here
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
// }
app.use(express.static('../client/build'));

// API route
app.use('/api', router);

// Confirm server is running
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

module.exports = app;
