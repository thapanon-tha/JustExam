const Category = require('../services/category.service');
const errorStd = require('./stdError');

module.exports = {

  getAllCategory(req, res) {
    // Category.findAll();
    const err = {};
    errorStd.Unauthorized(err, res);
    //    res.status(404).json();
    //    res.status(500).json();
  },

  addCategory(req, res) {
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

  getCategory(req, res) {
    // const { cid } = req.params;
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

  updateCategory(req, res) {
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

  deleteCategory(req, res) {
    res.status(200).json();
    //    res.status(404).json();
    //    res.status(500).json();
  },

};
