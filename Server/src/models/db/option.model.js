module.exports = (sequelize, Sequelize) => {
  const option = sequelize.define(
    'option',
    {
      oid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'oid',
      },
    },
    { tableName: 'option' },
  );

  return option;
};
