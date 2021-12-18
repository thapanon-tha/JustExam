module.exports = (sequelize, Sequelize) => {
  const questionAnswerC = sequelize.define(
    'questionAnswerC',
    {
      qacid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qacid',
      },
      code: { type: Sequelize.TEXT, allowNull: false, field: 'code' },
      input: { type: Sequelize.TEXT, allowNull: false, field: 'input' },
      output: { type: Sequelize.TEXT, allowNull: false, field: 'output' },
      exInput: { type: Sequelize.TEXT, allowNull: false, field: 'exInput' },
      exOutput: { type: Sequelize.TEXT, allowNull: false, field: 'exOutput' },
    },
    { tableName: 'questionAnswerC' },
  );

  return questionAnswerC;
};
