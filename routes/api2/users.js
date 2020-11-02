const query = require("@/config/controller");
const request = require('request')
const jwt = require('jsonwebtoken')
const SECRET = require("@/config/development")
const redisClient = require("@/config/redis")
const auth = require("@/middleware/auth2")
const sendCode = require("@/middleware/sendCode")
const adminAuth = require("@/middleware/adminAuth")
const {Base64} = require('js-base64')
let express = require('express');
let router = express.Router();
/**
 * @api {post} /api2/user/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup 用户
 * @apiParam {string} username="g15" <code>必填</code>用户名-g15
 * @apiParam {string} password="bim201818" <code>必填</code>密码-bim201818
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "content": {
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjI5MGU3Y2YyYTc5M2U2NGU3NDIwMSIsImlhdCI6MTU5NjQzOTYyMn0.kBDO6X4BAeR_UVSAx3istIUzo0hWGdBSWJGQMN_HCFk"
 *    },
 *  "message": "success"
 * }
 * @apiError {number} code 具体请看.
 * @apiError {string} content 用户名或密码错误.
 * @apiError {string} message error.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Not Found
 * {
 *   code: 401,
 *   content: '用户名或密码错误！',
 *   message: 'error'
 * }
 * @apiSampleRequest /api2/user/login
 * @apiVersion 2.0.0
 */
// 登录
router.post('/login', async (req, res) => {
  let username = Base64.decode(req.body.username)
  let password = Base64.decode(req.body.password)
  if (username === '' || password === '') {
    return res.send({
      code: 401,
      content: '用户名或密码不能为空！',
      message: 'error'
    })
  }
  let values = [username];
  let sql
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (reg.test(username)) {
    sql = "select id,password,isDeleted from user where phone=?;";
  } else {
    sql = "select id,password,isDeleted from user where username=?;";
  }
  let user = await query(sql, values);
  console.log(!user);
  if (user.length === 0) {
    return res.send({
      code: 401,
      content: '用户名不存在！',
      message: 'error'
    })
  }
  if (user[0].isDeleted != 0) {

  }
  const isPasswordValid = require('bcrypt').compareSync(
    password,
    user[0].password
  )
  if (!isPasswordValid) {
    return res.send({
      code: 401,
      content: '用户名或密码错误！',
      message: 'error'
    })
  }
  const token = jwt.sign({
    id: String(user[0].id)
  }, SECRET)

  // 生成token
  res.send({
    code: 200,
    content: {token},
    message: 'success'
  })
})

/**
 * @api {get} /api2/user/userList 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName userList
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": [
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
 * @apiSampleRequest /api2/user/userList
 * @apiVersion 2.0.0
 */
//  获取用户列表
router.get('/userList', auth, async (req, res) => {
  let sql = "select id,username,roles,avatar,nikename,introduction,isDeleted from user";
  let user = await query(sql);
  res.send({
    code: 200,
    content: user,
    message: 'success'
  })
})

/**
 * @api {get} /api2/user/getUserinfo 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName getUserinfo
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/getUserinfo
 * @apiVersion 2.0.0
 */
// 获取用户信息
router.get('/getUserinfo', [auth], async (req, res) => {
  let values = [req.user.roles];
  let sql = "select routes from role where code in (?);";
  let resRolesList = await query(sql, values);
  let routesList = []
  resRolesList.map(v => {
    let routes = JSON.parse(v.routes)
    routesList = [...routesList, ...routes]
  })
  routesList = new Set(routesList)
  req.user.routes = [...routesList]
  res.send({
      code: 200,
      content: req.user,
      message: 'success'
    }
  )
})

/**
 * @api {post} /api2/user/signup 用户注册
 * @apiDescription 用户注册
 * @apiName signup
 * @apiGroup 用户
 * @apiParam {string} username 用户名
 * @apiParam {string} nikename 昵称
 * @apiParam {string} password 密码
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
 *    "username": "lzz"
 *  },
 *  "message": "注册成功！"
 * }
 * @apiSampleRequest /api2/user/signup
 * @apiVersion 2.0.0
 */
//  用户注册
router.post('/signup', async (req, res) => {
  let username = Base64.decode(req.body.username)
  let password = Base64.decode(req.body.password)
  let values1 = [username];
  let sql1 = "select id from user where username=?;";
  let user1 = await query(sql1, values1);
  console.log(username);
  if (user1.length === 0) {
    let values2 = [
      username,               //username
      req.body.nikename,      //nikename
      '["visitor"]',          //roles
      '',                     //phone
      '',                     //introduction
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',    //avatar
      require('bcrypt').hashSync(password, 10),
      new Date().getTime(),
      new Date().getTime()
    ];
    let sql2 = "insert into user set username=?,nikename=?,roles=?,phone=?,introduction=?,avatar=?,password=?,createdAt=?,updateAt=?;";
    let user2 = await query(sql2, values2);
    if (user2.affectedRows === 1) {
      res.send({
        code: 200,
        content: '注册成功',
        message: 'success'
      })
    } else {
      res.send({
        code: 201,
        content: '注册失败',
        message: 'error'
      })
    }
  } else {
    res.send({
      code: 201,
      content: '用户名已存在',
      message: 'error'
    })
  }
})

