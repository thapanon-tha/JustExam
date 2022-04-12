const db = require('../models/db');
const { redisClient } = require('../configs/redis.config');
const Channel = require('../services/channel.service');
const stdCode = require('./stdCode');
const examChannelService = require('../services/examChannel.service');

const status = ['pending', 'coming', 'process', 'finish'];
// array array
const randomsection = (allSection, completeSection) => {
  const sectionList = allSection.filter(
    (e) => completeSection.findIndex(e) >= 0,
  );
  sectionList[Math.floor(Math.random() * sectionList.length)];
};

module.exports = {
  async getChannel(req, res) {
    const { inviteCode } = req.query;
    const { uid } = req.user;
    const userType = req.user.type;
    console.log('aaaaaaaaaa');
    try {
      if (inviteCode !== undefined) {
        const data = await Channel.getByCode(inviteCode);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound(
            { message: `inviteCode : ${inviteCode} Not Found` },
            res,
          );
        }
      } else {
        // Owner
        // eslint-disable-next-line no-lonely-if
        console.log(uid);
        console.log(userType);
        console.log(!userType.localeCompare('teacher'));
        if (!userType.localeCompare('teacher')) {
          const data = await Channel.getOwner(uid);
          console.log(data);
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
      title, description, schedule, startAt, endAt,
    } = req.body.data;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) {
        throw Error('title can\'t be " "');
      }
      const invidecode = Date.now().toString(16) + uid.split('-')[2];
      const code = invidecode.substring(
        invidecode.length - 9,
        invidecode.length - 2,
      );
      const data = await Channel.create(
        code,
        title,
        description,
        status[0],
        schedule,
        startAt,
        endAt,
        uid,
        transaction,
      );
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
    const { uid } = req.user;
    const userType = req.query.type || req.user.type;
    const { cid } = req.params;
    try {
      // Owner
      // eslint-disable-next-line no-lonely-if
      if (!userType.localeCompare('teacher')) {
        const data = await Channel.getOwnerByCid(cid, uid);
        console.log(data);
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
    const { uid } = req.user;
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
      const response = await Channel.update(
        cid,
        uid,
        title,
        description,
        schedule,
        startAt,
        endAt,
        releaseScoreFlag,
        transaction,
      );
      if (response[0]) {
        await transaction.commit();
        const data = await Channel.getOwnerByCid(cid, uid);
        stdCode.querySuccess(data, res);
      } else {
        throw Error("something wrong can't update");
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
        stdCode.NotFound(
          { message: `cid: ${cid} Not Found or uid Incorrect` },
          res,
        );
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async startExam(req, res) {
    const { cid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940';
    let redisUid = await redisClient.get(uid);
    let examData = await redisClient.get(cid);
    let sectionList;
    if (!examData) {
      const Exampaper = await examChannelService.queryExamPaper(cid);
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
          delete finalData?.questionAnswerCChannels;
          delete finalData?.questionAnswerMCChannels;
          delete finalData?.questionAnswerMChannels;
          return finalData;
        }),
      );
      await redisClient.set(cid, JSON.stringify(Paper));
      examData = await redisClient.get(cid);
    }
    examData = JSON.parse(examData);
    if (!redisUid) {
      sectionList = examData.map((data) => data.sectionName);
      sectionList = Array.from(new Set(sectionList));
      const map1 = {
        cid,
        section: sectionList,
      };
      await redisClient.set(uid, JSON.stringify(map1));
      redisUid = await redisClient.get(uid);
      redisUid = JSON.parse(redisUid);
    } else {
      redisUid = JSON.parse(redisUid);
    }
    sectionList = redisUid.section;
    const sectionName = sectionList[Math.floor(Math.random() * sectionList.length)];
    const finalList = examData.filter(
      (exam) => exam.sectionName === sectionName,
    );
    redisUid.section = sectionList.filter((value) => value !== sectionName);
    await redisClient.set(uid, JSON.stringify(redisUid));
    res.json(finalList);
  },

  async continue(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    const uidKey = `exam+${cid}+${uid}`;
    const cidKey = `exam+${cid}`;
    // exam for cid  key  `exam + ${cid}`                 structure key: { section: [], questions: [], }
    // exam for uid  key  `exam + ${cid} + ${uid}`        structure key: { current: ${sectionNo}, completeSection: [] }

    try {
      const redisUid = await redisClient.get(uidKey);

      //! Get DATA From Redis and Store data to Redis
      let examData = await redisClient.get(cidKey);
      if (!examData) {
        const Exampaper = await examChannelService.queryExamPaper(cid);
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
            delete finalData?.questionAnswerCChannels;
            delete finalData?.questionAnswerMCChannels;
            delete finalData?.questionAnswerMChannels;
            return finalData;
          }),
        );
        const section = Paper.map((e) => parseInt(e.sectionName, 10));
        const uniqueNames = [];
        $.each(section, (i, el) => {
          if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        });
        const packged = {
          questions: Paper,
          sections: uniqueNames,
        };
        await redisClient.set(cidKey, JSON.stringify(packged));
        examData = await redisClient.get(cidKey);
      }
      examData = JSON.parse(examData);

      // check section
      if (!redisUid) {
        const user = { current: null, completeSection: [] };
        await redisClient.set(uidKey, JSON.stringify(user));
        redisUid = await redisClient.get(uidKey);
      }

      res.json(finalList);
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async submitExam(req, res) {
    const { cid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940';
    let exams = await redisClient.get(cid);
    exams = JSON.parse(exams);
    let userSection = await redisClient.get(uid);
    userSection = JSON.parse(userSection);
    const sectionList = userSection.section;
    const sectionName = sectionList[Math.floor(Math.random() * sectionList.length)];
    const finalList = exams.filter((exam) => exam.sectionName === sectionName);
    userSection.section = sectionList.filter((value) => value !== sectionName);
    await redisClient.set(uid, JSON.stringify(userSection));
    res.json(finalList);
  },
};
