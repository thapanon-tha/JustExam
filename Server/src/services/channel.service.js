// const { Op } = require('sequelize');
const db = require('../models/db');

const Member = db.member;
const Channel = db.channel;
const { examChannel } = db;

const medthods = {
  async create(
    inviteCode,
    title,
    description,
    status,
    schedule,
    startAt,
    endAt,
    uid,
    transaction,
  ) {
    return Channel.create(
      {
        inviteCode,
        title,
        description,
        status,
        schedule,
        startAt,
        endAt,
        uid,
      },
      { transaction },
    );
  },

  async delete(cid, uid, transaction) {
    return Channel.destroy({
      where: {
        cid,
        uid,
      },
      transaction,
    });
  },

  async getByCode(inviteCode) {
    return Channel.findOne({
      where: {
        inviteCode,
      },
    });
  },

  async getOwner(uid) {
    return Channel.findAll({
      where: { uid },
    });
  },

  async getMember(uid) {
    return Channel.findAll({
      include: {
        model: Member,
        attributes: [],
        where: { uid },
      },
    });
  },

  async getOwnerByCid(cid, uid) {
    return Channel.findOne({
      where: {
        uid,
        cid,
      },
      include: {
        model: examChannel,
        required: false,
      },
    });
  },

  async getMemberByCid(cid, uid) {
    return Channel.findOne({
      where: { cid },
      include: [
        {
          model: Member,
          attributes: [],
          where: { uid },
        },
        {
          model: examChannel,
          required: false,
        },
      ],
    });
  },

  async update(
    cid,
    uid,
    title,
    description,
    schedule,
    startAt,
    endAt,
    releaseScoreFlag,
    transaction,
  ) {
    return Channel.update(
      {
        title,
        description,
        schedule,
        startAt,
        endAt,
        releaseScoreFlag,
      },
      { where: { cid, uid } },
      { transaction },
    );
  },
};

module.exports = {
  ...medthods,
};
