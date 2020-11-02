const redis = require('redis')

// c创建客户端

// const redisClient = redis.createClient(6379, '127.0.0.1')
const redisClient = redis.createClient({host: '127.0.0.1', port: 6379, detect_buffers: true})
redisClient.on('error', err => {
  console.log(err)
})

module.exports = redisClient
