module.exports = (sequelize, Sequelize) => {
  const studentChannel = sequelize.define(
    'studentChannel',
    {
      studentChannelId: {
        type: Sequelize.INTEGER, primaryKey: true, field: 'studentChannelId',
      },
      studentId: { type: Sequelize.STRING(16), allowNull: false, field: 'studentId' },
      role: { type: Sequelize.ENUM('ta', 'student', 'teacher'), allowNull: false, field: 'role' },
    },
    { tableName: 'studentChannel' },
  );

  return studentChannel;
};
