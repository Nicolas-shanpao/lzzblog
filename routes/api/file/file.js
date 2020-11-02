const Users = require('@/models/Users')
const Models = require('@/models/models')
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, './public/uploads/avatar');
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({
  storage: storage
})
//如果一直出现500报错信息 Node Multer unexpected field 则需要如此操作
var avatar = upload.single('avatar')
router.post('/uploadAvatar', [auth, avatar], async (req, res, next) => {
  let pathArray = req.file.path.split('\\')
  pathArray.shift()
  let avatarPath = pathArray.join('/')
  const result = await Users.where({
    _id: req.user._id
  }).updateOne({
    avatar: avatarPath
  })
  console.log(result);
  if (result.nModified === 1) {
    res.send({
        code: 200,
        data: avatarPath,
        message: '修改成功!'
      }
    )
  }
})
// 上传模型
var model = upload.single('model')
router.post('/uploadModel', [auth, model], async (req, res, next) => {
  let pathArray = req.file.path.split('\\')
  pathArray.shift()
  let modelPath = pathArray.join('/')
  res.send({
      code: 200,
      data: modelPath,
      message: '修改成功!'
    }
  )
})
module.exports = router;
