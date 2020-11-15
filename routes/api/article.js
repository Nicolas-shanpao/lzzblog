const Articles = require('@/models/Articles')
const jwt = require('jsonwebtoken')
const SECRET = require("@/config/development")
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();

/**
 * @api {get} /api/article/articleList 获取文章列表
 * @apiDescription 获取文章列表
 * @apiName articleList
 * @apiGroup User
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "data": [
 *      {
 *          "userinfo": [
 *              "admin"
 *          ],
 *          "isDeleted": 0,
 *          "_id": "5f2290e7cf2a793e64e74201",
 *          "account": "g15",
 *          "introduction": "这个人很懒，啥也没留......",
 *          "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *          "nikename": "g15",
 *          "project": "g15",
 *          "__v": 0
 *      },
 *      {
 *          "roles": [
 *              "admin"
 *          ],
 *          "isDeleted": 0,
 *          "_id": "5f22910ccf2a793e64e74202",
 *          "account": "g360",
 *          "introduction": "这个人很懒，啥也没留......",
 *          "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *          "nikename": "g360",
 *          "project": "g360",
 *          "__v": 0
 *      }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api/article/articleList
 * @apiVersion 1.0.0
 */
//  获取文章列表
router.get('/articleList', auth, async (req, res) => {
  console.log(req);
  let type = req.body.type
  Articles.find({type: type}, {password: 0}, function (err, val) {
    if (err) {
      console.log('用户数据查找失败！' + err)
    } else {
      res.send({
        code: 200,
        data: val,
        message: 'success'
      })
    }
  })
})

/**
 * @api {post} /api/user/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} account 用户名-g15
 * @apiParam {string} password 密码-bim201818
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "data": {
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjI5MGU3Y2YyYTc5M2U2NGU3NDIwMSIsImlhdCI6MTU5NjQzOTYyMn0.kBDO6X4BAeR_UVSAx3istIUzo0hWGdBSWJGQMN_HCFk"
 *    },
 *  "message": "success"
 * }
 * @apiError {number} code 具体请看.
 * @apiError {string} data 用户名或密码错误.
 * @apiError {string} message error.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Not Found
 * {
 *   code: 401,
 *   data: '用户名或密码错误！',
 *   message: 'error'
 * }
 * @apiSampleRequest /api/user/login
 * @apiVersion 1.0.0
 */
// 登录
router.post('/login', async (req, res) => {
  console.log(req.body);
  const user = await Users.findOne({
    account: req.body.account
  })
  if (!user) {
    return res.send({
      code: 401,
      data: '用户名或密码错误！',
      message: 'error'
    })
  }
  if (user.isDeleted != 0) {

  }
  const isPasswordValid = require('bcrypt').compareSync(
    req.body.password,
    user.password
  )
  if (!isPasswordValid) {
    return res.send({
      code: 401,
      data: '用户名或密码错误！',
      message: 'error'
    })
  }
  const token = jwt.sign({
    id: String(user._id)
  }, SECRET)

  // 生成token
  res.send({
    code: 200,
    data: {token},
    message: 'success'
  })
})

module.exports = router;
