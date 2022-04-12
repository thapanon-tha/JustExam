const db = require('../models/db');
const Option = require('../services/option.service');
const stdCode = require('./stdCode');

module.exports = {
  async getOption(req, res) {
    const { uid } = req.user;
    const { cid } = req.params;
    try {
      const data = await Option.getOption(cid, uid);
      if (data.length !== 0) {
        stdCode.querySuccess(data, res);
      } else {
        stdCode.NotFound(
          { message: `option for cid: ${cid} or uid in correct` },
          res,
        );
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
      const response = await Option.createMany(
        data.map((arr) => ({ cid, otid: arr.otid })),
        transaction,
      );
      await transaction.commit();
      stdCode.querySuccess(response, res);
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
      const response = await Promise.all([
        Option.deleteAllByCid(cid, transaction),
        Option.createMany(data, transaction),
      ]);
      if (response.length !== 0) {
        await transaction.commit();
        stdCode.querySuccess(
          response[1].map((resp) => resp[0]),
          res,
        );
      } else {
        if (transaction) await transaction.rollback();
        stdCode.NotFound(
          { message: `option for cid: ${cid} or uid in correct` },
          res,
        );
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
        stdCode.Success(res);
      } else {
        throw Error('somethong worng');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
