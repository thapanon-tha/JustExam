const db = require('../models/db');

const User = db.user;

const medthods = {
  async findByEmail(email) {
    return User.findOne({
      attributes: ['userid', 'name', 'surname',
        'email', 'role'],
      where: { email },
    });
  },

  async findByEmailLogin(email) {
    return User.findOne({
      attributes: ['userid', 'name', 'surname',
        'email', ['password', 'hash'], 'role'],
      where: { email },
    });
  },

  async findByEmailOrCreate(name, surname, email, loginBy, role) {
    return User.findOrCreate({
      attributes: ['userid', 'name', 'surname',
        'email', 'role'],
      where: { email },
      defaults: {
        name,
        surname,
        email,
        loginBy,
        role,
      },
    });
  },
};

module.exports = {
  ...medthods,
};
