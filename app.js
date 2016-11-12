var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index/index');
var add = require('./routes/add/add');
var user = require('./routes/user/user');
var sort = require('./routes/sort/sort');
var utils = require('./utils/utils');

var app = express();

var whitelist = [
    "/add/getAllAddedChips",
    "/add/getAllAddedColors"];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/sort', sort);
app.use('/utils',utils);

function checkIfUserLegit(req, res, next) {
    console.log(req.url);
    if (req.body.api_key == "dev123") {
        console.log("dev api_key in use. are you sure its testing only?");
        next();
    }
    else if(req.cookies.userID==undefined&&contains.call(whitelist, req.url)){
        next();
    }
    else {
        var auth = require('./utils/authorizeUser');
        auth.authorizeUser(req,nextOrNot, next, res);
    }
}

function nextOrNot(valid, next, res) {
    if (valid)
        next();
    else {
        res.send("You are either not logged in or do not have permission to access this page");
    }
}

app.use(checkIfUserLegit);
app.use('/add', add);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};