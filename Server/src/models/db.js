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
db.category = require('./db/category.model')(sequelize, Sequelize);
db.exam = require('./db/exam.model')(sequelize, Sequelize);
db.question = require('./db/question.model')(sequelize, Sequelize);
db.questionType = require('./db/questionType.model')(sequelize, Sequelize);
db.complieLang = require('./db/complieLang.model')(sequelize, Sequelize);
db.questionAnswerC = require('./db/questionAnswerC.model')(sequelize, Sequelize);
db.questionAnswerM = require('./db/questionAnswerM.model')(sequelize, Sequelize);
db.questionAnswerMC = require('./db/questionAnswerMC.model')(sequelize, Sequelize);
db.questionAnswerSA = require('./db/questionAnswerSA.model')(sequelize, Sequelize);
db.questionAnswerTF = require('./db/questionAnswerTF.model')(sequelize, Sequelize);
db.optionType = require('./db/optionType.model')(sequelize, Sequelize);
db.option = require('./db/option.model')(sequelize, Sequelize);
db.channel = require('./db/channel.model')(sequelize, Sequelize);
db.role = require('./db/role.model')(sequelize, Sequelize);
db.member = require('./db/member.model')(sequelize, Sequelize);

db.role.hasMany(
  db.member,
  {
    foreignKey: { name: 'rid', field: 'rid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.member.belongsTo(db.role, { foreignKey: 'rid' });

db.channel.hasMany(
  db.member,
  {
    foreignKey: { name: 'cid', field: 'cid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.member.belongsTo(db.channel, { foreignKey: 'cid' });

db.user.hasMany(
  db.member,
  {
    foreignKey: { name: 'uid', field: 'uid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.member.belongsTo(db.user, { foreignKey: 'uid' });

db.user.hasMany(
  db.channel,
  {
    foreignKey: { name: 'uid', field: 'uid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.channel.belongsTo(db.user, { foreignKey: 'uid' });

db.channel.hasMany(
  db.option,
  {
    foreignKey: { name: 'cid', field: 'cid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.option.belongsTo(db.channel, { foreignKey: 'cid' });

db.optionType.hasMany(
  db.option,
  {
    foreignKey: { name: 'otid', field: 'otid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.option.belongsTo(db.optionType, { foreignKey: 'otid' });

db.questionType.hasMany(
  db.question,
  {
    foreignKey: { name: 'qtid', field: 'qtid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.question.belongsTo(db.questionType, { foreignKey: 'qtid' });

db.exam.hasMany(
  db.question,
  {
    foreignKey: { name: 'eid', field: 'eid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.question.belongsTo(db.exam, { foreignKey: 'eid' });

db.user.hasMany(
  db.exam,
  {
    foreignKey: { name: 'uid', field: 'uid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.exam.belongsTo(db.user, { foreignKey: 'uid' });

db.category.hasMany(
  db.exam,
  {
    foreignKey: { name: 'cid', field: 'cid' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
);
db.exam.belongsTo(db.user, { foreignKey: 'cid' });

db.complieLang.hasMany(
  db.questionAnswerC,
  {
    foreignKey: { name: 'clid', field: 'clid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerC.belongsTo(db.complieLang, { foreignKey: 'clid' });

db.question.hasMany(
  db.questionAnswerC,
  {
    foreignKey: { name: 'qid', field: 'qid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerC.belongsTo(db.question, { foreignKey: 'qid' });
db.question.hasMany(
  db.questionAnswerM,
  {
    foreignKey: { name: 'qid', field: 'qid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerM.belongsTo(db.question, { foreignKey: 'qid' });

db.question.hasMany(
  db.questionAnswerMC,
  {
    foreignKey: { name: 'qid', field: 'qid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerMC.belongsTo(db.question, { foreignKey: 'qid' });
db.question.hasMany(
  db.questionAnswerSA,
  {
    foreignKey: { name: 'qid', field: 'qid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerSA.belongsTo(db.question, { foreignKey: 'qid' });

db.question.hasMany(
  db.questionAnswerTF,
  {
    foreignKey: { name: 'qid', field: 'qid' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
);
db.questionAnswerTF.belongsTo(db.question, { foreignKey: 'qid' });

// db.exam.hasMany(
//   db.section,
//   {
//     foreignKey: { name: 'examId', field: 'examId' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
// );
// db.section.belongsTo(db.exam, { foreignKey: 'examId' });

// db.section.hasMany(
//   db.questions,
//   {
//     foreignKey: { name: 'sectionId', field: 'sectionId' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
// );
// db.questions.belongsTo(db.section, { foreignKey: 'sectionId' });

// db.questions.hasMany(
//   db.choices,
//   {
//     foreignKey: { name: 'questionId', field: 'questionId' },
//     onUpdate: 'CASCADE',
//     onDelete: 'CASCADE',
//   },
// );
// db.choices.belongsTo(db.questions, { foreignKey: 'questionId' });

// db.tags.belongsToMany(db.exam, {
//   through: db.examTags,
//   foreignKey: 'tagId',
//   otherKey: 'examId',
// });
// db.exam.belongsToMany(db.tags, {
//   through: db.examTags,
//   foreignKey: 'examId',
//   otherKey: 'tagId',
// });

const complieLangList = require('./Instances/complieLang');

db.complieLang.bulkCreate(
  complieLangList,
  { ignoreDuplicates: ['id'] },
);

module.exports = db;
