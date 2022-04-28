const db = require('../models/db');
const Member = require('../services/member.service');
const examChannelService = require('../services/examChannel.service');
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
      // console.log(error);
      stdCode.Unexpected(error, res);
    }
  },

  async getMemberAnswer(req, res) {
    const { cid, mid } = req.params;
    try {
      const detail = await Member.getByMid(
        mid
      );
      const Exampaper = await examChannelService.queryExamPaperAndMemberAnswer(
        cid,
        mid,
      );
      const Paper = await Promise.all(
        Exampaper.map((data) => {
          let finalData = {};
          finalData = {
            ...data.dataValues,
          };
          if (data.dataValues.questionAnswerCChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerCChannels];
          }
          if (data.dataValues.questionAnswerMCChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerMCChannels];
          }
          if (data.dataValues.questionAnswerMChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerMChannels];
          }
          if (data.dataValues.questionAnswerSAChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerSAChannels];
          }
          if (data.dataValues.questionAnswerTFChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerTFChannels];
          }
          delete finalData?.questionAnswerCChannels;
          delete finalData?.questionAnswerMCChannels;
          delete finalData?.questionAnswerMChannels;
          delete finalData?.questionAnswerSAChannels;
          delete finalData?.questionAnswerTFChannels;

          return finalData;
        }),
      );
      stdCode.querySuccess([Paper,detail], res);
    } catch (error) {
      console.log(error);
      stdCode.Unexpected(error, res);
    }
  },

  async addMember(req, res) {
    const { sid } = req.body.data;
    const { cid } = req.params;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Member.create(
        uid,
        'NOT ATTENDANT',
        '1297e88a-0d46-4f5d-a5bf-69ecbcc541b5',
        cid,
        sid,
        transaction,
      );
      if (data[1]) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error(
          'You are Member of This Channel or Student ID already exits',
        );
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async updateMember(req, res) {
    const { rid, sid } = req.body.data;
    const { cid, mid } = req.params;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Member.update(mid, rid, transaction).then(
        (response) => {
          if (response[0]) {
            return Member.getByMid(mid);
          }
          return 0;
        },
      );
      if (data) {
        await transaction.commit();
        stdCode.querySuccess(data, res);
      } else {
        throw Error("something wrong can't update");
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
        throw Error("something wrong can't update");
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
