module.exports = (sequelize, Sequelize) => {
  const questionAnswerCChannel = sequelize.define(
    'questionAnswerCChannel',
    {
      qaccid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qaccid',
      },
      code: { type: Sequelize.TEXT, allowNull: false, field: 'code' },
      input: { type: Sequelize.TEXT, allowNull: false, field: 'input' },
      output: { type: Sequelize.TEXT, allowNull: false, field: 'output' },
      exInput: { type: Sequelize.TEXT, allowNull: false, field: 'exInput' },
      exOutput: { type: Sequelize.TEXT, allowNull: false, field: 'exOutput' },
    },
    { tableName: 'questionAnswerCChannel' },
  );

  return questionAnswerCChannel;
};
