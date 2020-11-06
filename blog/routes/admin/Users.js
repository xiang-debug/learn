var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op
var bcrypt = require('bcryptjs');

router.get('/', async function (req, res, next) {
    // 搜索
    var where = {};

    // 当前页
    var currentPage = parseInt(req.query.currentPage) || 1;

    // 每页显示几条数据 ?title
    var pageSize = parseInt(req.query.pageSize) || 3;


    // 模糊查询名称
    var name = req.query.name;
    if (name) {
        where.name = {
            [Op.like]: '%' + name + '%'
        }
    }

    var result = await models.User.findAndCountAll({
        order: [['id', 'DESC']],
        where: where,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });

    res.json({
        users: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,

            // 一共有多少条记录
            total: result.count
        }
    });
});

router.get('/all', async function (req, res, next) {
    const user = await models.User.findAll();
    res.json({
        user: user,
    });
});

router.get('/:id', async function (req, res, next) {
    const user = await models.User.findByPk(req.params.id);
    res.json({
        user: user,
    });
});

router.put('/:id', async function (req, res, next) {
    const user = await models.User.findByPk(req.params.id);
    user.update(req.body);
    res.json({user: user});
});

router.post('/', async function (req, res, next) {
    const username = req.body.username;
    const user = await models.User.findOne({
        where: {
            username: username,
        },
    });

    if (user) {
        res.json({success: false, msg: "账号已经存在，请登录"});
        return;
    }

    let password = req.body.password;
    password = bcrypt.hashSync(password, 8)

    const newUser = await models.User.create({
        username: username,
        password: password,
        admin:1,
    });
    // var user = {
    //     ...req.body,
    //     password : bcrypt.hashSync(req.body.password, 8)
    // }
    // const user1 = await models.User.create(user);
    res.json({user: newUser});
});

router.delete('/:id', async function (req, res, next) {
    var user = await models.User.findByPk(req.params.id);
    user.destroy();
    res.json({msg: '删除成功'});
});
module.exports = router;
