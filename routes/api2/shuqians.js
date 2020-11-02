const ShuQians = require('@/models/point/shuqians')
const query = require("@/config/controller");
const auth = require("@/middleware/auth2")
let express = require('express');
let router = express.Router();
//  新增书签
/**
 * @api {post} /api2/shuqian/addShuqian 新增书签
 * @apiDescription addShuqian
 * @apiName addShuqian
 * @apiGroup Shuqian
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
 * @apiSampleRequest /api2/shuqian/addShuqian
 * @apiVersion 2.0.0
 */
router.post('/addShuqian', auth, async (req, res) => {
  let values = [
    req.user.id,     //account
    req.body.name,    //nikename
    req.body.data,    //nikename
    new Date().getTime(),
    new Date().getTime()
  ];
  let sql = "insert into shuqian set user_id=?,name=?,data=?,createdAt=?,updateAt=?;";
  let shuqian = await query(sql, values);
  res.send({
    code: 200,
    data: shuqian,
    message: 'success'
  })
})
//  获取用户所有书签视角
/**
 * @api {get} /api2/shuqian/getShuqianList 获取用户所有书签视角
 * @apiDescription 获取用户所有书签视角
 * @apiName getShuqianList
 * @apiGroup Shuqian
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
 * @apiSampleRequest /api2/shuqian/getShuqianList
 * @apiVersion 2.0.0
 */
router.get('/getShuqianList', auth, async (req, res) => {
  let sql = "select * from shuqian";
  let list = await query(sql);
  res.send({
    code: 200,
    data: list,
    message: 'success'
  })
})
// 修改、编辑书签信息
/**
 * @api {post} /api2/shuqian/editShuqianDetail  修改、编辑书签信息
 * @apiDescription  修改、编辑书签信息
 * @apiName editShuqianDetail
 * @apiGroup Shuqian
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} name 名称
 * @apiParam {string} data 数据
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
 * @apiSampleRequest /api2/shuqian/editShuqianDetail
 * @apiVersion 2.0.0
 */
router.post('/editShuqianDetail', auth, async (req, res) => {
  let data = await ShuQians.where({
    _id: req.body._id, isDeleted: 0
  }).updateOne({
    name: req.body.name,
    data: req.body.data,
    updateAt: req.query.t,
  })
  res.send({
    code: 200,
    data: data,
    message: 'success'
  })
})
module.exports = router;
