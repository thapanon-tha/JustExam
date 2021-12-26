module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    'category',
    {
      ctid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'ctid',
      },
      name: { type: Sequelize.STRING(128), allowNull: false, field: 'name' },
    },
    { tableName: 'category' },
  );

  return category;
};
