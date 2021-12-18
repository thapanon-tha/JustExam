module.exports = (sequelize, Sequelize) => {
  const questionAnswerM = sequelize.define(
    'questionAnswerM',
    {
      qamid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qamid',
      },
      textQ: { type: Sequelize.STRING(255), allowNull: false, field: 'textQ' },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
    },
    { tableName: 'questionAnswerM' },
  );

  return questionAnswerM;
};
