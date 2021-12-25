const utils = require('sequelize');
const Channel = require('../services/channel.service');

module.exports = {

  channelsGET(req, res, next, inviteCode) {
    Channel.channelsGET(inviteCode)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  delete_channel(req, res, next, cid) {
    Channel.delete_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  get_channel(req, res, next, cid) {
    Channel.get_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  post_channel(req, res, next, body) {
    Channel.post_channel(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  put_channel(req, res, next, body, cid) {
    Channel.put_channel(body, cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
