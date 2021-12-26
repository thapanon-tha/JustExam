const Exam = require('../services/exam.service');
const stdCode = require('./stdError');
const db = require('../models/db');

module.exports = {

  async addExam(req, res) {
    const { body } = req;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const {
        description,
        shareQ,
        shareQA,
      } = body.data;
      const uid = body.data?.uid;
      const ctid = body.data?.ctid;
      const title = body.data?.title;

      if (uid === undefined || uid.length === 0 || title === undefined || title.length === 0) {
        stdCode.Validation({ message: 'invalid input' }, res);
      } else {
        const data = await Exam.addExam(uid, ctid, title, description, shareQ, shareQA, transaction);
        await transaction.commit();
        stdCode.Created(data, res);
      }
    } catch (e) {
      if (transaction) { await transaction.rollback(); }
      stdCode.Unexpected(e, res);
    }
  },

  async getAllExam(req, res) {
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    try {
      const data = await Exam.getExamByOwner(uid);
      // console.log(data.length);
      if (data.length) { stdCode.querySuccess(data, res); } else stdCode.NotFound(data, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async getExam(req, res) {
    const { eid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31941' || req.user.uid;
    try {
      const data = await Exam.getById(eid, uid);
      if (data.length) { stdCode.querySuccess(data, res); } else { stdCode.NotFound(data, res); }
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async updateExam(req, res) {
    const { eid } = req.params;
    const {
      uid, ctid, title, description, shareQ, shareQA,
    } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) stdCode.Validation({ message: `title ${title} Invalid` }, res);
      const updateResult = await Exam.updateExam(eid, uid, ctid, title, description, shareQ, shareQA, transaction);
      if (updateResult[0]) {
        await transaction.commit();
        const data = await Exam.getById(eid, uid);
        stdCode.querySuccess(data, res);
      } else {
        throw Error(`can't found eid : ${eid} or Invalid uid`);
      }
    } catch (e) {
      if (transaction) { await transaction.rollback(); }
      stdCode.Unexpected(e, res);
    }
  },

  async deleteExam(req, res) {
    const { eid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Exam.deleteById(eid, uid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        stdCode.NotFound({ message: `Not Found eid: ${eid}` }, res);
      }
    } catch (e) {
      if (transaction) { await transaction.rollback(); }
      stdCode.Unauthorized(e, res);
    }
  },

};
