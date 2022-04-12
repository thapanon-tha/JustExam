const db = require('../models/db');

const { questionAnswerC } = db;
const { questionAnswerMC } = db;
const { questionAnswerSA } = db;
const { questionAnswerTF } = db;
const { questionAnswerM } = db;

function fondModel(qid, qtid) {
  if (qtid === 'b3037171-640a-4077-bf17-10b23a52c386') {
    return questionAnswerTF.findAll({
      where: { qid },
    });
  }
  if (qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c') {
    return questionAnswerC.findAll({
      where: { qid },
    });
  }
  if (qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1') {
    return questionAnswerSA.findAll({
      where: { qid },
    });
  }
  if (qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
    return questionAnswerM.findAll({
      where: { qid },
    });
  }
  if (qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e') {
    return questionAnswerMC.findAll({
      where: { qid },
    });
  }
  return {};
}

const medthods = {
  async getByEid(qid, qtid) {
    const model = fondModel(qtid);
    return model.findAll({
      where: { qid },
    });
  },

  async createMany(answers, qid, qtid, transaction) {
    return Promise.all(
      answers.map((answer) => medthods.createModel(answer, qid, qtid, transaction)),
    );
  },

  async createModel(data, qid, qtid, transaction) {
    if (qtid === 'b3037171-640a-4077-bf17-10b23a52c386') {
      return questionAnswerTF.create(
        {
          value: data.value,
          qid,
        },
        { transaction },
      );
    }
    if (qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c') {
      return questionAnswerC.create(
        {
          code: data.code,
          input: data.input,
          output: data.output,
          exInput: data.exInput,
          exOutput: data.exOutput,
          qid,
          clid: data.clid,
        },
        { transaction },
      );
    }
    if (qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1') {
      return questionAnswerSA.create(
        {
          textA: data.textA,
          qid,
        },
        { transaction },
      );
    }
    if (qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
      return questionAnswerM.create(
        {
          textA: data.textA,
          textQ: data.textQ,
          qid,
        },
        { transaction },
      );
    }
    if (qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e') {
      return questionAnswerMC.create(
        {
          textA: data.textA,
          correct: data.correct,
          qid,
        },
        { transaction },
      );
    }
    return 0;
  },

  deleteAnswerByQid(qid, transaction) {
    return [
      questionAnswerTF.destroy({ where: { qid }, transaction }),
      questionAnswerC.destroy({ where: { qid } , transaction }),
      questionAnswerSA.destroy({ where: { qid } , transaction }),
      questionAnswerM.destroy({ where: { qid } , transaction }),
      questionAnswerMC.destroy({ where: { qid } , transaction }),
    ];
  },
};

module.exports = {
  ...medthods,
};
