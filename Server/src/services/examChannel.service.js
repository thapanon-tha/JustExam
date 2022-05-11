const { member, answerQuestionScore } = require('../models/db');
const db = require('../models/db');

const {
  examChannel,
  questionExamChannel,
  questionAnswerCChannel,
  questionAnswerMCChannel,
  questionAnswerMChannel,
  questionAnswerSAChannel,
  questionAnswerTFChannel,
} = db;

const medthods = {
  async addExam(uid, cid, title, description, eid, transection) {
    return examChannel.create(
      {
        uid,
        cid,
        title,
        description,
        eid,
      },
      { transection },
    );
  },

  async getExamChannel(cid) {
    return examChannel.findOne({
      where: { cid },
    });
  },

  async queryExamPaper(cid) {
    const questionAnswerCChannelsAtt = [
      'qaccid',
      'code',
      ['input','exInput'],
      ['output','exOutput'],
      'clid',
    ];
    const questionAnswerMCChannelsAtt = ['qamccid', 'textA'];
    const questionAnswerMChannelsAtt = ['qamcid', 'textA', 'textQ'];
    const questionAnswerSAChannelsAtt = [];
    const questionAnswerTFChannelsAtt = [];
    return questionExamChannel.findAll({
      include: [
        {
          attributes: [],
          model: examChannel,
          where: { cid },
          required: true,
        },
        {
          attributes: questionAnswerCChannelsAtt,
          model: questionAnswerCChannel,
        },
        {
          attributes: questionAnswerMCChannelsAtt,
          model: questionAnswerMCChannel,
        },
        {
          attributes: questionAnswerMChannelsAtt,
          model: questionAnswerMChannel,
        },
        {
          attributes: questionAnswerSAChannelsAtt,
          model: questionAnswerSAChannel,
        },
        {
          attributes: questionAnswerTFChannelsAtt,
          model: questionAnswerTFChannel,
        },
      ],
    });
  },

  async queryExamPaperAndMemberAnswer(cid, mid) {
    const questionAnswerCChannelsAtt = {};
    const questionAnswerMCChannelsAtt = {};
    const questionAnswerMChannelsAtt = {};
    const questionAnswerSAChannelsAtt = {};
    const questionAnswerTFChannelsAtt = {};
    return questionExamChannel.findAll({
      include: [
        {
          attributes: [],
          model: examChannel,
          where: { cid },
          required: true,
        },
        {
          model: answerQuestionScore,
          where: { mid },
          required: false,
        },
        {
          attributes: questionAnswerCChannelsAtt,
          model: questionAnswerCChannel,
        },
        {
          attributes: questionAnswerMCChannelsAtt,
          model: questionAnswerMCChannel,
        },
        {
          attributes: questionAnswerMChannelsAtt,
          model: questionAnswerMChannel,
        },
        {
          attributes: questionAnswerSAChannelsAtt,
          model: questionAnswerSAChannel,
        },
        {
          attributes: questionAnswerTFChannelsAtt,
          model: questionAnswerTFChannel,
        },
      ],
    });
  },

  async updateExamChannel(ecid, cid, title, description, transaction) {
    return examChannel.update(
      {
        title,
        description,
      },
      { where: { ecid, cid } },
      { transaction },
    );
  },

  async deleteByCid(cid, transaction) {
    return examChannel.destroy({ where: { cid }, transaction });
  },

  async delete(cid, ecid, transaction) {
    return examChannel.destroy({ where: { ecid, cid }, transaction });
  },

  async totalPointChannel(cid) {
    return examChannel.findAll({
      attributes: [
        [
          db.sequelize.fn(
            'SUM',
            db.sequelize.col('questionExamChannels.point'),
          ),
          'totalPoint',
        ],
      ],
      include: {
        model: questionExamChannel,
        attributes: [],
      },
      where: { cid },
    });
  },

  async AutoPointChannel(cid, uid) {},
};

module.exports = {
  ...medthods,
};
