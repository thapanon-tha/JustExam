module.exports = (sequelize, Sequelize) => {
  const questionAnswerTF = sequelize.define(
    'questionAnswerTF',
    {
      qatfid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qatfid',
      },
      value: { type: Sequelize.BOOLEAN, allowNull: false, field: 'value' },
    },
    { tableName: 'questionAnswerTF' },
  );

  return questionAnswerTF;
};
