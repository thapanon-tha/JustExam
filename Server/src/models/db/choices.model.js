module.exports = (sequelize, Sequelize) => {
  const choices = sequelize.define(
    'choices',
    {
      choiceId: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'choiceId',
      },
      title: { type: Sequelize.TEXT, allowNull: false, field: 'title' },
      correct: { type: Sequelize.BOOLEAN, allowNull: false, field: 'correct' },
    },
    { tableName: 'choices' },
  );

  return choices;
};
