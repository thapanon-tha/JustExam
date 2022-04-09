require('dotenv').config({ path: '../../.env' });

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.MYSQL_USER,
  DB_PASSWORD: process.env.MYSQL_PASSWORD,
  DB_NAME: process.env.MYSQL_DATABASE,
  DB_DIALECT: 'mysql',
  DB_DEFINE: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
      useUTC: false,
    },
  },
};
