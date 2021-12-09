module.exports = (sequelize, Sequelize) => {
  const setting = sequelize.define(
    'setting',
    {
      settingid: {
        type: Sequelize.INTEGER, primaryKey: true, field: 'settingid',
      },
      showScore: { type: Sequelize.BOOLEAN, allowNull: false, field: 'showScore' },
      swapSection: { type: Sequelize.BOOLEAN, allowNull: false, field: 'swapSection' },
      swapQuestion: { type: Sequelize.BOOLEAN, allowNull: false, field: 'swapQuestion' },
      swapAnswer: { type: Sequelize.BOOLEAN, allowNull: false, field: 'swapAnswer' },
      randomQuestion: { type: Sequelize.BOOLEAN, allowNull: false, field: 'randomQuestion' },
    },
    { tableName: 'setting' },
  );

  return setting;
};
