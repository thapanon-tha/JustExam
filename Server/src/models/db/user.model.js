module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define(
    'user',
    {
      userid: {
        type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'userid',
      },
      name: { type: Sequelize.STRING(128), allowNull: false, field: 'name' },
      surname: { type: Sequelize.STRING(128), allowNull: false, field: 'surname' },
      email: { type: Sequelize.STRING(128), allowNull: false, field: 'email' },
      password: { type: Sequelize.STRING(255), allowNull: true, field: 'password' },
      role: { type: Sequelize.ENUM('admin', 'student', 'teacher'), allowNull: false, field: 'role' },
      loginBy: { type: Sequelize.ENUM('Google', 'Justexam'), allowNull: false, field: 'loginBy' },
    },
    { tableName: 'user' },
  );

  return user;
};
