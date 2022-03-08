const axios = require('axios')

const exams = () => {
  // Call login api here

  return axios.get(`http://localhost/api/exams`);
};

const examList = (eid) => {
  return axios.get(`http://localhost/api/exams/${eid}/questions`);
}

const createExams = (examData) => {
  return axios.post(`http://localhost/api/exams`, {
    data: {
      title: examData.title,
      description: examData.description,
    }
  });
}

const examMapper = (examData) => {

}

export default {
  exams,
  examList,
  createExams
}
