const db = require('../models/db');

const { examChannel, questionExamChannel } = db;

const medthods = {

  async addExam(uid, cid, title, description, eid, transection) {
    return examChannel.create({
      uid,
      cid,
      title,
      description,
      eid,
    }, { transection });
  },

  async getExamChannel(cid) {
    return examChannel.findOne({
      where: { cid },
    });
  },

  async updateExamChannel(ecid, cid, title, description, transaction) {
    return examChannel.update({
      title,
      description,
    }, { where: { ecid, cid } }, { transaction });
  },

  async deleteByCid(cid, transaction) {
    return examChannel.destroy({ where: { cid } }, { transaction });
  },

  async delete(cid, ecid, transaction) {
    return examChannel.destroy({ where: { ecid, cid } }, { transaction });
  },

  async totalPointChannel(cid) {
    return examChannel.findAll({
      attributes: [
        [db.sequelize.fn('SUM', db.sequelize.col('questionExamChannels.point')), 'totalPoint'],
      ],
      include: {
        model: questionExamChannel,
        attributes: [],
      },
      where: { cid },
    });
  },

};

module.exports = {
  ...medthods,
};
