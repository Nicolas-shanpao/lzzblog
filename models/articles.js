const mongoose = require("mongoose")
let db = require("../config/db")
// 用户表
let SchemaArticle = new mongoose.Schema({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  content: {
    type: String
  },
  type: {
    type: Array
  },
  author: {
    type: ObjectId
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("articles", SchemaArticle)
