var express = require('express');
var router = express.Router();
var models = require('../models');

//收藏
router.post('/',async function(req, res, next) {
    const courseId = req.body.courseId
    const userId = req.user.id

    //用户可能发送不存在的课程Id，做判断
    const course = await models.Course.findByPk(courseId)
    console.log(course)
    if(!course) {
        res.json({success: false, msg: '课程不存在'});
        return;
    }

// 判断是否已经收藏了
    const like = await models.Like.findOne({
        where: {
            courseId: courseId,
            userId: userId
        }
    });

    if (like) {
        res.json({success: false, msg: '你已经收藏了此课程'})
        return;
    }

    // 写入数据库，完成收藏
    await models.Like.create({
        courseId: courseId,
        userId: userId
    });

    // 点赞数 +1
    await course.increment('likesCount')

    res.json({success: true, msg: '收藏成功'})
});

// 取消收藏
router.delete('/', async function (req, res, next) {
    const courseId = req.body.courseId;
    const userId = req.user.id;

    // 用户可能发送不存在的课程id，做一个判断
    const course = await models.Course.findByPk(courseId);
    if (!course) {
        res.json({success: false, msg: '课程不存在'});
        return;
    }

    // 删除收藏记录
    const like = await models.Like.findOne({
        where: {
            courseId: courseId,
            userId: userId
        }
    });
    await like.destroy();

    // 点赞数 -1
    await course.decrement('likesCount')

    res.json({success: true, msg: '取消收藏成功'})
});

module.exports = router;
