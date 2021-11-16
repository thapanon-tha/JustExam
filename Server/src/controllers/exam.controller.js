const userService = require('../services/user.service');
const examService = require('../services/exam.service');

const methods = {

  async getList(req, res) {
    const uid = req.user;
    console.log(req.user);
    let result;
    try {
      result = await examService.findByUid(uid.userid);
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
