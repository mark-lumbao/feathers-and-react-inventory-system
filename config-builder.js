const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-var-requires
require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires

const defaultConfig = JSON.stringify({
  host: process.env.HOST,
  port: process.env.PORT,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50
  },
  authentication: {
    entity: 'user',
    service: 'api/users',
    secret: process.env.AUTH_SECRET,
    authStrategies: [
      'jwt',
      'local'
    ],
    jwtOptions: {
      header: {
        typ: 'access'
      },
      audience: process.env.HOST,
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'email',
      passwordField: 'password'
    },
  },
  mongodb: process.env.MONGO_DB_CONN
});

const productionConfig = JSON.stringify({
  host: process.env.HOST,
  port: process.env.PORT,
});

const testConfig = JSON.stringify({});

// create config dir
if (!fs.existsSync('./config')) {
  try {
    fs.mkdirSync('./config');
  } catch (error) {
    console.log('ERROR writing config directory.', error);
  }
}

const createJsonFile = (config, name) => {
  fs.writeFile(`./config/${name}.json`, config, 'utf8', (err) => {
    if (err) {
      console.log(`An error occured while writing JSON Object to ${name}.json`);
      return console.log(err);
    }
    return console.log(`${name}.json file has been saved.`);
  });
};

createJsonFile(defaultConfig, 'default');
createJsonFile(productionConfig, 'production');
createJsonFile(testConfig, 'test');
