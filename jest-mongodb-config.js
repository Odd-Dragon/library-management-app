const env = require('dotenv').config();

module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '4.0.3',
        skipMD5: true,
      },
      instance: {
        dbName: 'jest',
      },
      autoStart: false,
    },
    mongoURLEnvName: env.MONGODB_URI,
  };