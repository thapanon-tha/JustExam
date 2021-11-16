module.exports = (sequelize, Sequelize) => {
  const examTags = sequelize.define(
    'examTags',
    {},
  );
  return examTags;
};
