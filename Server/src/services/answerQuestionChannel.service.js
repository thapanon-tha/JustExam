const db = require('../models/db');

const { questionAnswerCChannel } = db;
const { questionAnswerMCChannel } = db;
const { questionAnswerSAChannel } = db;
const { questionAnswerTFChannel } = db;
const { questionAnswerMChannel } = db;

function fondModel(qecid, qtid) {
  if (qtid === 'b3037171-640a-4077-bf17-10b23a52c386') {
    return questionAnswerTFChannel.findAll({
      where: { qecid },
    });
  }
  if (qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c') {
    return questionAnswerCChannel.findAll({
      where: { qecid },
    });
  }
  if (qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1') {
    return questionAnswerSAChannel.findAll({
      where: { qecid },
    });
  }
  if (qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
    return questionAnswerMChannel.findAll({
      where: { qecid },
    });
  }
  if (qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e') {
    return questionAnswerMCChannel.findAll({
      where: { qecid },
    });
  }
  return {};
}

const medthods = {
  async getByEid(qecid, qtid) {
    const model = fondModel(qtid);
    return model.findAll({
      where: { qecid },
    });
  },

  async createMany(answers, qecid, qtid, transaction) {
    return Promise.all(
      answers.map((answer) => medthods.createModel(answer, qecid, qtid, transaction)),
    );
  },

  async createModel(data, qecid, qtid, transaction) {
    if (qtid === 'b3037171-640a-4077-bf17-10b23a52c386') {
      return questionAnswerTFChannel.create(
        {
          value: data.value,
          qecid,
        },
        { transaction },
      );
    }
    if (qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c') {
      return questionAnswerCChannel.create(
        {
          code: data.code,
          input: data.input,
          output: data.output,
          exInput: data.exInput,
          exOutput: data.exOutput,
          qecid,
          clid: data.clid,
        },
        { transaction },
      );
    }
    if (qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1') {
      return questionAnswerSAChannel.create(
        {
          textA: data.textA,
          qecid,
        },
        { transaction },
      );
    }
    if (qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
      return questionAnswerMChannel.create(
        {
          textA: data.textA,
          textQ: data.textQ,
          qecid,
        },
        { transaction },
      );
    }
    if (qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e') {
      return questionAnswerMCChannel.create(
        {
          textA: data.textA,
          correct: data.correct,
          pointQ: data.pointQ,
          qecid,
        },
        { transaction },
      );
    }
    return 0;
  },

  deleteAnswerByQid(qecid, transaction) {
    return [
      questionAnswerTFChannel.destroy({ where: { qecid } , transaction }),
      questionAnswerCChannel.destroy({ where: { qecid } , transaction }),
      questionAnswerSAChannel.destroy({ where: { qecid } , transaction }),
      questionAnswerMChannel.destroy({ where: { qecid } , transaction }),
      questionAnswerMCChannel.destroy({ where: { qecid } , transaction }),
    ];
  },
};

module.exports = {
  ...medthods,
};
