const axios = require("axios");
const BACKEND_HOST = 'http://localhost:3000'

const channels = () => {
  return axios.get(`${BACKEND_HOST}/api/channels?type=teacher`);
};

const channelsDetail = (cid) => {
  return axios.get(`${BACKEND_HOST}/api/channels/${cid}?type=teacher`);
};

export default {
  channels,
  channelsDetail
};
