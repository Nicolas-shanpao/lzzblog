const mongoose = require("mongoose")
let db = require("../config/db")
// 用户表
let SchemaArticleTypes = new mongoose.Schema({
  // 标签名
  tagName: {
    type: String,
    required: true,
    unique: true //字段是否唯一
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("article_types", SchemaArticleTypes)
