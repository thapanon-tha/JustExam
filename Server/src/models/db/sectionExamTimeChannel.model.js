module.exports = (sequelize, Sequelize) => {
  const sectionExamTimeChannel = sequelize.define(
    'sectionExamTimeChannel',
    {
      setcid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'setcid',
      },
      sectionName: { type: Sequelize.STRING(255), allowNull: false, field: 'sectionName' },
      time: { type: Sequelize.INTEGER, allowNull: false, field: 'time' },
    },
    { tableName: 'sectionExamTimeChannel' },
  );

  return sectionExamTimeChannel;
};
