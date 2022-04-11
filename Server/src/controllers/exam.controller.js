const Exam = require('../services/exam.service');
const stdCode = require('./stdCode');
const db = require('../models/db');

module.exports = {
  async addExam(req, res) {
    const { uid } = req.user;
    const { body } = req;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const { description, shareQ, shareQA } = body.data;
      const ctid = body.data?.ctid;
      const title = body.data?.title;

      if (
        uid === undefined
        || uid.length === 0
        || title === undefined
        || title.length === 0
      ) {
        stdCode.Validation({ message: 'invalid input' }, res);
      } else {
        const data = await Exam.addExam(
          uid,
          ctid,
          title,
          description,
          shareQ,
          shareQA,
          transaction,
        );
        await transaction.commit();
        stdCode.Created(data, res);
      }
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      stdCode.Unexpected(e, res);
    }
  },

  async getAllExam(req, res) {
    const { uid } = req.user;
    try {
      const data = await Exam.getExamByOwner(uid);
      if (data.length) {
        stdCode.querySuccess(data, res);
      } else stdCode.NotFound(data, res);
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async getExam(req, res) {
    const { eid } = req.params;
    const { uid } = req.user;
    try {
      const data = await Exam.getById(eid, uid);
      if (data.length) {
        stdCode.querySuccess(data, res);
      } else {
        stdCode.NotFound(data, res);
      }
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  async updateExam(req, res) {
    const { eid } = req.params;
    const { uid } = req.user;
    const shareQA = req.body.data?.shareQA;
    const ctid = req.body.data?.ctid;
    const title = req.body.data?.title;
    const description = req.body.data?.description;
    const shareQ = req.body.data?.shareQ;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) stdCode.Validation({ message: `title ${title} Invalid` }, res);
      const updateResult = await Exam.updateExam(
        eid,
        uid,
        ctid,
        title,
        description,
        shareQ,
        shareQA,
        transaction,
      );
      if (updateResult[0]) {
        await transaction.commit();
        const data = await Exam.getById(eid, uid);
        stdCode.querySuccess(data, res);
      } else {
        throw Error(`can't found eid : ${eid} or Invalid uid`);
      }
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      stdCode.Unexpected(e, res);
    }
  },

  async deleteExam(req, res) {
    const { eid } = req.params;
    const { uid } = req.user;
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
      if (transaction) {
        await transaction.rollback();
      }
      stdCode.Unexpected(e, res);
    }
  },
};
