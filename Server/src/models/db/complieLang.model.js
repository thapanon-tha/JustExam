module.exports = (sequelize, Sequelize) => {
  const complieLang = sequelize.define(
    'complieLang',
    {
      clid: {
        type: Sequelize.INTEGER, primaryKey: true, field: 'clid',
      },
      name: { type: Sequelize.STRING(255), allowNull: false, field: 'name' },
    },
    { tableName: 'complieLang' },
  );

  return complieLang;
};
