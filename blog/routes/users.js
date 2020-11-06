var express = require('express');
var router = express.Router();
var models = require('../models');

// 查询当前记录
router.get('/me', async function (req, res, next) {
  var user = await models.User.findOne({
    where: {id: req.user.id},
    include: [
      {
        model: models.Course,
        as: 'likeCourses',
      },
      {
        model: models.Course,
        as: 'historyCourses',
      },
    ]
  })

  res.json({user: user});
});

module.exports = router;
