const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaModel = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,  // km 线路  supermap_s3m 超图 3dtiles 普通模型
    required: true,
  },
  url: {
    type: String,
  },
  offset: {
    x: Number,
    y: Number,
    z: Number,
  },
  visible: {
    type: Boolean,
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("models", SchemaModel)
