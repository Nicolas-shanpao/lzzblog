const Models = require('@/models/models')
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
//  新增页面
router.post('/addModel', auth, async (req, res) => {
  console.log(req.user._id);
  let newModel = {
    user_id: req.user._id,
    name: req.body.name,
    type: req.body.type,
    url: req.body.url,
    offset: req.body.offset,
    visible: req.body.visible,
  };
  console.log(newModel);
  Models.create(newModel, async (err, val) => {
    if (err) {
      console.log(err);
      if (err.code == 11000) {
        res.send({
          code: 401,
          data: '项目名不能重复',
          message: 'error'
        })
      } else {
        res.send({
          code: 401,
          data: err,
          message: 'error'
        })
      }
    } else {
      res.send({
        code: 200,
        data: {val},
        message: 'success'
      })
    }
  })
})
//  获取用户页面列表
router.get('/getModelList', auth, async (req, res) => {
  Models.find({user_id: req.user._id, isDeleted: 0}, function (err, val) {
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
module.exports = router;
