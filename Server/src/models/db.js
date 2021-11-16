const Sequelize = require('sequelize');
const dbConfig = require('../configs/db.config');

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USERNAME,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    define: dbConfig.DB_DEFINE,
    timezone: '+07:00',
    logging: false,
  },
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(0);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./db/user.model')(sequelize, Sequelize);
db.tags = require('./db/tags.model')(sequelize, Sequelize);
db.exam = require('./db/exam.model')(sequelize, Sequelize);
db.examTags = require('./db/examTags.model')(sequelize, Sequelize);
db.section = require('./db/section.model')(sequelize, Sequelize);
db.questions = require('./db/questions.model')(sequelize, Sequelize);
db.choices = require('./db/choices.model')(sequelize, Sequelize);

db.user.hasMany(
  db.exam,
  {
    foreignKey: { name: 'owner', field: 'owner' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.exam.belongsTo(db.user, { foreignKey: 'owner' });

db.exam.hasMany(
  db.section,
  {
    foreignKey: { name: 'examId', field: 'examId' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.section.belongsTo(db.exam, { foreignKey: 'examId' });

db.section.hasMany(
  db.questions,
  {
    foreignKey: { name: 'sectionId', field: 'sectionId' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questions.belongsTo(db.section, { foreignKey: 'sectionId' });

db.questions.hasMany(
  db.choices,
  {
    foreignKey: { name: 'questionId', field: 'questionId' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.choices.belongsTo(db.questions, { foreignKey: 'questionId' });

db.tags.belongsToMany(db.exam, {
  through: db.examTags,
  foreignKey: 'tagId',
  otherKey: 'examId',
});
db.exam.belongsToMany(db.tags, {
  through: db.examTags,
  foreignKey: 'examId',
  otherKey: 'tagId',
});

module.exports = db;
