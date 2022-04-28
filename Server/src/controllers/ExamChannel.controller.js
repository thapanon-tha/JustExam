const db = require('../models/db');
const examChannel = require('../services/examChannel.service');
const stdCode = require('./stdCode');

module.exports = {
  async getExamChannel(req, res) {
    const { cid } = req.params;
    try {
      const data = await examChannel.getExamChannel(cid);
      if (data) {
        stdCode.querySuccess(data, res);
      } else {
        stdCode.NotFound({ message: `Exam for cid: ${cid} Not Found` }, res);
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async addExamChannel(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    const { title, description, eid } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      await examChannel.deleteByCid(cid,transaction)
      const data = await examChannel.addExam(
        uid,
        cid,
        title,
        description,
        eid,
        transaction,
      );
      if (data) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error('Something Worng');
      }
    } catch (error) {
      await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async updateExamChannel(req, res) {
    const { ecid, cid } = req.params;
    const { title, description } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await examChannel
        .updateExamChannel(ecid, cid, title, description, transaction)
        .then((response) => {
          if (response[0]) {
            return examChannel.getExamChannel(cid);
          }
          return 0;
        });
      if (data) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error(`Can't Update ecid: ${ecid}`);
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async deleteExamChannel(req, res) {
    const { cid, ecid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await examChannel.delete(cid, ecid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        throw Error(`Can't Delete ecid: ${ecid}`);
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async totalPointChannel(req, res) {
    const { cid } = req.params;
    try {
      const data = await examChannel.totalPointChannel(cid);
      if (data[0].dataValues.totalPoint) {
        stdCode.querySuccess(data[0], res);
      } else {
        stdCode.querySuccess({ totalPoint: 0 }, res);
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },
};
