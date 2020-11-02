const mongoose = require("mongoose")
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://admin:CheccBim2018@10.25.51.41:27017/test', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", function () {
  console.log("数据库连接成功");
})
module.exports = db
