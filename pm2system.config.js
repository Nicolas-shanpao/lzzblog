// pm2system.config.js
// 启动命令
// pm2 start pm2system.config.js
module.exports = {
  apps: [
    {
      name: 'gis-platform-express',//项目名称
      cwd: "./",// 当前工作路径
      script: './bin/www',// 实际启动脚本
      error_file: './error.log',    //错误日志文件输出路径
      out_file: './out.log',        //正确日志输出文件
      combine_logs: true,   //如果设置为true，则避免使用进程ID后缀日志文件
      merge_logs: true,   //combine_logs的别名
      autorestart: true,
      watch: true,// 监控变化的目录，一旦变化，自动重启
      watch_delay: 1000,
      ignore_watch: ["node_modules","error.log","out.log"],// 从监控目录中排除
      watch_options: {
        "followSymlinks": false,
        "usePolling": true,
      },
      exec_mode: "cluster_mode",                // 应用启动模式，支持fork和cluster模式
      instances: 2,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
      // max_memory_restart: 4,                    // 最大内存限制数，超出自动重启
      log_date_format: "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
      min_uptime: "60s",                        // 应用运行少于时间被认为是异常启动
      max_restarts: 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
      cron_restart: "",                         // crontab时间格式重启应用，目前只支持cluster模式;
      restart_delay: 60
    }
  ],
};
