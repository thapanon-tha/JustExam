const { Op } = require('sequelize');
const db = require('../models/db');

const {
  member, answerQuestionScore, user, role,
} = db;

const medthods = {
  async findByCid(cid) {
    return member.findAll({
      where: { cid },
      include: [
        {
          model: user,
          attributes: ['firstname', 'surname'],
        },
        {
          model: role,
          attributes: ['name'],
        },
        {
          model: answerQuestionScore,
          attributes: ['pointReviceve'],
        },
      ],
    });
  },

  async findByCidAndUid(cid, uid) {
    return member.findOne({
      where: { cid, uid },
      include: [
        {
          model: user,
          attributes: ['firstname', 'surname'],
        },
        {
          model: role,
          attributes: ['name'],
        },
      ],
    });
  },

  async update(mid, rid, transaction) {
    return member.update(
      {
        rid,
      },
      { where: { mid } },
      { transaction },
    );
  },

  async updateStatusByUidAndCid(uid, cid, state, transaction) {
    return member.update(
      {
        state,
      },
      { where: { uid, cid } },
      { transaction },
    );
  },

  async create(uid, state, rid, cid, sid, transaction) {
    return member.findOrCreate({
      where: {
        cid,
        [Op.or]: [{ uid }, { sid }],
      },
      defaults: {
        uid,
        state,
        rid,
        cid,
        sid,
      },
      transaction,
    });
  },

  async getByMid(mid) {
    return member.findOne({
      include: [
        {
          model: user,
          attributes: ['firstname', 'surname'],
        },
      ],
      where: { mid },
    });
  },

  async deleteById(mid, cid, transaction) {
    return member.destroy({
      where: { mid, cid, [Op.ne]: [{ uid }, { sid }] },
      transaction,
    });
  },

  async deleteByUId(uid, cid, transaction) {
    return member.destroy({
      where: { uid, cid },
      transaction,
    });
  },

  async getmemberAndScore(cid, ecid) {
    return member.findAll({
      where: { cid, rid: '1297e88a-0d46-4f5d-a5bf-69ecbcc541b5' },
      include: [
        {
          model: user,
          attributes: ['email', 'firstname', 'surname'],
        },
        {
          model: answerQuestionScore,
          wgere: { ecid },
        },
      ],
    });
  },
};

module.exports = {
  ...medthods,
};
