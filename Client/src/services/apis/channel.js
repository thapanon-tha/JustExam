const axios = require("axios");
const BACKEND_HOST = 'http://localhost:3000'

const channels = () => {
  return axios.get(`${BACKEND_HOST}/api/channels?type=teacher`);
};

export default {
  channels
};
