var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

console.log("Environnement : " + env);
console.log("Root : " + rootPath);


var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wallboard-server'
    },
    port: process.env.PORT || 3001,
    db: 'sqlite://localhost/wallboard-server-development',
    storage: rootPath + '/data/wallboard-server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wallboard-server'
    },
    port: process.env.PORT || 3001,
    db: 'sqlite://localhost/wallboard-server-test',
    storage: rootPath + '/data/wallboard-server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wallboard-server'
    },
    port: process.env.PORT || 8080,
    db: 'sqlite://localhost/wallboard-server-production',
    storage: rootPath + 'data/wallboard-server-production'
  }
};

module.exports = config[env];
