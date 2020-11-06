var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()


var admin_login = require('./middlewares/admin-login');
var userLogin = require('./middlewares/user-login');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminCategoriesRouter = require('./routes/admin/Categories');
var adminArticlesRouter = require('./routes/admin/Articles');
var adminCoursesRouter = require('./routes/admin/Courses');
var adminChaptersRouter = require('./routes/admin/Chapters');
var adminLikesRouter = require('./routes/admin/Likes');
var adminUsersRouter = require('./routes/admin/Users');
var adminLoginRouter = require('./routes/admin/login');
var adminUploadRouter = require('./routes/admin/Upload');
var courseRouter = require('./routes/courses');
var chapterRouter = require('./routes/chapters');
var categoryRouter = require('./routes/categories');
var likeRouter = require('./routes/likes');
var loginRouter = require('./routes/login');
var historiesRouter = require('./routes/histories');
var searchRouter = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//后台接口路由
app.use('/admin/categories', admin_login(), adminCategoriesRouter);
app.use('/admin/articles', admin_login(), adminArticlesRouter);
app.use('/admin/courses', admin_login(), adminCoursesRouter);
app.use('/admin/chapters', admin_login(), adminChaptersRouter);
app.use('/admin/likes', admin_login(), adminLikesRouter);
app.use('/admin/users', admin_login(), adminUsersRouter);
app.use('/admin/upload', admin_login(), adminUploadRouter);
app.use('/admin/login', adminLoginRouter);

//前台接口路由
app.use('/', indexRouter);
app.use('/courses', courseRouter);
app.use('/chapters', chapterRouter);
app.use('/categories', categoryRouter);
app.use('/likes', userLogin(), likeRouter);
app.use('/login', loginRouter);
app.use('/users', userLogin(), usersRouter);
app.use('/histories', historiesRouter);
app.use('/search', searchRouter);


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
