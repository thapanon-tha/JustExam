import axios from 'axios';

const BACKEND_HOST = process.env.VUE_APP_API;

const examsHub = (page, search) => axios.get(
  `${BACKEND_HOST}/api/exams/hub`,
  { params: { search, page } },
  { validateStatus: false },
);

export default {
  examsHub,
};
