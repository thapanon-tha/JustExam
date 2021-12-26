const { Op } = require('sequelize');
const db = require('../models/db');

const Category = db.category;
const medthods = {

  async getAll() {
    return Category.findAll();
  },

  async getById(ctid) {
    return Category.findAll({
      where: { ctid },
    });
  },

  async add(name, transaction) {
    return Category.findOrCreate({
      where: { name },
      defaults: {
        name,
      },
      transaction,
    });
  },

};

module.exports = {
  ...medthods,
};
