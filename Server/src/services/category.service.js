const db = require('../models/db');

const Exam = db.exam;
const User = db.user;

const medthods = {
  async updateById(uid) {
    return Exam.findAll({
      include: {
        model: User,
        attributes: [],
        where: { userid: uid },
      },
    });
  },

};

module.exports = {
  ...medthods,
};
