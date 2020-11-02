const mongoose = require("mongoose")
let db = require("../config/db")
// 用户表
let SchemaUser = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true //字段是否唯一
  },
  nikename: {
    type: String,
  },
  roles: {
    type: Array,
  },
  introduction: {
    type: String,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    set(val) {
      // 通过bcrypt对密码加密返回值 第一个值返回值， 第二个密码强度
      return require('bcrypt').hashSync(val, 10)
    }
  },
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("users", SchemaUser)
