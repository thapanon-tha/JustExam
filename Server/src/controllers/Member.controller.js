const db = require('../models/db');
const Member = require('../services/member.service');
const stdCode = require('./stdCode');

module.exports = {

  async getMember(req, res) {
    const { cid } = req.params;
    try {
      const data = await Member.findByCid(cid);
      if (data.length !== 0) {
        stdCode.querySuccess(data, res);
      } else {
        stdCode.NotFound({ message: `Member in cid : ${cid} Not Found` }, res);
      }
    } catch (error) {
      stdCode(error, res);
    }
  },

  async addMember(req, res) {
    const { sid } = req.body.data;
    const { cid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Member.create(uid, 'NOT ATTENDANT', '1297e88a-0d46-4f5d-a5bf-69ecbcc541b5', cid, sid, transaction);
      if (data[1]) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error('You are Member of This Channel or Student ID already exits');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async updateMember(req, res) {
    const { rid, sid } = req.body.data;
    const { cid, mid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940' || req.user.uid;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Member.update(mid, rid, transaction).then((response) => {
        if (response[0]) {
          return Member.getByMid(mid);
        }
        return 0;
      });
      if (data) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error('something wrong can\'t update');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async deleteMember(req, res) {
    const { cid, mid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Member.deleteById(mid, cid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        throw Error('something wrong can\'t update');
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
