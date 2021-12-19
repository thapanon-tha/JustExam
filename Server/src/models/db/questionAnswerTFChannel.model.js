module.exports = (sequelize, Sequelize) => {
  const questionAnswerTFChannel = sequelize.define(
    'questionAnswerTFChannel',
    {
      qatfcid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qatfcid',
      },
      value: { type: Sequelize.BOOLEAN, allowNull: false, field: 'value' },
    },
    { tableName: 'questionAnswerTFChannel' },
  );

  return questionAnswerTFChannel;
};
