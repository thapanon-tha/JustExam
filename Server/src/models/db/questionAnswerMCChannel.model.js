module.exports = (sequelize, Sequelize) => {
  const questionAnswerMCChannel = sequelize.define(
    'questionAnswerMCChannel',
    {
      qamccid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qamccid',
      },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
      correct: { type: Sequelize.BOOLEAN, allowNull: false, field: 'correct' },
      pointQ: {
        type: Sequelize.FLOAT, allowNull: false, defaultValue: 0, field: 'pointQ',
      },
    },
    { tableName: 'questionAnswerMCChannel' },
  );

  return questionAnswerMCChannel;
};
