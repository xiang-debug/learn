var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op

router.get('/',async function (req, res, next) {
    // 搜索
    var where = {};

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

    var result = await models.Like.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        likes: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

router.get('/:id',async function (req, res, next) {
    const like = await models.Like.findByPk(req.params.id);
    res.json({
        like: like,
    });
});

router.put('/:id', async function (req, res, next) {
    const like = await models.Like.findByPk(req.params.id);
    like.update(req.body);
    res.json({like: like});
});

router.post('/', async function (req, res, next) {
    const like = await models.Like.create(req.body);
    res.json({like: like});
});

router.delete('/:id', async function (req, res, next) {
    var like = await models.Like.findByPk(req.params.id);
    like.destroy();
    res.json({msg: '删除成功'});
});
module.exports = router;
