module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define(
    'category',
    {
      cid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'cid',
      },
      name: { type: Sequelize.STRING(128), allowNull: false, field: 'name' },
    },
    { tableName: 'category' },
  );

  return category;
};
