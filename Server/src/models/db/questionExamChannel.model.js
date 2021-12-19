module.exports = (sequelize, Sequelize) => {
  const questionExamChannel = sequelize.define(
    'questionExamChannel',
    {
      qecid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qecid',
      },
      questionTopic: { type: Sequelize.STRING(255), allowNull: false, field: 'questionTopic' },
      sectionName: { type: Sequelize.STRING(255), allowNull: false, field: 'sectionName' },
      point: { type: Sequelize.INTEGER, allowNull: false, field: 'point' },
    },
    { tableName: 'questionExamChannel' },
  );

  return questionExamChannel;
};
