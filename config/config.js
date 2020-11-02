const mysql = require("mysql")
const config = {
  // 数据库配置(线上)
  database: {
    DATABASE: "lzztest",
    USERNAME: "rootbim",
    PASSWORD: "RootBim2020!@#$",
    PORT: "3306",
    HOST: "localhost"
  },
  // 数据库配置(本地)
  // database: {
  //   DATABASE: "lzztest",
  //   USERNAME: "root",
  //   PASSWORD: "RootBim2020!@#$",
  //   PORT: "3306",
  //   HOST: "localhost"
  // }
};
let pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});
module.exports = pool
