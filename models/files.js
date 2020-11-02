const mongoose = require("mongoose")
let db = require("../config/db")
// 用户表
let SchemaFile = new mongoose.Schema({
  filename: {
    type: String,
  },
  filetype: {
    type: String,
  },
  fileext: {
    type: String,
  },
  filesize: {
    type: String,
  },
  filesizecn: {
    type: String,
  },
  filepath: {
    type: String,
  },
  optid: {
    type: String,
  },
  optname: {
    type: String,
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("files", SchemaFile)
