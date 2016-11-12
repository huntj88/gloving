var express = require('express');
var router = express.Router();


router.post('/sortIndex', function (req, res, next) {
    var request = require('./sortIndex');
    request.sortIndex(req, res);
});

router.get('/resource/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/js/'+req.params.resource));
});

router.get('/css/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/css/'+req.params.resource));
});

module.exports = router;