// javaAPI
router.post('/javaAPI', async (req, res) => {
  console.log(req);
  request('http://bim.checc.com.cn/baisha/bimelements/v1/api/ybgclc/getAllTreeList', (error, response, body) => {
    // console.log('error:', error); // 返回错误信息
    // console.log('statusCode:', response && response.statusCode); // 返回请求的状态码
    // console.log('body:', body); // 返回回来的数据
    console.log(JSON.parse(body));
    let content = JSON.parse(body)
    res.send({
      code: 200,
      content: [content.content],
      message: 'success'
    })
  })
})

/**
 * @api {get} /api2/user/getUserAddressList 获取用户通讯录
 * @apiDescription 获取用户通讯录
 * @apiName getUserAddressList
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/getUserAddressList
 * @apiVersion 2.0.0
 */
// 获取用户通讯录
router.get('/getUserAddressList', auth, async (req, res) => {
  let values = [req.body.id];
  let sql = "update user set nikename=?,introduction=?,roles=?, where id=?;"
  let user = await query(sql, values);
  res.send({
      code: 200,
      content: req.user,
      message: 'success'
    }
  )
})

/**
 * @api {get} /api2/user/getOtherUserInfo 获取其他用户信息
 * @apiDescription 获取其他用户信息
 * @apiName getOtherUserInfo
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/getOtherUserInfo
 * @apiVersion 2.0.0
 */
// 获取其他用户信息
router.get('/getOtherUserInfo', auth, async (req, res) => {
  let values = [req.query.id];
  let sql = "select id,username,roles,avatar,nikename,introduction from user where id=?;";
  let user = await query(sql, values);
  console.log(user[0])
  res.send({
      code: 200,
      content: user[0],
      message: 'success'
    }
  )
})

/**
 * @api {get} /api2/user/getAllUser 获取所有用户
 * @apiDescription 获取所有用户
 * @apiName getAllUser
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": [],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/user/getAllUser
 * @apiVersion 2.0.0
 */
// 获取所有用户
router.get('/getAllUser', auth, async (req, res) => {
  let sql = "select id,username,roles,avatar,nikename,introduction from user;";
  let userList = await query(sql);
  userList.map(v => {
    v.roles = JSON.parse(v.roles)
  })
  res.send({
      code: 200,
      content: userList,
      message: 'success'
    }
  )
})

/**
 * @api {post} /api2/user/updateUserInfo 修改用户信息
 * @apiDescription 修改用户信息
 * @apiName updateUserInfo
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/updateUserInfo
 * @apiVersion 2.0.0
 */
// 修改用户信息
router.post('/updateUserInfo', auth, async (req, res) => {
  console.log(req.body.nikename)
  let values = [req.body.nikename, req.body.introduction, req.user.id];
  let sql = "update user set nikename=?,introduction=? where id=?;"
  let result = await query(sql, values);
  console.log(result.affectedRows + '-------------')
  if (result.affectedRows == 1) {
    res.send({
        code: 200,
        content: '修改成功',
        message: 'success'
      }
    )
  }
})

/**
 * @api {get} /api2/user/updateUserRoles 更新用户权限
 * @apiDescription 更新用户权限
 * @apiName updateUserRoles
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/updateUserRoles
 * @apiVersion 2.0.0
 */
// 更新用户权限
router.post('/updateUserRoles', [auth, adminAuth], async (req, res) => {
  let valus = [req.body.roles, req.body.id]
  let sql = "update user set roles=? where id=?;";
  let result = await query(sql, valus);
  res.send({
      code: 200,
      content: result,
      message: 'success'
    }
  )
})

/**
 * @api {post} /api2/user/updateUserPassword 修改用户密码
 * @apiDescription 修改用户密码
 * @apiName updateUserPassword
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/updateUserPassword
 * @apiVersion 2.0.0
 */
// 修改用户密码
router.post('/updateUserPassword', auth, async (req, res) => {
  let oldPwd = Base64.decode(req.body.oldPwd)
  let newPwd = Base64.decode(req.body.newPwd)
  let values1 = [req.user.id];
  let sql1 = "select id,password,isDeleted from user where id=?;";
  let user = await query(sql1, values1);
  const isPasswordValid = require('bcrypt').compareSync(
    oldPwd,
    user[0].password
  )
  console.log(isPasswordValid)
  if (isPasswordValid) {
    let values = [require('bcrypt').hashSync(newPwd, 10), req.user.id];
    let sql = "update user set password=? where id=?;"
    let result = await query(sql, values);
    if (result.affectedRows == 1) {
      res.send({
          code: 200,
          content: '修改成功',
          message: 'success'
        }
      )
    }
  } else {
    res.send({
        code: 401,
        content: '原密码错误',
        message: 'error'
      }
    )
  }
})

