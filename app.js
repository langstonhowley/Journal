const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const formData = require("express-form-data");
const volleyball = require('volleyball');
const debug = require('debug')('app:server');


const index = require('./routes/index');
const journalEntry = require('./routes/entry');
const dbConnection = require('./public/javascripts/db-connection');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//Logger
app.use(volleyball);

//Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/entry', journalEntry);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : 'Internal Server Error';

	// render the error page
    res.status(err.status || 500);
    debug('res.locals.error: ' + res.locals.error)
	res.send('There was an error on the play😫\n' + res.locals.message);
});

var port = process.env.PORT || 3000
dbConnection((db) => {
    app.listen(port, () => debug("Listening at http://localhost:"+port))
})


