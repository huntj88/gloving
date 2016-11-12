var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname+'/html/index.html'));

});

router.get('/js/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/js/'+req.params.resource));
});

router.get('/css/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/css/'+req.params.resource));
});

module.exports = router;
