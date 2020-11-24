const ArticleTypes = require('@/models/article_types')
let express = require('express');
let router = express.Router();
/**
 * @api {post} /api/articleTypes/addArticleType 新增文章
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
router.post('/addArticleType', async (req, res) => {
  console.log(req.body);
  let newType = {
      tagName: req.body.tagName,
      updateAt: req.query.t
    }
  ;
  ArticleTypes.create(newType, async (err, val) => {
    if (err) {
      console.log('新增类型失败！' + err)
      res.send({
        code: 401,
        data: err,
        message: 'error'
      })
    } else {
      res.send({
        code: 200,
        data: val,
        message: '新增类型成功！'
      })
    }
  })
})

module.exports = router;
