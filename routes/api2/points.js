const Qiaoliangs = require('@/models/point/qiaoliangs')
const Handongs = require('@/models/point/handongs')
const Suidaos = require('@/models/point/suidaos')
const Fengxians = require('@/models/point/fengxians')
const Yinhuans = require('@/models/point/yinhuans')
const Jiankongs = require('@/models/point/jiankongs')
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
const f = require("@/middleware/function")
//  新增点位
/**
 * @api {post} /api2/point/addPoint 新增点位
 * @apiDescription 新增点位
 * @apiName addPoint
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} name 名称
 * @apiParam {string} type 类型
 * @apiParam {number} lng 经度
 * @apiParam {number} lat 纬度
 * @apiParam {number} alt 高程
 * @apiParam {string} viewdata 视角数据
 * @apiParam {string} remark 标注描述

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": {
 *   alt: -592.21,
 *   createdAt: "2020-08-03T06:22:09.441Z",
 *   isDeleted: 0,
 *   lat: 33.794301,
 *   lng: 116.893426,
 *   name: "隐患1",
 *   remark: "隐患1隐患1隐患1隐患1隐患1",
 *   type: "yh",
 *   user_id: "5f2290e7cf2a793e64e74201",
 *   viewdata: "{"y":25.532849,"x":115.323881,"z":1217493.68,"heading":359.2,"pitch":-53,"roll":0}",
 *   __v: 0,
 *   _id: "5f27ad115070a33860578648",
 *  },
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/addPoint
 * @apiVersion 2.0.0
 */
router.post('/addPoint', auth, async (req, res) => {
  let newPoint = {
    user_id: req.user._id,
    name: req.body.name,
    type: req.body.type,
    lng: req.body.lng,
    lat: req.body.lat,
    alt: req.body.alt,
    viewdata: req.body.viewdata,// 视角数据
    remark: req.body.remark,// 标注描述
    updateAt: req.query.t,
  };
  console.log(newPoint);
  if (newPoint.type === 'ql') {
    Qiaoliangs.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  } else if (newPoint.type === 'hd') {
    Handongs.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  } else if (newPoint.type === 'sd') {
    Suidaos.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  } else if (newPoint.type === 'fx') {
    Fengxians.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  } else if (newPoint.type === 'yh') {
    Yinhuans.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  } else if (newPoint.type === 'jk') {
    Jiankongs.create(newPoint, async (err, val) => {
      if (err) {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      } else {
        res.send({
          code: 200,
          data: val,
          message: 'success'
        })
      }
    })
  }
})
//  获取用户所有点位列表
/**
 * @api {get} /api2/point/getPointList 获取用户点位列表
 * @apiDescription 获取用户点位列表
 * @apiName getPointList
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/getPointList
 * @apiVersion 2.0.0
 */
router.get('/getPointList', auth, async (req, res) => {
  let ql = await Qiaoliangs.find({user_id: req.user._id, isDeleted: 0})
  let hd = await Handongs.find({user_id: req.user._id, isDeleted: 0})
  let sd = await Suidaos.find({user_id: req.user._id, isDeleted: 0})
  let fx = await Fengxians.find({user_id: req.user._id, isDeleted: 0})
  let yh = await Yinhuans.find({user_id: req.user._id, isDeleted: 0})
  let jk = await Jiankongs.find({user_id: req.user._id, isDeleted: 0})
  res.send({
    code: 200,
    data: [...f.geom(ql), ...f.geom(hd), ...f.geom(sd), ...f.geom(fx), ...f.geom(yh), ...f.geom(jk)],
    message: 'success'
  })
})
//  根据类型获取用户点位列表
/**
 * @api {get} /api2/point/getPointListByType  根据类型获取用户点位列表
 * @apiDescription  根据类型获取用户点位列表
 * @apiName getPointListByType
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} type 类型

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/getPointListByType
 * @apiVersion 2.0.0
 */
