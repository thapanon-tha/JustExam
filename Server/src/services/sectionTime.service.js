const db = require('../models/db');

const { sectionExamTimeChannel } = db;

const medthods = {
  async getAll(ecid) {
    return sectionExamTimeChannel.findAll({
      where: { ecid },
    });
  },

  async getById(setcid) {
    return sectionExamTimeChannel.findOne({
      where: { setcid },
    });
  },

  async createMany(datas, transaction) {
    return Promise.all(
      datas.map((data) => medthods.createModel(
        data.ecid,
        data.sectionName,
        data.time,
        transaction,
      )),
    );
  },

  async createModel(ecid, sectionName, time, transaction) {
    if (sectionName.length === 0) return 0;
    return sectionExamTimeChannel.create(
      {
        ecid,
        sectionName,
        time,
      },
      { transaction },
    );
  },

  async updateMany(datas, transaction) {
    return Promise.all(
      datas.map((data) => medthods.updateTime(
        data.setcid,
        data.sectionName,
        data.time,
        transaction,
      )),
    );
  },

  async updateTime(setcid, sectionName, time, transaction) {
    if (sectionName.length === 0) return 0;
    return sectionExamTimeChannel.update(
      {
        sectionName,
        time,
      },
      { where: { setcid } },
      { transaction },
    );
  },

  async deleteId(setcid, transaction) {
    return sectionExamTimeChannel.destroy({
      where: { setcid },
      transaction,
    });
  },
};

module.exports = {
  ...medthods,
};
