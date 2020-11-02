/** 方法说明
 * @method (time 时间格式化
 * @for 所属类名
 * @param{String}time     时间
 * @param{String}cFormat  时间格式
 * @return {String}       返回格式化的时间
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/** 方法说明
 * @method uuid 创建唯一ID
 * @for 所属类名
 * @return {String}   返回ID
 */
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

/** 方法说明
 * @method getType 获取文件后缀名
 * @for 所属类名
 * @param{String}file  文件名
 * @return {String}   返回文件后缀名
 */
function getType(file) {
  let filename = file;
  let fileArr = filename.split('.')
  return fileArr[fileArr.length - 1];
}

/** 方法说明
 * @method insterMySQL 插入数据库
 * @for 所属类名
 * @param{Object}files  文件信息
 * @param{String}path   文件路径
 * @param{Object}user   上传者信息
 * @return {String}   返回是否上传成功
 */
async function insterMySQL(files, path, user) {
  let file = files
  let values = [
    file.filename,          //filename
    file.mimetype,          //filetype
    getType(file.filename),                //fileext
    file.size,              //filesize
    (file.size / 1024 / 1024).toFixed(2) + 'M',
    //filesizecn
    path,                   //filepath
    user.id,                //optid
    user.username,          //optname
    new Date().getTime(),   //createdAt
    new Date().getTime()    //updateAt
  ];
  let sql = "insert into file_list set filename=?,filetype=?,fileext=?,filesize=?,filesizecn=?,filepath=?,optid=?,optname=?,createdAt=?,updateAt=?;";
  let fileMessage = await query(sql, values);
  if (fileMessage.affectedRows === 1 && fileMessage.insertId) {
    return true
  } else {
    return false
  }
}

const fs = require('fs');
const auth = require("@/middleware/auth2")
const query = require("@/config/controller");
let express = require('express');
let router = express.Router();
let multer = require('multer')
let ExifImage = require('exif').ExifImage;
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dirName = './public/uploads/' + parseTime(new Date(), '{y}-{m}-{d}')
    if (fs.existsSync(dirName)) {
      console.log('该路径已存在');
    } else {
      fs.mkdirSync(dirName)
    }
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, dirName);
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, uuid() + '-' + file.originalname);
  }
});
let upload = multer({
  storage: storage
})

/**
 * @api {get} /api2/file/getAllFileList 获取文件列表
 * @apiDescription 获取用户列表
 * @apiName getAllFileList
 * @apiGroup 文件
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code": 200,
 *  "content":
 *    [{
 *      "id": 1,
 *      "filename": "6412013e-c4d6-403f-8712-1bd20710dc6d-8572dfee0ab153b36c07bd274cebe20.jpg",
 *      "filetype": "image/jpeg",
 *      "fileext": "jpg",
 *      "filesize": 2761407,
 *      "filesizecn": "2.63M",
 *      "filepath": "http://10.25.106.117:3000/uploads/2020-09-28/6412013e-c4d6-403f-8712-1bd20710dc6d-8572dfee0ab153b36c07bd274cebe20.jpg",
 *      "optid": 5,
 *      "optname": "admin",
 *      "createdAt": "1601254659706",
 *      "updateAt": "1601254659706"
 *    }],
 *  "message": "success"
 * }
 * @apiSampleRequest /api2/file/getAllFileList
 * @apiVersion 2.0.0
 */
//  获取文件列表

router.get('/getAllFileList', auth, async (req, res) => {
  let sql = "select id,filename,filetype,fileext,filesize,filesizecn,filepath,optid,optname,createdAt,updateAt from file_list";
  let fileList = await query(sql);
  res.send({
    code: 200,
    content: fileList,
    message: 'success'
  })
})

/**
 * @api {get} /api2/file/uploadAvatar 上传头像
 * @apiDescription 上传头像
 * @apiName uploadAvatar
 * @apiGroup 文件
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code":200,
 *  "data":"",
 *  "message":"上传成功"
 *  }
 * @apiSampleRequest /api2/file/uploadAvatar
 * @apiVersion 2.0.0
 */

// 上传头像
// 如果一直出现500报错信息 Node Multer unexpected field 则需要如此操作
let avatar = upload.single('avatar')
router.post('/uploadAvatar', [auth, avatar], async (req, res, next) => {
  let pathArray = req.file.path.split('\\')
  pathArray.shift()
  let avatarPath = pathArray.join('/')
  avatarPath = 'http://bim.checc.com.cn/lzzAPI/' + avatarPath
  let moreData
  try {
    new ExifImage({image: req.file.path}, async function (error, exifData) {
      let message = await insterMySQL(req.file, avatarPath, req.user)
      if (!message) return false
      if (error) {
        console.log('Error: ' + error.message);
        let values = [avatarPath, req.user.id];
        let sql = "update user set avatar=? where id=?;"
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
        moreData = exifData
        let values = [avatarPath, req.user.id];
        let sql = "update user set avatar=? where id=?;"
        let result = await query(sql, values);
        if (result.affectedRows == 1) {
          res.send({
              code: 200,
              content: '修改成功',
              message: 'success'
            }
          )
        }

        // res.send({
        //     code: 200,
        //     data: {
        //       moreData,
        //       avatarPath: avatarPath
        //     },
        //     message: message
        //   }
        // )
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
  }
})
/**
 * @api {get} /api2/file/uploadAvatar 上传模型
 * @apiDescription 上传模型
 * @apiName uploadAvatar
 * @apiGroup 文件
 * @apiHeader authorization eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdjOTZhNTExNzdmNDIxY2ExNjI5NCIsImlhdCI6MTU5NjQ0Njc5MH0.ztinMsRDhVVKLh5GNbgngD7YsHOgj1OgCFYxz4V3MzM
 * @apiSuccess {number} code 具体请看
 * @apiSuccess {json} content
 * @apiSuccess {string} message
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "code":200,
 *  "data":"",
 *  "message":"上传成功"
 *  }
 * @apiSampleRequest /api2/file/uploadAvatar
 * @apiVersion 2.0.0
 */

// 上传头像
// 如果一直出现500报错信息 Node Multer unexpected field 则需要如此操作
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
// 上传文件
var otherFile = upload.single('otherFile')
router.post('/uploadOtherFile', [auth, otherFile], async (req, res, next) => {
  let pathArray = req.file.path.split('\\')
  pathArray.shift()
  let otherFilePath = pathArray.join('/')
  otherFilePath = 'http://10.25.106.117:3000/' + otherFilePath
  let message = await insterMySQL(req.file, otherFilePath, req.user)
  res.send({
      code: 200,
      data: '',
      message: message
    }
  )
})
module.exports = router;
