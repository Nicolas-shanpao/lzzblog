const env = 'test'
const configList = {
  test: {
    SECRET: 'SECRET',
    HOST: '81.70.91.76'
  },
  online: {
    SECRET: 'SECRET',
    HOST: '81.70.91.76'
  }
};
const baseConfig = configList[env];
module.exports = baseConfig;
