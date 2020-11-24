const Articles = require('@/models/articles')
const ArticleTypes = require('@/models/article_types')
const auth = require("@/middleware/auth")
let express = require('express');
let router = express.Router();
/**
 * @api {post} /api/articles/addArticle 新增文章
 * @apiDescription 新增文章
 * @apiName addArticle
 * @apiGroup Articles
 * @apiParam {string} articleTitle 文章标题
 * @apiParam {string} articleSubtitle 文章副标题
 * @apiParam {string} articleContent 文章内容
 * @apiParam {string} authorId 作者id
 * @apiParam {string} authorName 作者名字
 * @apiParam {string} updateAt 更新时间
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
// 新增文章
router.post('/addArticle', async (req, res) => {
  console.log(req.body);
  let newArticle = {
      articleTitle: req.body.articleTitle,
      articleSubtitle: req.body.articleSubtitle,
      articleContent: req.body.articleContent,
      articleTag: {
        tagId: req.body.tagId,
        tagName: req.body.tagName
      },
      articleAuthor: {
        authorId: req.body.authorId,
        authorName: req.body.authorName
      },
      updateAt: req.query.t
    }
  ;
  Articles.create(newArticle, async (err, val) => {
    if (err) {
      console.log('新增文章失败！' + err)
      res.send({
        code: 401,
        data: err,
        message: 'error'
      })
    } else {
      res.send({
        code: 200,
        data: val,
        message: '提交成功！'
      })
    }
  })
})

router.get('/articleList', async (req, res) => {
  ArticleTypes.find({}, {}, async (err, val) => {
    if (err) {
      console.log('获取失败！' + err)
      res.send({
        code: 401,
        data: err,
        message: 'error'
      })
    } else {
      let arr = []
      val.map(v => {
        v._id
        Articles.find({},{}, async (err, val) => {

        })
      })
      res.send({
        code: 200,
        data: val,
        message: '获取成功！'
      })
    }
  })
})

module.exports = router;
