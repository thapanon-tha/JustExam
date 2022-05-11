const nodemailer = require('nodemailer');
const db = require('../models/db');
const { redisClient } = require('../configs/redis.config');
const Channel = require('../services/channel.service');
const stdCode = require('./stdCode');
const examChannelService = require('../services/examChannel.service');
const channelService = require('../services/channel.service');
const memberService = require('../services/member.service');
const answerQuestionScoreService = require('../services/answerQuestionScore');

const status = ['pending', 'coming', 'process', 'finish'];
// array array
const randomsection = (allSection, completeSection) => {
  const sectionList = allSection.filter(
    (val) => completeSection.indexOf(val) === -1,
  );
  const random = sectionList[Math.floor(Math.random() * sectionList.length)];
  return random;
};

const randomQuestions = (e) => {
  const questions = e;
  const final = [];
  const { length } = e;
  for (i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * questions.length);
    final.push(questions[random]);
    questions.splice(random, 1);
  }

  return final;
};

const getStandardDeviation = (array) => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
};

module.exports = {
  async getChannel(req, res) {
    const { inviteCode } = req.query;
    const { uid } = req.user;
    const userType = req.user.type;
    try {
      if (inviteCode !== undefined) {
        const data = await Channel.getByCode(inviteCode);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound(
            { message: `inviteCode : ${inviteCode} Not Found` },
            res,
          );
        }
      } else {
        // Owner
        // eslint-disable-next-line no-lonely-if
        if (!userType.localeCompare('teacher')) {
          const data = await Channel.getOwner(uid);
          if (data) {
            stdCode.querySuccess(data, res);
          } else {
            stdCode.NotFound({ message: 'Not Found' }, res);
          }
        } else {
          const data = await Channel.getMember(uid);
          if (data) {
            stdCode.querySuccess(data, res);
          } else {
            stdCode.NotFound({ message: 'Not Found' }, res);
          }
        }
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async isTa(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    try {
      const user = await memberService.findByCidAndUid(cid, uid);
      let isTA = false;
      if (!(user.rid === '1297e88a-0d46-4f5d-a5bf-69ecbcc541b5')) {
        isTA = true;
      }

      stdCode.querySuccess({ isTA }, res);
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async addChannel(req, res) {
    const {
      title, description, schedule, startAt, endAt,
    } = req.body.data;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) {
        throw Error('title can\'t be " "');
      }
      const invidecode = Date.now().toString(16) + uid.split('-')[2];
      const code = invidecode.substring(
        invidecode.length - 9,
        invidecode.length - 2,
      );
      const data = await Channel.create(
        code,
        title,
        description,
        status[0],
        schedule,
        startAt,
        endAt,
        uid,
        transaction,
      );
      if (data) {
        await transaction.commit();
        stdCode.Created(data, res);
      } else {
        throw Error('Something wrong');
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async getChannelById(req, res) {
    const { uid } = req.user;
    const userType = req.query.type || req.user.type;
    const { cid } = req.params;
    try {
      // Owner
      // eslint-disable-next-line no-lonely-if
      if (!userType.localeCompare('teacher')) {
        const data = await Channel.getOwnerByCid(cid, uid);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound({ message: 'Not Found' }, res);
        }
      } else {
        const data = await Channel.getMemberByCid(cid, uid);
        if (data) {
          stdCode.querySuccess(data, res);
        } else {
          stdCode.NotFound({ message: 'Not Found' }, res);
        }
      }
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  async updateChannel(req, res) {
    const { uid } = req.user;
    const { cid } = req.params;
    const {
      title, description, schedule, startAt, endAt, releaseScoreFlag,
    } = req.body.data;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      if (title.length === 0) {
        throw Error('title can\'t be " "');
      }
      const response = await Channel.update(
        cid,
        uid,
        title,
        description,
        schedule,
        startAt,
        endAt,
        releaseScoreFlag,
        transaction,
      );
      if (response[0]) {
        await transaction.commit();
        const data = await Channel.getOwnerByCid(cid, uid);
        stdCode.querySuccess(data, res);
      } else {
        throw Error("something wrong can't update");
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async deleteChannel(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await Channel.delete(cid, uid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        stdCode.NotFound(
          { message: `cid: ${cid} Not Found or uid Incorrect` },
          res,
        );
      }
    } catch (e) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(e, res);
    }
  },

  async startExam(req, res) {
    const { cid } = req.params;
    const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940';
    let redisUid = await redisClient.get(uid);
    let examData = await redisClient.get(cid);
    let sectionList;
    if (!examData) {
      const Exampaper = await examChannelService.queryExamPaper(cid);
      const Paper = await Promise.all(
        Exampaper.map((data) => {
          let finalData = {};
          finalData = {
            ...data.dataValues,
          };
          if (data.dataValues.questionAnswerCChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerCChannels];
          }
          if (data.dataValues.questionAnswerMCChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerMCChannels];
          }
          if (data.dataValues.questionAnswerMChannels.length !== 0) {
            finalData.answer = [...data.dataValues.questionAnswerMChannels];
          }
          delete finalData?.questionAnswerCChannels;
          delete finalData?.questionAnswerMCChannels;
          delete finalData?.questionAnswerMChannels;
          return finalData;
        }),
      );
      await redisClient.set(cid, JSON.stringify(Paper));
      examData = await redisClient.get(cid);
    }
    examData = JSON.parse(examData);
    if (!redisUid) {
      sectionList = examData.map((data) => data.sectionName);
      sectionList = Array.from(new Set(sectionList));
      const map1 = {
        cid,
        section: sectionList,
      };
      await redisClient.set(uid, JSON.stringify(map1));
      redisUid = await redisClient.get(uid);
      redisUid = JSON.parse(redisUid);
    } else {
      redisUid = JSON.parse(redisUid);
    }
    sectionList = redisUid.section;
    const sectionName = sectionList[Math.floor(Math.random() * sectionList.length)];
    const finalList = examData.filter(
      (exam) => exam.sectionName === sectionName,
    );
    redisUid.section = sectionList.filter((value) => value !== sectionName);
    await redisClient.set(uid, JSON.stringify(redisUid));
    res.json(finalList);
  },

  async continue(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    const uidKey = `exam+${cid}+${uid}`;
    const cidKey = `exam+${cid}`;
    // exam for cid  key  `exam + ${cid}`                 structure key: { section: [], questions: [], }
    // exam for uid  key  `exam + ${cid} + ${uid}`        structure key: { current: ${sectionNo}, completeSection: [] }
    const channelDetail = await channelService.getById(cid);
    let transaction;
    /*
    !condition to check
    check datetime

    */

    try {
      transaction = await db.sequelize.transaction();
      let redisUid = await redisClient.get(uidKey);

      //! Get DATA From Redis and Store data to Redis
      let examData = await redisClient.get(cidKey);
      if (!examData) {
        const Exampaper = await examChannelService.queryExamPaper(cid);
        const Paper = await Promise.all(
          Exampaper.map((data) => {
            let finalData = {};
            finalData = {
              ...data.dataValues,
            };
            if (data.dataValues.questionAnswerCChannels.length !== 0) {
              finalData.answer = [...data.dataValues.questionAnswerCChannels];
            }
            if (data.dataValues.questionAnswerMCChannels.length !== 0) {
              finalData.answer = [...data.dataValues.questionAnswerMCChannels];
            }
            if (data.dataValues.questionAnswerMChannels.length !== 0) {
              finalData.answer = [...data.dataValues.questionAnswerMChannels];
            }
            delete finalData?.questionAnswerCChannels;
            delete finalData?.questionAnswerMCChannels;
            delete finalData?.questionAnswerMChannels;
            return finalData;
          }),
        );
        const section = Paper.map((e) => parseInt(e.sectionName, 10));
        const uniqueNames = section.filter(
          (value, index) => section.indexOf(value) == index,
        );
        const packged = {
          questions: Paper,
          sections: uniqueNames,
        };
        await redisClient.set(cidKey, JSON.stringify(packged));
        examData = await redisClient.get(cidKey);
      }
      examData = JSON.parse(examData);

      if (!redisUid) {
        const user = { current: null, completeSection: [], questions: null };
        await redisClient.set(uidKey, JSON.stringify(user));
        redisUid = await redisClient.get(uidKey);
        await memberService.updateStatusByUidAndCid(
          uid,
          cid,
          'IN PROCESS',
          transaction,
        );
      }
      redisUid = JSON.parse(redisUid);

      let Pquestions = [];
      const PSection = {
        current: null,
        number: null,
      };

      if (redisUid.current === null) {
        const randomResult = randomsection(
          examData.sections,
          redisUid.completeSection,
        );
        redisUid.current = randomResult;
        const sectionsQuestions = examData.questions.filter(
          (e) => parseInt(e.sectionName, 10) === redisUid.current,
        );
        redisUid.questions = randomQuestions(sectionsQuestions);
      }

      PSection.current = redisUid.completeSection.length + 1;
      PSection.number = examData.sections.length;
      Pquestions = redisUid.questions;

      await redisClient.set(uidKey, JSON.stringify(redisUid));
      const responesPack = {
        questions: Pquestions,
        Section: PSection,
        channel: channelDetail,
      };
      await transaction.commit();
      if (examData.questions.length === 0) {
        await redisClient.del(uidKey);
        await redisClient.del(cidKey);
      }

      res.json(responesPack);
    } catch (error) {
      await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },

  async submitExam2(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    const { data } = req.body;
    const uidKey = `exam+${cid}+${uid}`;
    const cidKey = `exam+${cid}`;
    let transaction;
    const channelDetail = await channelService.getById(cid);
    /*
    !condition to check
    check datetime

    */
    try {
      transaction = await db.sequelize.transaction();
      const member = await memberService.findByCidAndUid(cid, uid);
      let answers;
      if (member) {
        answers = data.map((e) => ({
          mid: member.dataValues.mid,
          ecid: e.ecid,
          qecid: e.qecid,
          pointReviceve: 0,
          answer: JSON.stringify(e.answer),
        }));
      } else {
        throw new Error('you are not member');
      }

      // auto gread
      answers = await Promise.all(
        answers.map((e) => answerQuestionScoreService.autoGread(e)),
      );
      await answerQuestionScoreService.createMany(answers, transaction);
      await transaction.commit();
      let examData = await redisClient.get(cidKey);
      let redisUid = await redisClient.get(uidKey);
      redisUid = JSON.parse(redisUid);
      examData = JSON.parse(examData);
      redisUid.completeSection.push(redisUid.current);
      redisUid.current = null;
      redisUid.questions = null;
      await redisClient.set(uidKey, JSON.stringify(redisUid));

      redisUid = await redisClient.get(uidKey);
      redisUid = JSON.parse(redisUid);
      if (redisUid.completeSection.length === examData.sections.length) {
        transaction2 = await db.sequelize.transaction();
        await memberService.updateStatusByUidAndCid(
          uid,
          cid,
          'FINISH',
          transaction,
        );
        await transaction2.commit();
        return res.sendStatus(202);
      }
      let Pquestions = [];
      const PSection = {
        current: null,
        number: null,
      };

      if (redisUid.current === null) {
        const randomResult = randomsection(
          examData.sections,
          redisUid.completeSection,
        );
        redisUid.current = randomResult;
        const sectionsQuestions = examData.questions.filter(
          (e) => parseInt(e.sectionName, 10) === redisUid.current,
        );
        redisUid.questions = randomQuestions(sectionsQuestions);
      }

      PSection.current = redisUid.completeSection.length + 1;
      PSection.number = examData.sections.length;
      Pquestions = redisUid.questions;

      await redisClient.set(uidKey, JSON.stringify(redisUid));
      const responesPack = {
        questions: Pquestions,
        Section: PSection,
        channel: channelDetail,
      };
      res.json(responesPack);
    } catch (error) {
      stdCode.Unexpected(error, res);
    }
  },

  // async submitExam(req, res) {
  //   const { cid } = req.params;
  //   const uid = 'a7baa518-29cd-4ff1-ae2c-42ddeeb31940';
  //   let exams = await redisClient.get(cid);
  //   exams = JSON.parse(exams);
  //   let userSection = await redisClient.get(uid);
  //   userSection = JSON.parse(userSection);
  //   const sectionList = userSection.section;
  //   const sectionName = sectionList[Math.floor(Math.random() * sectionList.length)];
  //   const finalList = exams.filter((exam) => exam.sectionName === sectionName);
  //   userSection.section = sectionList.filter((value) => value !== sectionName);
  //   await redisClient.set(uid, JSON.stringify(userSection));
  //   res.json(finalList);
  // },

  async sendEmail(req, res) {
    const { uid } = req.user;
    const { cid } = req.params;
    try {
      const channel = await channelService.getById(cid);
      const pretotalPoint = await examChannelService.totalPointChannel(cid);
      const totalPoint = pretotalPoint[0].dataValues.questionExamChannels.reduce(
        (previousValue, currentValue) => previousValue + currentValue?.point,
        0,
      )
      const member = await memberService.getmemberAndScore(cid, channel.ecid);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.JEemail,
          pass: process.env.JEpassword,
        },
      });
      const array = [];
      const newMember = member.map((e) => ({
        email: e.user.email,
        name: `${e.user.firstname} ${e.user.surname}`,
        score: e.answerQuestionScores.reduce(
          (previousValue, currentValue) => previousValue + currentValue?.pointReviceve,
          0,
        ),
      }));

      const score = newMember.map((e) => e.score);
      const scoreMax = Math.max(...score);
      const scoreMin = Math.min(...score);
      const scoreSD = getStandardDeviation(score);
      const scoreMean = score.reduce((a, b) => a + b, 0) / score.length;
      newMember.forEach((element) => {
        const mailOptions = {
          from: process.env.JEemail,
          to: element.email,
          subject: `${channel.title} - Your score has been release`,
          html: `<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-49p6 {
    width: 248px !important;
  }

  .u-row .u-col-50p4 {
    width: 252px !important;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #f7fbfc;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f7fbfc;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://i.ibb.co/3CbTb71/Icon-just-exam.png" alt="Cart Icon" title="Cart Icon" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 72px;" width="72"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 25.2px; font-size: 18px;">Justexam - ${channel.title}</span></strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">Hi ${element.name}, your has been release</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #e7e7e7;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="248" style="background-color: #f7fbfc;width: 248px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-49p6" style="max-width: 320px;min-width: 248px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f7fbfc;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><strong><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">Your score is ${element.score}</span></strong></p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 14px; line-height: 19.6px;">Mean score is ${scoreMean}</span></strong></span></p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;"><strong><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">SD is ${scoreSD}</span></strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="252" style="background-color: #f7fbfc;width: 252px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-50p4" style="max-width: 320px;min-width: 252px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f7fbfc;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong>Total score is ${totalPoint}</strong></span></p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong>Max score is ${scoreMax}</strong></span></p>
<p style="font-size: 14px; line-height: 140%;">&nbsp;</p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong>Min score is ${scoreMin}</strong></span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #f7fbfc;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f7fbfc;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #e7e7e7;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">If you have any questions, reply to this</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;">email or <strong>contact us at </strong>je.justexam@gmail.com</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>`,
        };
        transporter.sendMail(mailOptions);
      });

      stdCode.querySuccess(array, res);
    } catch (error) {
      console.log(error);
      stdCode.Unexpected(error, res);
    }
  },

  async leaveMember(req, res) {
    const { cid } = req.params;
    const { uid } = req.user;
    let transaction;
    try {
      transaction = await db.sequelize.transaction();
      const data = await memberService.deleteByUId(uid, cid, transaction);
      if (data) {
        await transaction.commit();
        stdCode.Success(res);
      } else {
        throw Error("something wrong can't update");
      }
    } catch (error) {
      if (transaction) await transaction.rollback();
      stdCode.Unexpected(error, res);
    }
  },
};
