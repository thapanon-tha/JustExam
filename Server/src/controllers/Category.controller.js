const stdCode = require('./stdError');
const Category = require('../services/category.service');
const db = require('../models/db');

module.exports = {

  async getAllCategory(req, res) {
    try {
      const data = await Category.getAll();
      if (data.length) { stdCode.querySuccess(data, res); } else stdCode.NotFound(data, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async addCategory(req, res) {
    const { name } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (!name.length) stdCode.Validation({ message: `invalid name: ${name}` }, res);
      const [data, created] = await Category.add(name, transaction);
      if (created) {
        await transaction.commit();
        stdCode.Created(data, res);
      } else {
        await transaction.rollback();
        stdCode.Validation({ message: `this Category name: ${name} already have` }, res);
      }
    } catch (e) {
      await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async getCategory(req, res) {
    const { ctid } = req.params;
    try {
      const data = await Category.getById(ctid);
      if (data.length) { stdCode.querySuccess(data, res); } else stdCode.NotFound(data, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  updateCategory(req, res) {
    stdCode.Unauthorized(stdCode.inCurrectPath(req), res);
  },

  deleteCategory(req, res) {
    stdCode.Unauthorized(stdCode.inCurrectPath(req), res);
  },

};
