const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const baseConfig = require('./development');
let uri = 'mongodb://admin:ACElzz2018.@' + baseConfig.HOST + ':27017/lzzblog?authSource=admin';
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("数据库连接成功");
})
module.exports = db
