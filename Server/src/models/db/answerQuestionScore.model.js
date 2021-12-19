module.exports = (sequelize, Sequelize) => {
  const answerQuestionScore = sequelize.define(
    'answerQuestionScoreanswerQuestionScore',
    {
      aqsid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'aqsid',
      },
      answer: { type: Sequelize.TEXT, allowNull: false, field: 'answer' },
      pointReviceve: { type: Sequelize.INTEGER, allowNull: false, field: 'pointReviceve' },
    },
    { tableName: 'answerQuestionScore' },
  );

  return answerQuestionScore;
};
