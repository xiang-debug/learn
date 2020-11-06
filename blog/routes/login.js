var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// 前台登录
router.post('/', async function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // 查询用户信息
    var user = await models.User.findOne({
        where: {
            username: username,
        },
    })

    // 用户是否存在
    if (!user) {
        res.json({success: false, msg: "用户名错误，请重新输入"});
        return;
    }

    // 验证密码
    if (!bcrypt.compareSync(password, user.password)) {
        res.json({success: false, msg: "密码错误，请重新输入"});
        return;
    }

    // 生成token，返回出去
    var token = jwt.sign({
        user: {
            id: user.id,
            username: user.username,
        }
    }, process.env.SECRET, {expiresIn: 60 * 60 * 24 * 7});

    res.json({success: true, msg: "登录成功", token: token});
});

module.exports = router;
