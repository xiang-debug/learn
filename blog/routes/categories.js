var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/',async function(req, res, next) {
    const categories = await models.Category.findAll({
        order: [['sort', 'ASC']],
    })

    res.json({
        categories: categories,
    });
});

//分类对应的课程
router.get('/:id',async function(req, res, next) {
    const courses = await models.Course.findAll({
        //使用分类ID来查询 这个分类下面的所有课程
        where: {categoryId: req.params.id},
    })

    res.json({
        courses: courses,
    });
});

module.exports = router;
