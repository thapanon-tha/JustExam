const questionsType = {
  mc: '74fbc3a5-0217-4892-9aba-70b612fc1a0e',
  sa: '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1',
  pa: '5edad656-83b9-4de0-ab94-f7d40cea3354',
  ma: 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7',
  ca: '7190c532-3ccc-4ed7-ae77-6ffd967bf87c',
  tf: 'b3037171-640a-4077-bf17-10b23a52c386',
};
const code = {
  python: 71,
  c: 50,
  java: 62,
  javascript: 63,
  cpp: 54,
  csharp: 51,
  kotlin: 78,
  ruby: 72,
  go: 60,
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const method = {
  mapper(question) {
    let answer;
    if (question.type === 'mc') {
      answer = question.questionData.answers.map((data) => {
        const result = method.mc(data);
        return result;
      });
    }
    if (question.type === 'sa') {
      answer = question.questionData.keylist.map((data) => method.sa(data));
    }
    if (question.type === 'pa') {
      answer = [];
    }
    if (question.type === 'ma') {
      answer = question.questionData.matchs.map((data) => method.ma(data));
    }
    if (question.type === 'ca') {
      answer = question.questionData.example.map((data) => method.ca({
        code: question.questionData.code,
        input: question.questionData.input,
        output: question.questionData.output,
        lang: question.questionData.lang,
        ...data,
      }));
    }
    if (question.type === 'tf') {
      if (question.questionData.false === true) {
        answer = [method.tf(question.questionData.false)];
      }
      if (question.questionData.true === true) {
        answer = [method.tf(question.questionData.true)];
      }
    }

    return ({
      questionTopic: question.questionData.question,
      sectionName: question.sectionId,
      qtid: questionsType[question.type],
      questionAnswer: answer,
    });
  },
  mc(data) {
    return {
      textA: data.optionData,
      correct: data.correct,
    };
  },
  sa(data) {
    return ({ textA: data.keyans });
  },
  ma(data) {
    return ({
      textQ: data.subquestion,
      textA: data.matchanswer,
    });
  },
  ca(data) {
    return ({
      code: data.code,
      input: data.input,
      exInput: data.xampleinput,
      output: data.output,
      exOutput: data.xampleoutput,
      clid: code[data.lang],
    });
  },
  tf(data) {
    return ({ value: data });
  },

  convertToCLI(List) {
    const qlist = [];
    List.forEach((element) => {
      if (element.qtid === questionsType.ma) {
        qlist.push(method.toma(element));
      }
      if (element.qtid === questionsType.pa) {
        qlist.push(method.topa(element));
      }
      if (element.qtid === questionsType.tf) {
        qlist.push(method.totf(element));
      }
      if (element.qtid === questionsType.sa) {
        qlist.push(method.tosa(element));
      }
      if (element.qtid === questionsType.mc) {
        qlist.push(method.tomc(element));
      }
      if (element.qtid === questionsType.ca) {
        qlist.push(method.toca(element));
      }
    });
    return qlist;
  },

  tomc(data) {
    const ans = data.answer.map((e) => ({
      id: e.qamcid,
      optionData: e.textA,
      correct: e.correct,
    }));

    const ret = {
      id: data.qid,
      type: 'mc',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        question: data.questionTopic,
        answers: ans,
      },
    };
    return (ret);
  },
  tosa(data) {
    const ans = data.answer.map((e) => ({
      id: e.qasaid,
      keyans: e.textA,
    }));
    const ret = {
      id: data.qid,
      type: 'sa',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        question: data.questionTopic,
        keylist: ans,
      },
    };
    return (ret);
  },
  topa(data) {
    const ret = {
      id: data.qid,
      type: 'pa',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        question: data.questionTopic,
        answers: [],
      },
    };
    return (ret);
  },
  toma(data) {
    const ret = {
      id: data.qid,
      type: 'ma',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        question: data.questionTopic,
        matchs: data.answer.map((answers) => ({
          id: answers.qamid,
          matchanswer: answers.textA,
          subquestion: answers.textQ,
        })),
      },
    };
    return (ret);
  },
  toca(data) {
    const ans = data.answer.map((e) => ({
      id: e.qacid,
      xampleinput: e.exInput,
      xampleoutput: e.exOutput,
    }));
    const lang = getKeyByValue(code, data.answer[0].clid);
    const ret = {
      id: data.qid,
      type: 'ca',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        lang,
        code: data.answer[0].code,
        question: data.questionTopic,
        input: data.answer[0].input,
        output: data.answer[0].output,
        example: ans,
      },
    };
    return (ret);
  },
  totf(data) {
    let correct = false;
    if (data.value === true) {
      correct = true;
    }
    const ret = {
      id: data.qid,
      type: 'tf',
      sectionId: parseInt(data.sectionName, 10),
      questionData: {
        question: data.questionTopic,
        true: correct,
        false: !correct,
      },
    };
    return (ret);
  },
};

module.exports = {
  ...method,
};
