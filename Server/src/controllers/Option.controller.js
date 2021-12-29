const db = require('../models/db');
const Option = require('../services/option.service');
const stdError = require('./stdError');
const stdCode = require('./stdError');

module.exports = {

  async getOption(req, res) {
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const { cid } = req.params;
    try {
      const data = await Option.getOption(cid, uid);
      if (data.length !== 0) {
        stdError.querySuccess(data, res);
      } else {
        stdError.NotFound({ message: `option for cid: ${cid} or uid in correct` }, res);
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async addOption(req, res) {
    const { data } = req.body;
    const { cid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const response = await Option.createMany(data.map((arr) => ({ cid, otid: arr.otid })), transaction);
      await transaction.commit();
      stdError.querySuccess(response, res);
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async updateOption(req, res) {
    const { data } = req.body;
    const { cid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const response = await Promise.all([Option.deleteAllByCid(cid, transaction), Option.createMany(data, transaction)]);
      if (response.length !== 0) {
        await transaction.commit();
        stdError.querySuccess(response[1].map((resp) => resp[0]), res);
      } else {
        if (transaction) await transaction.rollback();
        stdError.NotFound({ message: `option for cid: ${cid} or uid in correct` }, res);
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async deleteOption(req, res) {
    const { oid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Option.deleteById(oid, transaction);
      if (data) {
        await transaction.commit();
        stdError.Success(res);
      } else {
        throw Error('somethong worng');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
