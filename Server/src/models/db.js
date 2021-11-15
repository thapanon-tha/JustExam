const Sequelize = require('sequelize');
const dbConfig = require('../configs/db.config');

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USERNAME,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    define: dbConfig.DB_DEFINE,
    timezone: '+07:00',
    logging: false,
  },
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(0);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./db/user.model')(sequelize, Sequelize);

module.exports = db;
