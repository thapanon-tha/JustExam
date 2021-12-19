module.exports = (sequelize, Sequelize) => {
  const examChannel = sequelize.define(
    'examChannel',
    {
      ecid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'ecid',
      },
      title: { type: Sequelize.STRING(128), allowNull: false, field: 'title' },
      description: { type: Sequelize.STRING(255), allowNull: true, field: 'description' },
    },
    { tableName: 'examChannel' },
  );

  return examChannel;
};
