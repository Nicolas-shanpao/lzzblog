let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('module-alias/register')
// 路由
let usersRouter = require('./routes/api/users');
let filesRouter = require('./routes/api/file');
let articlesRouter = require('./routes/api/articles');
let articleTypesRouter = require('./routes/api/article_types');

let app = express();

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
app.use('/api/user', usersRouter);
app.use('/api/file', filesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/articleTypes', articleTypesRouter);

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
