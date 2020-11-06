var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/:id',async function(req, res, next) {
    var chapter = await models.Chapter.findOne({
        where: {id: req.params.id},
    })

    // 当前课程，所有的章节
    const courseId = chapter.courseId
    const chapters = await models.Chapter.findAll({
        where: {courseId: courseId},
    });

    res.json({
        chapters: chapters,
        chapter:chapter,
    });
});

module.exports = router;
