var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op

router.get('/',async function (req, res, next) {
    // 搜索
    var where = {};

    if (req.query.course_id) {
        where.courseId = req.query.course_id
    }

    // 当前页
    var currentPage = parseInt(req.query.currentPage) || 1;

    // 每页显示几条数据 ?title
    var pageSize = parseInt(req.query.pageSize) || 10;


    // 模糊查询名称
    var name = req.query.name;
    if (name) {
        where.name = {
            [Op.like]: '%' + name + '%'
        }
    }

    var result = await models.Chapter.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
    });

    res.json({
        chapters: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

router.get('/:id',async function (req, res, next) {
    const chapter = await models.Chapter.findOne({
        where: {id: req.params.id},
    });
    res.json({
        chapter: chapter,
    });
});

router.put('/:id', async function (req, res, next) {
    const chapter = await models.Chapter.findByPk(req.params.id);
    chapter.update(req.body);
    res.json({chapter: chapter});
});

router.post('/', async function (req, res, next) {
    const chapter = await models.Chapter.create(req.body);
    res.json({chapter: chapter});
});

router.delete('/:id', async function (req, res, next) {
    var chapter = await models.Chapter.findByPk(req.params.id);
    chapter.destroy();
    res.json({msg: '删除成功'});
});
module.exports = router;
