const db = require('../models/db');

const User = db.user;
const userAttribute = ['uid', 'firstname', 'surname', 'email', 'password', 'type', 'provider'];
const medthods = {
  async findByEmail(email) {
    return User.findOne({
      attributes: userAttribute,
      where: { email },
    });
  },

  async findByUid(uid) {
    return User.findOne({
      attributes: ['firstname', 'surname'],
      where: { uid },
    });
  },

  async findByEmailLogin(email) {
    return User.findOne({
      attributes: ['uid', 'firstname', 'surname',
        'email', ['password', 'hash'], 'type'],
      where: { email },
    });
  },

  async findByEmailOrCreate(userPag) {
    return User.findOrCreate({
      attributes: ['uid', 'firstname', 'surname',
        'email', 'provider', 'type'],
      where: { email: userPag.email },
      defaults: {
        ...userPag,
      },
    });
  },
};

module.exports = {
  ...medthods,
};
