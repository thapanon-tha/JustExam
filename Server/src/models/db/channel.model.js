module.exports = (sequelize, Sequelize) => {
  const channel = sequelize.define(
    'channel',
    {
      cid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'cid',
      },
      inviteCode: { type: Sequelize.INTEGER, allowNull: false, field: 'inviteCode' },
      title: { type: Sequelize.STRING(100), allowNull: true, field: 'title' },
      description: { type: Sequelize.STRING(255), allowNull: true, field: 'description' },
      status: { type: Sequelize.ENUM('pending', 'coming', 'process', 'finish'), allowNull: false, field: 'status' },
      schedule: { type: Sequelize.DATE(6), allowNull: true, field: 'schedule' },
      startAt: { type: Sequelize.DATE(6), allowNull: true, field: 'startAt' },
      endAt: { type: Sequelize.DATE(6), allowNull: true, field: 'endAt' },
      releaseScoreFlag: {
        type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'releaseScoreFlag',
      },

    },
    { tableName: 'channel' },
  );

  return channel;
};
