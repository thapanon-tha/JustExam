module.exports = (sequelize, Sequelize) => {
  const channel = sequelize.define(
    'channel',
    {
      channelid: {
        type: Sequelize.INTEGER, primaryKey: true, field: 'channelid',
      },
      description: { type: Sequelize.TEXT, allowNull: false, field: 'description' },
      status: { type: Sequelize.ENUM('pending', 'coming', 'process', 'finish'), allowNull: false, field: 'status' },
      startAt: { type: Sequelize.DATETIME(6), allowNull: true, field: 'startAt' },
      endAt: { type: Sequelize.DATETIME(6), allowNull: true, field: 'endAt' },
      inviteCode: { type: Sequelize.STRING(16), allowNull: true, field: 'inviteCode' },
    },
    { tableName: 'channel' },
  );

  return channel;
};
