import axios from 'axios';

const BACKEND_HOST = 'http://localhost:3000';

const channels = () => axios.get(`${BACKEND_HOST}/api/channels?type=teacher`);

const channelsDetail = (cid) => axios.get(`${BACKEND_HOST}/api/channels/${cid}?type=teacher`);

export default {
  channels,
  channelsDetail,
};
