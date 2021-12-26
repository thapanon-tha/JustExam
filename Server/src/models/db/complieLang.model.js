module.exports = (sequelize, Sequelize) => {
  const complieLang = sequelize.define(
    'complieLang',
    {
      ctid: {
        type: Sequelize.INTEGER, primaryKey: true, field: 'ctid',
      },
      name: { type: Sequelize.STRING(255), allowNull: false, field: 'name' },
    },
    { tableName: 'complieLang' },
  );

  return complieLang;
};
