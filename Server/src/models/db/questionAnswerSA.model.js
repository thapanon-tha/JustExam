module.exports = (sequelize, Sequelize) => {
  const questionAnswerSA = sequelize.define(
    'questionAnswerSA',
    {
      qasaid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qasaid',
      },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
    },
    { tableName: 'questionAnswerSA' },
  );

  return questionAnswerSA;
};