router.get('/getPointListByType', auth, async (req, res) => {
  let type = req.query.type
  let list = []
  if (type === 'ql') {
    list = await Qiaoliangs.find({user_id: req.user._id, isDeleted: 0})
  } else if (type === 'hd') {
    list = await Handongs.find({user_id: req.user._id, isDeleted: 0})
  } else if (type === 'sd') {
    list = await Suidaos.find({user_id: req.user._id, isDeleted: 0})
  } else if (type === 'fx') {
    list = await Fengxians.find({user_id: req.user._id, isDeleted: 0})
  } else if (type === 'yh') {
    list = await Yinhuans.find({user_id: req.user._id, isDeleted: 0})
  } else if (type === 'jk') {
    list = await Jiankongs.find({user_id: req.user._id, isDeleted: 0})
  }
  res.send({
    code: 200,
    data: f.geom(list),
    message: 'success'
  })
})
// 修改、编辑点位基本信息
/**
 * @api {post} /api2/point/editPointBasemsg  修改、编辑点位基本信息
 * @apiDescription  修改、编辑点位基本信息
 * @apiName editPointBasemsg
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} user_id: {type: String, required: true},// 用户id  用来确定点位所属
 * @apiParam {String} name 点位名称
 * @apiParam {string} type 标注类型
 * @apiParam {string} lng 经度
 * @apiParam {string} lat 纬度
 * @apiParam {string} alt 高程
 * @apiParam {string} viewdata 视角数据
 * @apiParam {string} remark 标注描述
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editPointBasemsg
 * @apiVersion 2.0.0
 */
router.post('/editPointBasemsg', auth, async (req, res) => {
  let type = req.body.type
  let list = []
  if (type === 'ql') {
    list = await Qiaoliangs.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.query.t,
    })
  } else if (type === 'hd') {
    list = await Handongs.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.body.updateAt,
    })
  } else if (type === 'sd') {
    list = await Suidaos.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.query.t,
    })
  } else if (type === 'fx') {
    list = await Fengxians.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.query.t,
    })
  } else if (type === 'yh') {
    list = await Yinhuans.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.query.t,
    })
  } else if (type === 'jk') {
    list = await Jiankongs.where({
      _id: req.body._id, isDeleted: 0
    }).updateOne({
      name: req.body.name,
      type: req.body.type,
      lng: req.body.lng,
      lat: req.body.lat,
      alt: req.body.alt,
      viewdata: req.body.viewdata,
      remark: req.body.remark,
      updateAt: req.query.t,
    })
  }
  res.send({
    code: 200,
    data: list,
    message: 'success'
  })
})
// 编辑桥梁信息
/**
 * @api {post} /api2/point/editQiaoliangDetail  编辑桥梁信息
 * @apiDescription  编辑桥梁信息
 * @apiName editQiaoliangDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {String} bkxx 布跨信息
 * @apiParam {string} gm  规模
 * @apiParam {string} gzxs  构造形式
 * @apiParam {string} hddj  航道等级形式
 * @apiParam {string} hzdj  荷载等级
 * @apiParam {string} kzlddj  抗震烈度等级
 * @apiParam {string} qc  桥长
 * @apiParam {string} qdzh  起点桩号
 * @apiParam {string} qk  桥宽
 * @apiParam {string} xjj  斜交角
 * @apiParam {string} zdzh  终点桩号
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editQiaoliangDetail
 * @apiVersion 2.0.0
 */
