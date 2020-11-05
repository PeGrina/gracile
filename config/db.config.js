const Config = require('../core/lib/Config');

const DBConfig = new Config({
  config: {
    dbType: 'mongo',
    uri: 'mongo://localhost:27017/gracile',
    username: '',
    password: ''
  },
  private: ['username', 'password']
});

module.exports = DBConfig;
