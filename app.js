let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cookieSession = require("cookie-session");
const secret = "secretCuisine123";

let indexRouter = require('./routes/index');

let app = express();
app.use(
  cookieSession({
    name: "session",
    keys: [secret],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 共通処理
app.use((req, res, next) => {
  console.log(req.session);
  switch (req.url) {
    case '/':
    case '/signin':
      break;
    default:
      if (req.session.admin_id === undefined) {
        res.redirect('/');
        return;
      }
  }

  next();
});

// ルーティング
// --------------------------------------------------------------
app.use('/', indexRouter);
app.use('/logout', require('./routes/logout'));
app.use('/signin', require('./routes/signin'));
app.use('/home', require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/user', require('./routes/user'));
app.use('/admin/user', require('./routes/admin/user'));
app.use('/admin/users', require('./routes/admin/users'));
// --------------------------------------------------------------

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
