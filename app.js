var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('module-alias/register')
// 路由
// var usersRouter = require('./routes/api/users');
// var pointsRouter = require('./routes/api/points');
// var pagesRouter = require('./routes/api/pages');
// var shuqiansRouter = require('./routes/api/shuqians');
// var shuqians2Router = require('./routes/api2/shuqians');
// var modelsRouter = require('./routes/api/models');
// var filesRouter = require('./routes/api/file/file');
// var mysqlsRouter = require('./routes/api/mysql');

var users2Router = require('./routes/api2/users');
var roles2Router = require('./routes/api2/roles');
var file2Router = require('./routes/api2/file/file');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('@', path.join(__dirname, ''));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
  else next();
});
// 路由配置
// app.use('/api/user', usersRouter);
// app.use('/api/point', pointsRouter);
// app.use('/api/page', pagesRouter);
// app.use('/api/shuqian', shuqiansRouter);
// app.use('/api2/shuqian', shuqians2Router);
// app.use('/api/model', modelsRouter);
// app.use('/api/file', filesRouter);
// app.use('/api/mysql', mysqlsRouter);
app.use('/api2/user', users2Router);
app.use('/api2/roles', roles2Router);
app.use('/api2/file', file2Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
