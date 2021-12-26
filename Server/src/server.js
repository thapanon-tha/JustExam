require('dotenv').config({ path: '../.env' });

const express = require('express');

//! assign to next time
// const https = require('https');
const cors = require('cors');
/// ///////////////////////////////////////////
const session = require('express-session');
const passport = require('passport');

const jwtChecker = require('./middlewares/jwt');

const app = express();
const port = process.env.EXPOSE_PORT;
require('./configs/passport.config');

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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

const complieLangList = require('./models/Instances/complieLang');

db.category.create({
  ctid: 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940',
  name: 'testname',
}, { ignoreDuplicates: ['id'] });

db.user.create({
  uid: 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940',
  firstname: 'Thapanon',
  surname: 'Sodngam',
  email: 'thapanon.sod@gmail.com',
  type: 'student',
  provider: 'Google',
}, { ignoreDuplicates: ['id'] });
db.category.create({
  name: 'testCategory',
});
db.complieLang.bulkCreate(complieLangList, { ignoreDuplicates: ['id'] });

app.get('/test', jwtChecker, (req, res) => {
  res.status(200).json(req?.user);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use((req, res) => {
  res.status(501).send('incorrect path');
});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
