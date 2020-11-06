var express = require('express');
var router = express.Router();
var models = require('../../models');
var qiniu = require('qiniu');

router.get('/', async function (req, res, next) {
    var accessKey = '5JTyNVKd9_9nieM--b9blo7BouPxC4WFTb9KFtZb';
    var secretKey = 'Um1ERckbFPacQgqblvGQZeHxH3Wh0ez9CjM7Ppqb';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


    var options = {
        scope: 'clwyxiang',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    res.json({uploadToken: uploadToken});
});

module.exports = router;
