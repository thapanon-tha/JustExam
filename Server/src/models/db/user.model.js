module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    'user',
    {
      uid: {
        type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4, field: 'uid',
      },
      firstname: { type: Sequelize.STRING(128), allowNull: false, field: 'firstname' },
      surname: { type: Sequelize.STRING(128), allowNull: false, field: 'surname' },
      email: { type: Sequelize.STRING(128), allowNull: false, field: 'email' },
      password: { type: Sequelize.STRING(255), allowNull: true, field: 'password' },
      type: { type: Sequelize.ENUM('admin', 'student', 'teacher'), allowNull: false, field: 'type' },
      provider: { type: Sequelize.ENUM('Google', 'Justexam'), allowNull: false, field: 'provider' },
    },
    { tableName: 'user' },
  );

  return user;
};
