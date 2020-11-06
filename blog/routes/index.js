var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/',async function(req, res, next) {
// 推荐的课程（轮播图）
  const recommended_courses = await models.Course.findAll({
    where: {recommended: 1},
    order: [['id', 'DESC']],
    limit: 10
  })

  // 课程日历
  const calendar_courses = await models.Course.findAll({
    order: [['id', 'DESC']],
    limit: 10
  })

  // popular_courses - 人气课程
  const popular_courses = await models.Course.findAll({
    order: [['likesCount', 'DESC']],
    limit: 10
  })

  // introductory_courses - 入门课程
  const introductory_courses = await models.Course.findAll({
    where: {introductory: 1},
    order: [['id', 'DESC']],
    limit: 10
  })
  res.json({
    recommended_courses: recommended_courses,
    calendar_courses:calendar_courses,
    introductory_courses:introductory_courses,
    popular_courses:popular_courses,
  });
});

module.exports = router;
