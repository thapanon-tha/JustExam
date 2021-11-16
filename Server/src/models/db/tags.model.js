module.exports = (sequelize, Sequelize) => {
  const tags = sequelize.define(
    'tags',
    {
      tagId: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'tagId',
      },
      name: { type: Sequelize.STRING(45), allowNull: false, field: 'name' },
    },
    { tableName: 'tags' },
  );

  return tags;
};
