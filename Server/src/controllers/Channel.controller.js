const db = require('../models/db');
const Channel = require('../services/channel.service');
const stdCode = require('./stdCode');

const status = ['pending', 'coming', 'process', 'finish'];

module.exports = {

  async getChannel(req, res) {
    const { inviteCode } = req.query;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const userType = req.query.type || req.user.type;
    try {
      if (inviteCode !== undefined) {
        const data = await Channel.getByCode(inviteCode);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound({ message: `inviteCode : ${inviteCode} Not Found` }, res);
        }
      } else {
        // Owner
        // eslint-disable-next-line no-lonely-if
        if (!userType.localeCompare('teacher')) {
          const data = await Channel.getOwner(uid);
          if (data) {
            stdCode.querySuccess(data, res);
          } else {
            stdCode.NotFound({ message: 'Not Found' }, res);
          }
        } else {
          const data = await Channel.getMember(uid);
          if (data) {
            stdCode.querySuccess(data, res);
          } else {
            stdCode.NotFound({ message: 'Not Found' }, res);
          }
        }
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async addChannel(req, res) {
    const {
      title,
      description,
      schedule,
      startAt,
      endAt,
    } = req.body.data;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) {
        throw Error('title can\'t be " "');
      }
      const invidecode = ((Date.now()).toString(16) + uid.split('-')[2]);
      const code = invidecode.substring(invidecode.length - 9, invidecode.length - 2);
      const data = await Channel.create(code, title, description, status[0], schedule, startAt, endAt, uid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Created(data, res);
      } else {
        throw Error('Something wrong');
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async getChannelById(req, res) {
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const userType = req.query.type || req.user.type;
    const { cid } = req.params;
    try {
      // Owner
      // eslint-disable-next-line no-lonely-if
      if (!userType.localeCompare('teacher')) {
        const data = await Channel.getOwnerByCid(cid, uid);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound({ message: 'Not Found' }, res);
        }
      } else {
        const data = await Channel.getMemberByCid(cid, uid);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound({ message: 'Not Found' }, res);
        }
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async updateChannel(req, res) {
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    const { cid } = req.params;
    const {
      title, description, schedule, startAt, endAt, releaseScoreFlag,
    } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) {
        throw Error('title can\'t be " "');
      }
      const response = await Channel.update(cid, uid, title, description, schedule, startAt, endAt, releaseScoreFlag, transaction);
      if (response[0]) {
        await transaction.commit();
        const data = await Channel.getOwnerByCid(cid, uid);
        stdCode.querySuccess(data, res);
      } else {
        throw Error('something wrong can\'t update');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async deleteChannel(req, res) {
    const { cid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31941' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Channel.delete(cid, uid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        stdCode.NotFound({ message: `cid: ${cid} Not Found or uid Incorrect` }, res);
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  startExam(req, res) {
    const { cid } = req.params;
    Channel.delete_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  submitExam(req, res) {
    const { cid } = req.params;
    Channel.delete_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
