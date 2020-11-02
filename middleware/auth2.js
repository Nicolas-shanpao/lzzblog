const query = require("../config/controller");
const jwt = require('jsonwebtoken')
const SECRET = require("../config/development")
let auth = async (req, res, next) => {
  const token = String(req.headers.authorization).split(' ').pop();
  // 验证
  if (token) {
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        return res.send({
          code: 401,
          success: false,
          message: 'token认证失败！'
        });
      } else {
        // 如果验证通过，在req中写入解密结果
        const {id} = decoded
        let values = [id];
        let sql = "select id,username,roles,phone,avatar,nikename,introduction from user where id=?;";
        let userList = await query(sql, values)
        console.log(userList[0])
        let user = userList[0]
        user.roles = JSON.parse(userList[0].roles)
        let strNum = user.phone
        if(strNum){
          let strNum2 = strNum.substr(0, 3) + '****' + strNum.substr(7)
          user.phone = strNum2
        }
        console.log(user)
        req.user = user
        next(); //继续下一步路由
      }
    })
  } else {
    // 没有拿到token 返回错误
    return res.send({
      code: 403,
      success: false,
      message: '没有找到token.'
    });
  }
}
module.exports = auth
