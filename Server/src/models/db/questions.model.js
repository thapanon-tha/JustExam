module.exports = (sequelize, Sequelize) => {
  const questions = sequelize.define(
    'questions',
    {
      questionId: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'questionId',
      },
      title: { type: Sequelize.STRING(255), allowNull: false, field: 'title' },
      type: { type: Sequelize.ENUM('coding', 't/f', 'multiple-choices', 'short-answer', 'long-answer'), allowNull: false, field: 'title' },

    },
    { tableName: 'questions' },
  );

  return questions;
};
