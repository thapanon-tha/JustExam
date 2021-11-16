module.exports = (sequelize, Sequelize) => {
  const exam = sequelize.define(
    'exam',
    {
      examId: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'examId',
      },
      title: { type: Sequelize.STRING(500), allowNull: false, field: 'title' },
      description: { type: Sequelize.TEXT, allowNull: false, field: 'description' },
      private: { type: Sequelize.BOOLEAN, allowNull: false, field: 'private' },
      showCorrect: { type: Sequelize.BOOLEAN, allowNull: false, field: 'showCorrect' },
    },
    { tableName: 'exam' },
  );

  return exam;
};
