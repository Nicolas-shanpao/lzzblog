const mongoose = require("mongoose")
let db = require("../config/db")
// 用户表
let SchemaArticles = new mongoose.Schema({
  // 文章标题
  articleTitle: {
    type: String,
  },
  // 文章副标题
  articleSubtitle: {
    type: String,
  },
  // 文章内容
  articleContent: {
    type: String,
  },
  // 文章类型
  articleTag: {
    type: String,
  },
  // 文章标签
  articleTag: {
    tagId: {
      type: mongoose.Schema.Types.ObjectId
    },
    tagName: {
      type: String
    }
  },
  // 文章作者
  articleAuthor: {
    authorId: {
      type: String
    },
    authorName: {
      type: String
    }
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("articles", SchemaArticles)
