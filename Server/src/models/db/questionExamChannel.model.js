module.exports = (sequelize, Sequelize) => {
  const questionExamChannel = sequelize.define(
    'questionExamChannel',
    {
      qecid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        field: 'qecid',
      },
      questionTopic: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'questionTopic',
      },
      sectionName: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'sectionName',
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'point',
        defaultValue: 0,
      },
    },
    { tableName: 'questionExamChannel' },
  );

  return questionExamChannel;
};
