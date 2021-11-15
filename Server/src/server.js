const express = require('express');
//! assign to next time
// const https = require('https');
// const cors = require('cors');

require('dotenv').config({ path: '../.env' });

const port = process.env.EXPOSE_PORT;

const app = express();

const api = require('./apis/index.api');
const logger = require('./middlewares/auth/index');

app.use('/api', api);

//! Database sync
const db = require('./models/db');

db.sequelize.sync({ alter: true });

app.get('/', logger, (req, res) => {
  res.send(new Date());
});

app.use((req, res) => {
  res.status(501).send('incorrect path');
});

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
