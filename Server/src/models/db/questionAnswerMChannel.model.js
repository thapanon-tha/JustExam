module.exports = (sequelize, Sequelize) => {
  const questionAnswerMChannel = sequelize.define(
    'questionAnswerMChannel',
    {
      qamcid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qamcid',
      },
      textQ: { type: Sequelize.STRING(255), allowNull: false, field: 'textQ' },
      textA: { type: Sequelize.STRING(255), allowNull: false, field: 'textA' },
    },
    { tableName: 'questionAnswerMChannel' },
  );

  return questionAnswerMChannel;
};
