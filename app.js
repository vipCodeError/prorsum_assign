var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');

var apiRouter = require("./routes/api");
var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    next();
});

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
