const utils = require('sequelize');
const Channel = require('../services/channel.service');

module.exports = {

  getChannel(req, res) {
    const { inviteCode } = req.query;
    Channel.channelsGET(inviteCode)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  addChannel(req, res) {
    const { body } = req;
    Channel.post_channel(body)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  getChannelById(req, res) {
    const cid = req.params;
    Channel.get_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  updateChannel(req, res) {
    const { cid } = req.params;
    const { body } = req;

    Channel.put_channel(body, cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

  deleteChannel(req, res) {
    const { cid } = req.params;
    Channel.delete_channel(cid)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  },

};
