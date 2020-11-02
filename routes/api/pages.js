const Pages = require('@/models/Pages')
const Models = require('@/models/models')
const Shuqians = require('@/models/point/shuqians')
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
//  新增页面
router.post('/addPage', auth, async (req, res) => {
  console.log(req.user._id);
  let newPage = {
    user_id: req.user._id,
    name: req.body.name,
    center: req.body.center,
    model_ids: req.body.model_ids,
    point_ids: req.body.point_ids,
  };
  console.log(newPage);
  Pages.create(newPage, async (err, val) => {
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
router.get('/getPageList', auth, async (req, res) => {
  Pages.find({user_id: req.user._id, isDeleted: 0}, function (err, val) {
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

// 生成需要的场景数据
router.get('/getPageDetail', auth, async (req, res) => {
  let page = await Pages.findOne({user_id: req.user._id, _id: req.query.id, isDeleted: 0})
  let model_ids = page.model_ids.split(',')
  let shuqian = await Shuqians.findOne({user_id: req.user._id, _id: page.center, isDeleted: 0})
  console.log(shuqian.data);
  let ModelList = await Models.find({_id: {$in: model_ids}});
  console.log(ModelList);
  res.send({
    code: 200,
    data: {page, shuqian, ModelList},
    message: 'success'
  })
})

module.exports = router;
