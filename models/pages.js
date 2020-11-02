const mongoose = require("mongoose")
var db = require("../config/db")
// 用户表
var SchemaPage = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  center: {
    type: String,
  },
  model_ids: {
    type: String,
  },
  point_ids:{
    type: String,
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("pages", SchemaPage)
