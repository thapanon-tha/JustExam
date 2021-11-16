const userService = require('../services/user.service');

const methods = {

  async getByUserId(req, res) {
    const uid = req.user;
    let result;
    try {
      result = await userService.findByEmail(uid.email);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },

  // async getByUserId(req, res) {
  //   const uid = req.user.ID;
  //   const { verified } = req.query;
  //   let result;
  //   try {
  //     if (verified === undefined) result = await certificateService.getCertByUid(uid);
  //     else result = await certificateService.getCertByVerifiedId(verified);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     res.status(500).send({
  //       message: error.message,
  //     });
  //   }
  // },

};

module.exports = { ...methods };
