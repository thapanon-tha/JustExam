module.exports = (sequelize, Sequelize) => {
  const role = sequelize.define(
    'role',
    {
      rid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'rid',
      },
      name: { type: Sequelize.STRING(128), allowNull: false, field: 'name' },
    },
    { tableName: 'role' },
  );

  return role;
};
