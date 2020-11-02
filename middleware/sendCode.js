let md5 = require('blueimp-md5')
let moment = require('moment')
let Base64 = require('js-base64').Base64;
let request = require('request');

/*
向指定号码发送指定验证码
 */
let sendCode = function (phone, code, callback) {
  //填写自己的信息
  let ACCOUNT_SID = '8a216da863f8e6c2016434cef70a1fcf';
  let AUTH_TOKEN = '2064d238c2754b7c8d037815f4bedab6';
  let Rest_URL = 'https://imapp.yuntongxun.com:8883';
  let AppID = '8a216da8754a45d50175531f1c100313';
  //1. 准备请求url
  /*
   1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
   时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
   2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
   */
  let sigParameter = '';
  let time = moment().format('YYYYMMDDHHmmss');
  sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time);
  let url = Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter;

  //2. 准备请求体
  let body = {
    to: phone,
    appId: AppID,
    templateId: '698924',
    "datas": [code, "10"]
  }
  //body = JSON.stringify(body);

  //3. 准备请求头
  /*
   1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
   2.冒号为英文冒号
   3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
   */
  let authorization = ACCOUNT_SID + ':' + time;
  authorization = Base64.encode(authorization);
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length + '',
    'Authorization': authorization
  }

  //4. 发送请求, 并得到返回的结果, 调用callback
  // callback(true);
  request({
    method: 'POST',
    url: url,
    headers: headers,
    body: body,
    json: true
  }, function (error, response, body) {
    console.log(body)
    callback(body.statusCode === '000000');
    // callback(true);
  });
}

module.exports = sendCode
