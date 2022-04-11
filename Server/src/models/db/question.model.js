module.exports = (sequelize, Sequelize) => {
  const question = sequelize.define(
    'question',
    {
      qid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qid',
      },
      questionTopic: { type: Sequelize.TEXT, allowNull: false, field: 'questionTopic' },
      sectionName: { type: Sequelize.STRING(255), allowNull: false, field: 'sectionName' },
    },
    { tableName: 'question' },
  );

  return question;
};
