const Users = require('@/models/Users')
const request = require('request')
const jwt = require('jsonwebtoken')
const SECRET = require("@/config/development")
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
/**
 * @api {post} /api/user/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup User
 * @apiParam {string} username 用户名-g15
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
    username: req.body.username
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

/**
 * @api {post} /api/user/signup 用户注册
 * @apiDescription 用户注册
 * @apiName signup
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} nikename 昵称
 * @apiParam {string} password 密码
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "data": {
 *    "username": "lzz"
 *  },
 *  "message": "注册成功！"
 * }
 * @apiSampleRequest /api/user/signup
 * @apiVersion 1.0.0
 */
//  用户注册
router.post('/signup', async (req, res) => {
  Users.findOne({username: req.body.username}, {}, async (err, val) => {
    if (err) {
      console.log('用户数据查找失败！' + err)
    } else {
      if (!val) {
        let newUser = {
          username: req.body.username,
          roles: ['admin'],
          introduction: "",
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          nikename: req.body.nikename,
          password: req.body.password
        };
        Users.create(newUser, async (err, val) => {
          if (err) {
            console.log('用户插入失败！' + err)
            res.send({
              code: 401,
              data: err,
              message: 'error'
            })
          } else {
            res.send({
              code: 200,
              data: {username: val.username},
              message: '注册成功！'
            })
          }
        })
      } else {
        res.send({
          code: 2001,
          data: "",
          message: '用户名已存在',
          type: 'warning',
        })
      }
    }
  })
})

/**
 * @api {get} /api/user/userList 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName userList
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
 *          "username": "g15",
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
 *          "username": "g360",
 *          "introduction": "这个人很懒，啥也没留......",
 *          "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *          "nikename": "g360",
 *          "project": "g360",
 *          "__v": 0
 *      }
 *  ],
 *  "message": "success"
 * }
 * @apiSampleRequest /api/user/userList
 * @apiVersion 1.0.0
 */
//  获取用户列表
router.get('/userList', auth, async (req, res) => {
  Users.find({}, {password: 0}, function (err, val) {
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
 * @api {get} /api/user/getUserinfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserinfo
 * @apiGroup User
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "data": {
 *      "roles": [
 *          "admin"
 *      ],
 *      "isDeleted": 0,
 *      "_id": "5f22910ccf2a793e64e74202",
 *      "username": "g15",
 *      "introduction": "这个人很懒，啥也没留......",
 *      "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
 *      "nikename": "g15",
 *      "project": "g15",
 *      "__v": 0
 *  },
 *  "message": "success"
 * }
 * @apiSampleRequest /api/user/getUserinfo
 * @apiVersion 1.0.0
 */
// 获取用户信息
router.get('/getUserinfo', auth, async (req, res) => {
  console.log(req.user);
  res.send({
      code: 200,
      data: req.user,
      message: 'success'
    }
  )
})

/**
 * @api {post} /api/user/changeUserinfo 修改用户信息
 * @apiDescription 修改用户信息
 * @apiName changeUserinfo
 * @apiGroup User
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM

 * @apiParam {string} nikename 昵称
 * @apiParam {string} avatar 头像
 * @apiParam {string} introduction 简介
 * @apiParam {string} roles 权限

 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} data
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "data": {
 *    "username": "lzz"
 *  },
 *  "message": "注册成功！"
 * }
 * @apiSampleRequest /api/user/changeUserinfo
 * @apiVersion 1.0.0
 */
//  修改用户信息
router.post('/changeUserinfo', auth, async (req, res) => {
  console.log(req.user._id);
  const result = await Users.where({
    _id: req.user._id
  }).updateOne({
    nikename: req.body.nikename,
    avatar: req.body.avatar,
    introduction: req.body.introduction,
    roles: req.body.roles,
  })
  if (result.nModified === 1) {
    res.send({
        code: 200,
        data: {},
        message: '修改成功'
      }
    )
  } else {
    res.send({
        code: 401,
        data: result,
        message: '修改失败'
      }
    )
  }
})

// javaAPI
router.post('/javaAPI', async (req, res) => {
  console.log(req);
  request('http://bim.checc.com.cn/baisha/bimelements/v1/api/ybgclc/getAllTreeList', (error, response, body) => {
    // console.log('error:', error); // 返回错误信息
    // console.log('statusCode:', response && response.statusCode); // 返回请求的状态码
    // console.log('body:', body); // 返回回来的数据
    console.log(JSON.parse(body))
    let data = JSON.parse(body)
    res.send({
      code: 200,
      data: [data.content],
      message: 'success'
    })
  })
})

module.exports = router;
