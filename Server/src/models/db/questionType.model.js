module.exports = (sequelize, Sequelize) => {
  const questionType = sequelize.define(
    'questionType',
    {
      qtid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'qtid',
      },
      name: { type: Sequelize.STRING(100), allowNull: false, field: 'name' },
    },
    { tableName: 'questionType' },
  );

  return questionType;
};
