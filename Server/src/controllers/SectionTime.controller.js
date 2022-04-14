const stdCode = require('./stdCode');
const SectionTime = require('../services/sectionTime.service');
const db = require('../models/db');

module.exports = {
  async getSectionTime(req, res) {
    const { ecid } = req.params;
    try {
      const data = await SectionTime.getAll(ecid);
      if (data.length !== 0) {
        stdCode.querySuccess(data, res);
      } else {
        stdCode.NotFound(
          { message: `sectionTime for ecid : ${ecid} Not Found` },
          res,
        );
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async addSectionTime(req, res) {
    const { cid, ecid } = req.params;
    const { data } = req.body;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const respones = await SectionTime.createMany(
        data.map((sectionTime) => ({ ...sectionTime, cid, ecid })),
        transaction,
      ).then((respon) => {
        const checker = respon.find((raw) => raw === 0);
        if (checker !== undefined) {
          return 0;
        }
        return respon;
      });
      if (respones) {
        await transaction.commit();
        stdCode.Created(respones, res);
      } else {
        throw Error("sectionName can't be Null");
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async updateSectionTime(req, res) {
    const { cid, ecid } = req.params;
    const { data } = req.body;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const respones = await SectionTime.updateMany(
        data.map((sectionTime) => ({ ...sectionTime, cid, ecid })),
        transaction,
      ).then((respon) => {
        const checker = respon.find((raw) => raw === 0);
        if (checker !== undefined) {
          return 0;
        }
        return Promise.all(
          data.map((element) => SectionTime.getById(element.setcid)),
        );
      });
      if (respones) {
        await transaction.commit();
        stdCode.Created(respones, res);
      } else {
        throw Error("sectionName can't be Null");
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async deleteSectionTime(req, res) {
    const { setcid } = req.params;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await SectionTime.deleteId(setcid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        throw Error(`con't delete setcid: ${setcid}`);
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
