const stdCode = require('./stdCode');
const optionType = require('../services/optionType.service');

module.exports = {

  async getAllOptionType(req, res) {
    try {
      const data = await optionType.getAllOptionType();
      if (data.length) { stdCode.querySuccess(data, res); } else { stdCode.NotFound({}, res); }
    } catch (e) {
      stdCode.Unexpected(e, res);
    }
  },

  addOptionType(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },

  getOptionType(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },

  updateOptionType(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },

  deleteOptionType(req, res) {
    stdCode.NotImplemented(stdCode.inCurrectPath(req), res);
  },
};
