module.exports = (sequelize, Sequelize) => {
  const optionType = sequelize.define(
    'optionType',
    {
      otid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'otid',
      },
      name: { type: Sequelize.STRING(100), allowNull: false, field: 'name' },
    },
    { tableName: 'optionType' },
  );

  return optionType;
};
