require('dotenv').config({ path: '../.env' });

const express = require('express');

//! assign to next time
// const https = require('https');
const cors = require('cors');
/// ///////////////////////////////////////////
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const redis = require('redis');
const jwtChecker = require('./middlewares/jwt');

let redisClient = null;
async function connect() {
  // Add your cache name and access key.
  redisClient = redis.createClient({
    url: 'redis://je-casch.redis.cache.windows.net:6380',
    password: 'RWdHLf85B6jK1eRaUTOMyEzKQfBbLdiFoAzCaKECX84=',
    tls: { servername: 'je-casch.redis.cache.windows.net' },
  });
  await redisClient.connect();

  // Perform cache operations using the cache connection object...

  // Simple PING command
  console.log('\nCache command: PING');
  console.log(`Cache response : ${await redisClient.ping()}`);

  // Simple get and put of integral data types into the cache
  console.log('\nCache command: GET Message');
  console.log(`Cache response : ${await redisClient.get('FOR_NEW')}`);

  console.log('\nCache command: SET Message');
  console.log(
    `Cache response : ${await cacheConnection.set('FOR_NEW', 'NEW_NA_HEE')}`,
  );

  // Demonstrate "SET Message" executed as expected...
  console.log('\nCache command: GET Message');
  console.log(`Cache response : ${await cacheConnection.get('FOR_NEW')}`);

  console.log('\nDone');
  process.exit();
}

connect();

const app = express();
const port = process.env.EXPOSE_PORT;
require('./configs/passport.config');

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  next();
});

const stdCode = require('./controllers/stdCode');
const api = require('./router/index');

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', api);

//! Database sync
const db = require('./models/db');

db.sequelize.sync({ alter: true });

app.use((req, res) => {
  stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
});

app.listen(port, () => {
  console.log(process.env.REDISCACHEHOSTNAME);
  console.log(`server run on port ${port}`);
});

// * create inttance
// ! create inttance
// ? create inttance
const complieLangList = require('./models/Instances/complieLang');
const questionType = require('./models/Instances/questionTypes');
const role = require('./models/Instances/role');
const optionType = require('./models/Instances/optionType');

db.category.create(
  {
    ctid: 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940',
    name: 'testname',
  },
  { ignoreDuplicates: ['id'] },
);

db.user.create(
  {
    uid: 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940',
    firstname: 'Thapanon',
    surname: 'Sodngam',
    email: 'thapanon.sod@gmail.com',
    type: 'student',
    provider: 'Google',
  },
  { ignoreDuplicates: ['id'] },
);

db.questionType.bulkCreate(questionType, { ignoreDuplicates: ['id'] });
db.complieLang.bulkCreate(complieLangList, { ignoreDuplicates: ['id'] });
db.role.bulkCreate(role, { ignoreDuplicates: ['id'] });
db.optionType.bulkCreate(optionType, { ignoreDuplicates: ['id'] });
