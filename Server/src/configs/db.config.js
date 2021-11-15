require('dotenv').config({ path: '../.env' });

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: 'mariadb',
  DB_DEFINE: {
    timestamps: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
      useUTC: false,
    },
  },
};
