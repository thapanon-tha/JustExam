module.exports = (sequelize, Sequelize) => {
  const exam = sequelize.define(
    'exam',
    {
      eid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'eid',
      },
      title: { type: Sequelize.STRING(128), allowNull: false, field: 'title' },
      description: { type: Sequelize.STRING(128), allowNull: true, field: 'description' },
      share: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'share',
      },

    },
    { tableName: 'exam' },
  );

  return exam;
};
