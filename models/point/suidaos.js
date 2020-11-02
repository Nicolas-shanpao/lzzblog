//  隧道
const mongoose = require("mongoose")
var db = require("@/config/db")
// 用户表
var SchemaSuidao = new mongoose.Schema({
  // 公共属性
  user_id: {type: String, required: true},// 用户id  用来确定点位所属
  page_id: {type: String}, // 项目ID
  name: {type: String, required: true},// 隧道名称
  type: {type: String,},// 标注类型
  lng: {type: Number,}, // 经度
  lat: {type: Number,},// 纬度
  alt: {type: Number,},// 高程
  viewdata: {type: String,},// 视角数据
  remark: {type: String,},// 标注描述
  // 特有属性
  qdzh: {type: String,},// 起点桩号
  zdzh: {type: String,}, // 终点桩号
  sdcd: {type: String,},// 隧道长度
  dmmj: {type: String,},// 断面面积
  sdcdgm: {type: String,},// 隧道长度规模
  wz: {type: String,}, // 位置
  hdmbzxs: {type: String,}, // 横断面布置形式
  hzdj: {type: String,}, // 荷载等级
  fsdj: {type: String,}, // 防水等级
  kzlddj: {type: String,}, // 抗震烈度等级
  qadj: {type: String,}, // 安全等级
  sgff: {type: String,}, // 施工方法
  // 系统属性
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("suidaos", SchemaSuidao)
