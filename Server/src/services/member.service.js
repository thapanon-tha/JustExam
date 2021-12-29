const db = require('../models/db');

const { channel, member } = db;

const medthods = {
  async findByCid(cid) {
    return member.findAll({
      where: { cid },
    });
  },

  async update(mid, rid, transaction) {
    return member.update({
      rid,
    }, { where: { mid } }, { transaction });
  },

  async create(uid, state, rid, cid, sid, transaction) {
    return member.create({
      uid, state, rid, cid, sid,
    }, { transaction });
  },

  async getByMid(mid) {
    return member.findOne({
      where: { mid },
    });
  },

  async deleteById(mid, cid, transaction) {
    return member.destroy({
      where: { mid, cid },
    }, { transaction });
  },
};

module.exports = {
  ...medthods,
};
