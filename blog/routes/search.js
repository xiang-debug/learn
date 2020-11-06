var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op

// 课程列表
router.get('/', async function (req, res, next) {
    // 搜索
    var where = {};

    // 当前页
    var currentPage = parseInt(req.query.currentPage) || 1;

    // 每页显示几条数据
    var pageSize = parseInt(req.query.pageSize) || 2;


    // 模糊查询名称
    var q = req.query.q;
    if (q) {
        where.name = {
            [Op.like]: '%' + q + '%'
        }
    }

    var result = await models.Course.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        courses: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

module.exports = router;
