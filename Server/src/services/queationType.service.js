const db = require('../models/db');

const { questionType } = db;

const medthods = {
  async getAll() {
    return questionType.findAll();
  },

};

module.exports = {
  ...medthods,
};
