const redis = require('redis');
const baseConfig = require('./development');

// c创建客户端
const redisClient = redis.createClient({
  host: baseConfig.HOST,
  port: 6379,
  detect_buffers: true,
  auth_pass: 'ACElzz2018.'
});
redisClient.on('ready', res => {
  console.log(res)
});
redisClient.on('error', err => {
  console.log(err)
});

module.exports = redisClient;
