var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
// set up ======================================================================
// get all the tools we need for Passport
var passport = require('passport');
var flash = require('connect-flash');
require('dotenv').config()

var app = express();

// configuration ===============================================================
// connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //Set up pug for templating

//Create instance that will store sessions
// required for passport
app.use(session({
    secret: 'farmaceutica_rase123',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        path: '/', 
        domain: 'localhost',
        secure: false, 
        maxAge: null 
    }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Initialize public folder access for assets
app.use(express.static(path.join(__dirname, 'public')));
// For the React Front-end
app.use('/static', express.static(`${process.env.BUILD_DIR}/static`));

// Set CORS of allowed addresses
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost'];
    const origin = req.headers.origin;

	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// app.use('/profile', require('./routes/profile'));
// app.use('/logout', require('./routes/logout'));
// app.use('/resources', require('./routes/resources'));
// app.use('/facturas', require('./routes/facturas'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.error(err);
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;