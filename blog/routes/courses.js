var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/:id',async function(req, res, next) {
    const courses = await models.Course.findOne({
        where: {id: req.params.id},
        include:[
            models.Chapter,
            {
                model: models.User,
                as: 'teacher',
                attributes: ['id', 'username']
            },
        ]
    })

    res.json({
        courses: courses,
    });
});

module.exports = router;
