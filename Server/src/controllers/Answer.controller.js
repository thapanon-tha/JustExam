const db = require('../models/db');
const stdCode = require('./stdCode');
const answerQuestionScore = require('../services/answerChannel.service');

module.exports = {

  async getAnswer(req, res) {
    const { cid } = req.params;
    const { mid } = req.query;
    try {
      // get question and answer of mid
      const questions = await answerQuestionScore.getQuestionAndAnswer(cid, mid)
        .then((responses) => {
          responses.map((response) => {
            const finalData = {
              ...response,
            };
            if (response.dataValues.questionAnswerCChannels.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerCChannels; }
            if (response.dataValues.questionAnswerMCChannels.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerMCChannels; }
            if (response.dataValues.questionAnswerSAChannels.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerSAChannels; }
            if (response.dataValues.questionAnswerTFChannels.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerTFChannels; }
            if (response.dataValues.questionAnswerMChannels.length !== 0) { finalData.questionAnswer = response.dataValues.questionAnswerMChannels; }
            delete finalData.questionAnswerCChannels;
            delete finalData.questionAnswerMCChannels;
            delete finalData.questionAnswerSAChannels;
            delete finalData.questionAnswerTFChannels;
            delete finalData.questionAnswerMChannels;
            return finalData;
          });
        });
      if (questions.length !== 0) {
        stdCode.querySuccess(questions, res);
      } else {
        stdCode.NotFound({ message: `answer of mid: ${mid} Not Found` }, res);
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async updateAnswer(req, res) {
    const { data } = req.body;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      await answerQuestionScore.updateMany(data, res);
      await transaction.commit();
      stdCode.Success(res);
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  deleteAnswer(req, res) {
    // const { cid } = req.params;
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

};
