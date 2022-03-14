const questionsType = {
  mc: "74fbc3a5-0217-4892-9aba-70b612fc1a0e",
  sa: "5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1",
  pa: "74fbc3a5-0217-4892-9aba-70b612fc1a0e",
  ma: "d284c3d2-e1d2-4b8b-94c6-58248fdf27e7",
  ca: "7190c532-3ccc-4ed7-ae77-6ffd967bf87c",
  tf: "b3037171-640a-4077-bf17-10b23a52c386"
}


const method = {
  mapper(question) {
    let answer;
    if (question.type === "mc") {
      console.log(question.questionData.answers)
      answer = question.questionData.answers.map(data => {
        const result = method.mc(data)
        console.log(result)
        return result;
      });
    }
    if (question.type === "sa") {
      answer = question.questionData.keylist.map(data => {
        return method.sa(data);
      });
    }
    if (question.type === "pa") {
      answer = []
    }
    if (question.type === "ma") {
      answer = question.questionData.matchs.map(data => {
        return method.ma(data);
      });
    }
    if (question.type === "ca") {
      answer = question.questionData.example.map(data => {
        return method.ca({ code: question.questionData.code, input: question.questionData.input, output: question.questionData.output, ...data });
      });
    }
    if (question.type === "tf") {
      if (question.questionData.false === true)
        answer = [method.tf(question.questionData.false)]
      if (question.questionData.true === true)
        answer = [method.tf(question.questionData.true)]
    }


    console.log({
      questionTopic: question.questionData.question,
      sectionName: question.sectionId,
      qtid: questionsType[question.type],
      questionAnswer: answer
    })
    return ({
      questionTopic: question.questionData.question,
      sectionName: question.sectionId,
      qtid: questionsType[question.type],
      questionAnswer: answer
    })
  },
  answer() {

  },
  mc(data) {
    const res = {
      textA: data.optionData,
      correct: data.correct
    }
    return (res)
  },
  sa(data) {
    return ({ textA: data.keyans })
  },
  ma(data) {
    return ({
      textQ: data.subquestion,
      textA: data.matchanswer
    })
  },
  ca(data) {
    return ({
      code: data.code,
      input: data.input,
      exInput: data.xampleinput,
      output: data.output,
      exOutput: data.xampleoutput,
      clid: 51
    })
  },
  tf(data) {
    return ({ value: data })
  },
}


module.exports = {
  ...method
}


// {
//   "data": [
//     {
//       "questionTopic": "Matching",
//       "sectionName": "77",
//       "qtid": "d284c3d2-e1d2-4b8b-94c6-58248fdf27e7",
//       "questionAnswer": [
//         {
//           "textQ": "A",
//           "textA": "1"
//         },
//         {
//           "textQ": "B",
//           "textA": "2"
//         }
//       ]
//     },
//     {
//       "questionTopic": "T/F",
//       "sectionName": "77",
//       "qtid": "b3037171-640a-4077-bf17-10b23a52c386",
//       "questionAnswer": [
//         {
//           "value": 1
//         }
//       ]
//     },
//     {
//       "questionTopic": "Coding",
//       "sectionName": "77",
//       "qtid": "7190c532-3ccc-4ed7-ae77-6ffd967bf87c",
//       "questionAnswer": [
//         {
//           "code": "example Code",
//           "input": "testcase",
//           "exInput": "Example input",
//           "output": "testcase Output",
//           "exOutput": "Example Output",
//           "clid": 63
//         }
//       ]
//     },
//     {
//       "questionTopic": "Short Answer",
//       "sectionName": "77",
//       "qtid": "5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1",
//       "questionAnswer": [
//         {
//           "textA": "example Answer"
//         },
//         {
//           "textA": "example Answer2"
//         },
//         {
//           "textA": "example Answer4"
//         }
//       ]
//     },
//     {
//       "questionTopic": "Paragraph",
//       "sectionName": "77",
//       "qtid": "5edad656-83b9-4de0-ab94-f7d40cea3354",
//       "questionAnswer": []
//     },
//     {
//       "questionTopic": "Multiple Choice",
//       "sectionName": "77",
//       "qtid": "74fbc3a5-0217-4892-9aba-70b612fc1a0e",
//       "questionAnswer": [
//         {
//           "textA": "example Answer",
//           "correct": 1,
//           "pointQ": -1
//         },
//         {
//           "textA": "example Answer1",
//           "correct": 0
//         },
//         {
//           "textA": "example Answer2",
//           "correct": 1
//         },
//         {
//           "textA": "example Answer3",
//           "correct": 0
//         },
//         {
//           "textA": "example Answer4",
//           "correct": 0
//         }
//       ]
//     }
//   ]
// }

// prototype: {
//   mc: {
//     question: "",
//       answers: [
//         {
//           id: 1,
//           optionData: "",
//           correct: false,
//         },
//       ],
//   },
//   sa: {
//     question: "",
//       keylist: [
//         {
//           id: 1,
//           keyans: "",
//         },
//       ],
//   },
//   pa: {
//     question: "",
//   },
//   tf: {
//     question: "",
//       true: false,
//         false: false,
//   },
//   ma: {
//     question: "",
//       matchs: [
//         {
//           id: 1,
//           subquestion: "",
//           matchanswer: "",
//         },
//       ],
//   },
//   ca: {
//     code: "",
//       question: "",
//         input: "",
//           output: "",
//             example: [
//               {
//                 id: 1,
//                 xampleinput: "",
//                 xampleoutput: "",
//               },
//             ],
//   },
// },
