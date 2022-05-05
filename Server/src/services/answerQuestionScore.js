const {
  channel,
  examChannel,
  questionExamChannel,
  question,
} = require('../models/db');
const db = require('../models/db');

const {
  answerQuestionScore,
  questionAnswerCChannel,
  questionAnswerMCChannel,
  questionAnswerMChannel,
  questionAnswerSAChannel,
  questionAnswerTFChannel,
} = db;

const medthods = {
  async createMany(array, transaction) {
    return Promise.all(
      array.map((data) => medthods.createAnswer(
        data.mid,
        data.ecid,
        data.qecid,
        data.pointReviceve,
        data.answer,
        transaction,
      )),
    );
  },

  async createAnswer(mid, ecid, qecid, pointReviceve, answer, transaction) {
    return answerQuestionScore.create(
      {
        mid,
        ecid,
        qecid,
        pointReviceve,
        answer,
      },
      { transaction },
    );
  },

  async updateMany(datas, transaction) {
    return Promise.all(
      datas.map((e) => medthods.updateOne(e.aqsid, e.pointReviceve, transaction)),
    );
  },

  async updateOne(aqsid, pointReviceve, transaction) {
    return answerQuestionScore.update(
      {
        pointReviceve,
      },
      {
        where: { aqsid },
      },
      { transaction },
    );
  },

  async autoGread(element) {
    let question = await questionExamChannel.findOne({
      where: { qecid: element.qecid },
      include: [
        {
          model: questionAnswerCChannel,
        },
        {
          model: questionAnswerMCChannel,
        },
        {
          model: questionAnswerMChannel,
        },
        {
          model: questionAnswerSAChannel,
        },
        {
          model: questionAnswerTFChannel,
        },
      ],
    });
    let answer = JSON.parse(element.answer);

    // multi choice
    // 74fbc3a5-0217-4892-9aba-70b612fc1a0e
    console.log(question)
    if( question.qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e' ){
      answer = answer.filter(e=> e !==null )
      let point = 0;
      let correct = 0
      let Acorrect = 0
      question.questionAnswerMCChannels.forEach((e)=>{
        if(e.correct===true){
          correct+=1
        }
        const index = answer.findIndex(i=> i === e.qamccid )
      console.log(index)
        if(index > -1){
          point = point + e.pointQ
        }
  
        if(e.correct===true && index > -1 ){
          Acorrect += 1
        }
      })
      if(correct === Acorrect)point=question.point
      resp = { ...element }
      resp.pointReviceve = point
    
      return resp
    }

    // t / f
    // b3037171-640a-4077-bf17-10b23a52c386
    else if (question.qtid === 'b3037171-640a-4077-bf17-10b23a52c386') {
      let currect = 0;
      let point = 0;
      question.questionAnswerTFChannels.forEach((e) => {
        if (answer === e.value) {
          currect += 1;
        }
      });
      if (question.questionAnswerTFChannels.length > 0) {
        point = (currect / question.questionAnswerTFChannels.length) * question.point;
      }

      resp = {
        ...element,
      };
      resp.pointReviceve = point;

      return resp;
    }
    // matching
    // d284c3d2-e1d2-4b8b-94c6-58248fdf27e7
    else if (question.qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
      let currect = 0;
      let point = 0;
      answer = answer.filter((e) => e !== null);
      // e is answer of question i is student answer
      question.questionAnswerMChannels.forEach((e) => {
        const index = answer.findIndex((i) => i.qamcid === e.qamcid);
        if (answer[index].value === e.textA.replace(/(<([^>]+)>)/gi, '')) {
          currect += 1;
        }
      });
      if (question.questionAnswerMChannels.length > 0) {
        point = (currect / question.questionAnswerMChannels.length) * question.point;
      }
      resp = {
        ...element,
      };
      resp.pointReviceve = point;
      return resp;
    }
    // coding
    else {
      return element;
    }
  },
};

module.exports = {
  ...medthods,
};
