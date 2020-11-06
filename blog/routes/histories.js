const express = require('express');
const router = express.Router();
const models = require('../models');
const Op = models.Sequelize.Op

// 收藏
router.post('/', async function (req, res, next) {
    const courseId = req.body.courseId;
    const userId = req.user.id;

    // 用户可能发送不存在的课程id，做一个判断
    const course = await models.Course.findByPk(courseId);
    if (!course) {
        res.json({success: false, msg: '课程不存在'});
        return;
    }

    // 判断是否已经收藏了
    const history = await models.History.findOne({
        where: {
            courseId: courseId,
            userId: userId
        }
    });

    if (history) {
        res.json({success: false, msg: '已经有记录了'})
        return;
    }

    // 写入数据库
    await models.History.create({
        courseId: courseId,
        userId: userId
    });

    res.json({success: true, msg: '记录成功'})
});


module.exports = router;
