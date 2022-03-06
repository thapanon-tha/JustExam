const axios = require('axios')

const exams = () => {
  // Call login api here

  return axios.get(`http://localhost/api/exams`);
};

const examList = (eid) => {
  return axios.get(`http://localhost/api/exams/${eid}/questions`);
}

export default {
  exams,
  examList
}
