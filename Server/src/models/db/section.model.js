module.exports = (sequelize, Sequelize) => {
  const section = sequelize.define(
    'section',
    {
      sectionId: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'sectionId',
      },
      number: { type: Sequelize.INTEGER, allowNull: false, field: 'number' },
    },
    { tableName: 'section' },
  );

  return section;
};
