const db = require('../models/db');

const Role = db.role;

const medthods = {
  async getAllRole() {
    return Role.findAll();
  },

};

module.exports = {
  ...medthods,
};
