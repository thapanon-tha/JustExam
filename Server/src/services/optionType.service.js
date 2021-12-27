const db = require('../models/db');

const { optionType } = db;

const medthods = {
  async getAllOptionType() {
    return optionType.findAll();
  },

};

module.exports = {
  ...medthods,
};
