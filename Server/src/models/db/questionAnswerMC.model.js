module.exports = (sequelize, Sequelize) => {
  const questionAnswerMC = sequelize.define(
    'questionAnswerMC',
    {
      qamcid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qamcid',
      },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
      correct: { type: Sequelize.BOOLEAN, allowNull: false, field: 'correct' },
    },
    { tableName: 'questionAnswerMC' },
  );

  return questionAnswerMC;
};
