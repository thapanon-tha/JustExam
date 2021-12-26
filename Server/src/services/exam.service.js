const db = require('../models/db');

const { Op } = db.Sequelize;
const Exam = db.exam;

const medthods = {
  async getExamByOwner(uid) {
    return Exam.findAll({
      where: { uid },
    });
  },

  async getById(eid, uid) {
    return Exam.findAll({
      where: {
        [Op.and]: [
          { eid },
          {
            [Op.or]: [
              { shareQ: 1 },
              { uid },
            ],
          },
        ],
      },
    });
  },

  async addExam(uid, ctid, title, description, shareQ, shareQA, transection) {
    return Exam.create({
      uid,
      ctid,
      title,
      description,
      shareQ,
      shareQA,
    }, { transection });
  },

  async updateExam(eid, uid, ctid, title, description, shareQ, shareQA, transaction) {
    return Exam.update({
      ctid,
      title,
      description,
      shareQ,
      shareQA,
    }, { where: { eid, uid } }, { transaction });
  },

  async deleteById(eid, uid, transaction) {
    return Exam.destroy({
      where: { eid, uid },
    }, { transaction });
  },
};

module.exports = {
  ...medthods,
};
