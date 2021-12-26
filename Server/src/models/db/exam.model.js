module.exports = (sequelize, Sequelize) => {
  const exam = sequelize.define(
    'exam',
    {
      eid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'eid',
      },
      title: { type: Sequelize.STRING(128), allowNull: false, field: 'title' },
      description: { type: Sequelize.STRING(128), allowNull: true, field: 'description' },
      shareQ: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'shareQ',
      },
      shareQA: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'shareQA',
      },
      uid: {
        type: Sequelize.UUID, allowNull: false, field: 'uid',
      },
    },
    { tableName: 'exam' },
  );

  return exam;
};
