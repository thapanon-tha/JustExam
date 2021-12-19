module.exports = (sequelize, Sequelize) => {
  const questionAnswerSAChannel = sequelize.define(
    'questionAnswerSAChannel',
    {
      qasacid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qasacid',
      },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
    },
    { tableName: 'questionAnswerSAChannel' },
  );

  return questionAnswerSAChannel;
};