router.post('/editQiaoliangDetail', auth, async (req, res) => {
  let data = await Qiaoliangs.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    bkxx: req.body.bkxx,
    gm: req.body.gm,
    gzxs: req.body.gzxs,
    hddj: req.body.hddj,
    hzdj: req.body.hzdj,
    kzlddj: req.body.kzlddj,
    qc: req.body.qc,
    qdzh: req.body.qdzh,
    qk: req.body.qk,
    xjj: req.body.xjj,
    zdzh: req.body.zdzh,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
// 修改、编辑隧道信息
/**
 * @api {post} /api2/point/editSuidaoDetail  修改、编辑隧道信息
 * @apiDescription  修改、编辑隧道信息
 * @apiName editSuidaoDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} qdzh 起点桩号
 * @apiParam {string} zdzh 终点桩号
 * @apiParam {String} sdcd 隧道长度
 * @apiParam {string} dmmj 断面面积
 * @apiParam {string} sdcdgm 隧道长度规模
 * @apiParam {string} wz 位置
 * @apiParam {string} hdmbzxs 横断面布置形式
 * @apiParam {string} hzdj 荷载等级
 * @apiParam {string} fsdj 防水等级
 * @apiParam {string} kzlddj 抗震烈度等级
 * @apiParam {string} qadj 安全等级
 * @apiParam {string} sgff 施工方法
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editSuidaoDetail
 * @apiVersion 2.0.0
 */
router.post('/editSuidaoDetail', auth, async (req, res) => {
  let data = await Suidaos.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    qdzh: req.body.qdzh,
    zdzh: req.body.zdzh,
    sdcd: req.body.sdcd,
    dmmj: req.body.dmmj,
    sdcdgm: req.body.sdcdgm,
    wz: req.body.wz,
    hdmbzxs: req.body.hdmbzxs,
    hzdj: req.body.hzdj,
    fsdj: req.body.fsdj,
    kzlddj: req.body.kzlddj,
    qadj: req.body.qadj,
    sgff: req.body.sgff,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
// 修改、编辑涵洞信息
/**
 * @api {post} /api2/point/editHandongDetail  修改、编辑涵洞信息
 * @apiDescription  修改、编辑涵洞信息
 * @apiName editHandongDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} aqdj 安全等级
 * @apiParam {string} gnlx 功能类型
 * @apiParam {String} hdlx 涵洞类型
 * @apiParam {string} hzdj 荷载等级
 * @apiParam {string} kj 孔径
 * @apiParam {string} ks 孔数
 * @apiParam {string} kzlddj 抗震烈度等级
 * @apiParam {string} lxbh 路线编号
 * @apiParam {string} sgff 施工方法
 * @apiParam {string} sjhspl 设计洪水频率
 * @apiParam {string} sjll 设计流量
 * @apiParam {string} spjj 水平夹角
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editHandongDetail
 * @apiVersion 2.0.0
 */
router.post('/editHandongDetail', auth, async (req, res) => {
  let data = await Handongs.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    aqdj: req.body.aqdj,
    gnlx: req.body.gnlx,
    hdlx: req.body.hdlx,
    hzdj: req.body.hzdj,
    kj: req.body.kj,
    ks: req.body.ks,
    kzlddj: req.body.kzlddj,
    lxbh: req.body.lxbh,
    sgff: req.body.sgff,
    sjhspl: req.body.sjhspl,
    sjll: req.body.sjll,
    spjj: req.body.spjj,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
// 修改、编辑风险信息
/**
 * @api {post} /api2/point/editFengxianDetail  修改、编辑风险信息
 * @apiDescription  修改、编辑风险信息
 * @apiName editFengxianDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} name 名称
 * @apiParam {string} address 地址
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editFengxianDetail
 * @apiVersion 2.0.0
 */
router.post('/editFengxianDetail', auth, async (req, res) => {
  let data = await Fengxians.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    name: req.body.name,
    address: req.body.address,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
// 修改、编辑隐患信息
/**
 * @api {post} /api2/point/editYinhuanDetail  修改、编辑隐患信息
 * @apiDescription  修改、编辑隐患信息
 * @apiName editYinhuanDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} name 名称
 * @apiParam {string} address 地址
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editYinhuanDetail
 * @apiVersion 2.0.0
 */
router.post('/editYinhuanDetail', auth, async (req, res) => {
  let data = await Yinhuans.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    name: req.body.name,
    address: req.body.address,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
// 修改、编辑监控信息
/**
 * @api {post} /api2/point/editJiankongDetail  修改、编辑监控信息
 * @apiDescription  修改、编辑监控信息
 * @apiName editJiankongDetail
 * @apiGroup Point
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} name 名称
 * @apiParam {string} hdurl 地址
 * @apiParam {string} updateAt 修改时间

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": [
 *   {
 *     "isDeleted": 0,
 *     "_id": "5f27acea5070a33860578646",
 *     "user_id": "5f2290e7cf2a793e64e74201",
 *     "name": "监控1",
 *     "type": "jk",
 *     "lng": 115.866398,
 *     "lat": 33.95615,
 *     "alt": -589.9,
 *     "viewdata": "{\"y\":25.532849,\"x\":115.323881,\"z\":1217493.68,\"heading\":359.2,\"pitch\":-53,\"roll\":0}",
 *     "remark": "监控",
 *     "createdAt": "2020-08-03T06:21:30.748Z",
 *     "__v": 0
 *    }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/point/editJiankongDetail
 * @apiVersion 2.0.0
 */
router.post('/editJiankongDetail', auth, async (req, res) => {
  let data = await Jiankongs.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    name: req.body.name,
    hdurl: req.body.hdurl,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
module.exports = router;
