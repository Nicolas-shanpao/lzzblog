//  桥梁
const mongoose = require("mongoose")
var db = require("@/config/db")
// 用户表
var SchemaQiaoliang = new mongoose.Schema({
  // 公共属性
  user_id: {type: String, required: true}, // 用户id  用来确定点位所属
  page_id: {type: String},// 项目ID
  name: {type: String, required: true},// 点位名称
  type: {type: String},// 标注类型
  lng: {type: Number},// 经度
  lat: {type: Number},// 纬度
  alt: {type: Number}, // 高程
  viewdata: {type: String},// 视角数据
  remark: {type: String},// 标注描述
  // 特有属性
  bkxx: {type: String},// 布跨信息
  gm: {type: String},// 规模
  gzxs: {type: String},// 构造形式
  hddj: {type: String},// 航道等级形式
  hzdj: {type: String}, // 荷载等级
  kzlddj: {type: String},// 抗震烈度等级
  qc: {type: String},// 桥长
  qdzh: {type: String},// 起点桩号
  qk: {type: String},// 桥宽
  xjj: {type: String},// 斜交角
  zdzh: {type: String},// 终点桩号
  // 系统属性
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("qiaoliangs", SchemaQiaoliang)