/**
 * @api {post} /api2/user/resetPassword 密码重置
 * @apiDescription 密码重置
 * @apiName resetPassword
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/resetPassword
 * @apiVersion 2.0.0
 */
// 密码重置
router.post('/resetPassword', adminAuth, async (req, res) => {
  let values = [require('bcrypt').hashSync('123123', 10), req.body.id];
  let sql = "update user set password=? where id=?;"
  let result = await query(sql, values);
  if (result.affectedRows == 1) {
    res.send({
        code: 200,
        content: '重置成功',
        message: 'success'
      }
    )
  }
})

/**
 * @api {post} /api2/user/sendBCode 绑定验证码
 * @apiDescription 绑定验证码
 * @apiName sendBCode
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/sendBCode
 * @apiVersion 2.0.0
 */

/*
 生成指定长度的随机数
 */
function randomCode(length) {
  let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let result = ""; //统一改名: alt + shift + R
  for (let i = 0; i < length; i++) {
    let index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}

/**
 * @api {post} /api2/user/getCCode 获取验证码CCode
 * @apiDescription 获取验证码CCode
 * @apiName sendCgetCCode * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/getCCode
 * @apiVersion 2.0.0
 */
// 获取验证码CCode
router.post('/getCCode', auth, async (req, res) => {
  let phone
  let code = randomCode(6)
  let values = [req.user.id];
  let sql = "select phone from user where id=?;";
  let result = await query(sql, values)
  phone = result[0].phone
  sendCode(phone, code, function (response) {
    console.log(response + '-----------------');
    if (response) {
      // 测试
      redisClient.set(phone + '-C', code, function (err, obj) {
        console.log(err, obj + '-----------')
        console.log(null, 'OK')
      })
      redisClient.expire(phone + '-C', 600);
      res.send({
          code: 200,
          content: '发送成功',
          message: 'success'
        }
      )
    } else {
      res.send({
          code: 200,
          content: '发送失败',
          message: 'error'
        }
      )
    }
  })
})

/**
 * @api {post} /api2/user/bindUserPhone 绑定手机号
 * @apiDescription 绑定手机号
 * @apiName bindUserPhone
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/bindUserPhone
 * @apiVersion 2.0.0
 */
// 绑定手机号
router.post('/bindUserPhone', auth, async (req, res) => {
  let phone = req.body.phone
  let code = req.body.code
  console.log(req.body.code)
  redisClient.get(phone + '-B', async function (err, data) {
    console.log(data);         // 6
    if (code === data) {
      let values = [req.body.phone, req.user.id];
      let sql = "update user set phone=? where id=?;"
      let result = await query(sql, values);
      res.send({
          code: 200,
          content: result,
          message: 'success'
        }
      )
    } else {
      res.send({
          code: 200,
          content: '验证码错误',
          message: 'error'
        }
      )
    }
  })
})


/**
 * @api {post} /api2/user/getBCode 获取验证码BCode
 * @apiDescription 获取验证码BCode
 * @apiName sendCgetCCode * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/getBCode
 * @apiVersion 2.0.0
 */
// 获取验证码BCode
router.post('/getBCode', auth, async (req, res) => {
    let phone = req.body.phone
    let values1 = [phone];
    let sql1 = "select id from user where phone=?;";
    let phoneUser = await query(sql1, values1);
    if (phoneUser.length === 0) {
      let code = randomCode(6)
      sendCode(phone, code, function (response) {
        console.log(response + '-----------------');
        if (response) {
          // 测试
          redisClient.set(phone + '-B', code, function (err, obj) {
            console.log(err, obj + '-----------')
            console.log(null, 'OK')
          })
          redisClient.expire(phone + '-B', 600);
          res.send({
              code: 200,
              content: '发送成功',
              message: 'success'
            }
          )
        } else {
          res.send({
              code: 200,
              content: '发送失败',
              message: 'error'
            }
          )
        }
      })
    } else {
      res.send({
        code: 201,
        content: '手机号已被占用！',
        message: 'error'
      })
    }
  }
)


/**
 * @api {post} /api2/user/checkCCode 校验验证码CCode
 * @apiDescription 检查验证码真伪
 * @apiName checkChangeCode
 * @apiGroup 用户
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *  {
 *  "code": 200,
 *  "content": {
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
 * @apiSampleRequest /api2/user/checkCCode
 * @apiVersion 2.0.0
 */
// 校验验证码CCode
router.post('/checkCCode', auth, async (req, res) => {
  let phone
  let code = req.body.code
  let values = [req.user.id];
  let sql = "select phone from user where id=?;";
  let result = await query(sql, values)
  phone = result[0].phone
  redisClient.get(phone + '-C', async function (err, data) {
    console.log(data);         // 6
    if (code === data) {
      res.send({
          code: 200,
          content: result,
          message: 'success'
        }
      )
    } else {
      res.send({
          code: 200,
          content: '验证码错误!',
          message: 'error'
        }
      )
    }
  })
})
module.exports = router;
