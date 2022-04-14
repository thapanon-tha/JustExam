const db = require('../models/db');

const { option, channel, optionType } = db;

const medthods = {
  async getOption(cid, uid) {
    return option.findAll({
      where: { cid },
      include: [
        {
          model: channel,
          attributes: [],
          where: { uid },
          required: true,
        },
        {
          model: optionType,
          required: true,
        },
      ],
    });
  },
  async createOne(cid, otid, transaction) {
    return option.findOrCreate({
      where: { otid, cid },
      defaults: {
        otid,
        cid,
      },
      transaction,
    });
  },

  async createMany(options, transaction) {
    return Promise.all(
      options.map((data) => medthods.createOne(data.cid, data.otid, transaction)),
    );
  },

  async deleteAllByCid(cid, transaction) {
    return option.destroy({
      where: { cid },
      transaction,
    });
  },

  async deleteById(oid, transaction) {
    return option.destroy({
      where: { oid },
      transaction,
    });
  },
};

module.exports = {
  ...medthods,
};
