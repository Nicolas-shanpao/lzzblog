//  涵洞
const mongoose = require("mongoose")
var db = require("@/config/db")
// 用户表
var SchemaHandong = new mongoose.Schema({
  // 公共属性
  user_id: {type: String, required: true},// 用户id  用来确定点位所属
  page_id: {type: String}, // 项目ID
  name: {type: String, required: true},// 点位名称
  type: {type: String,},// 标注类型
  lng: {type: Number,}, // 经度
  lat: {type: Number,},// 纬度
  alt: {type: Number,},// 高程
  viewdata: {type: String,},// 视角数据
  remark: {type: String,},// 标注描述
  // 特有属性
  aqdj: {type: String,},// 安全等级
  gnlx: {type: String,}, // 功能类型
  hdlx: {type: String,},// 涵洞类型
  hzdj: {type: String,},// 荷载等级
  kj: {type: String,},// 孔径
  ks: {type: String,}, // 孔数
  kzlddj: {type: String,}, // 抗震烈度等级
  lxbh: {type: String,}, // 路线编号
  sgff: {type: String,}, // 施工方法
  sjhspl: {type: String,}, // 设计洪水频率
  sjll: {type: String,}, // 设计流量
  spjj: {type: String,}, // 水平夹角
  // 系统属性
  createdAt: {type: String, default: new Date().getTime()},  //创建时间
  updateAt: {type: String},  //更新时间
  isDeleted: {type: Number, default: 0},  // 是否删除
})
module.exports = db.model("handongs", SchemaHandong)
