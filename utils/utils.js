var express = require('express');
var router = express.Router();
var path    = require("path");

router.get('/js/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/js/'+req.params.resource));
});

router.get('/css/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/css/'+req.params.resource));
});

module.exports = router;