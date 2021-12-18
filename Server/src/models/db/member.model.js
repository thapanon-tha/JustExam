module.exports = (sequelize, Sequelize) => {
  const member = sequelize.define(
    'member',
    {
      mid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'mid',
      },
      sid: {
        type: Sequelize.STRING(128), allowNull: false, field: 'sid',
      },
      state: { type: Sequelize.ENUM('NOT ATTENDANT', 'IN PROCESS', 'FINISH'), allowNull: false, field: 'state' },

    },
    { tableName: 'member' },
  );

  return member;
};
