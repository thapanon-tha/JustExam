const errorStd = require('./stdError');

module.exports = {

  getAnswer(req, res) {
    // Category.findAll();
    const err = {};
    errorStd.Unauthorized(err, res);
    //    res.status(404).json();
    //    res.status(500).json();
  },

  updateAnswer(req, res) {
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

  deleteAnswer(req, res) {
    // const { cid } = req.params;
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

};
