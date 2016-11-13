var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname+'/html/index.html'));

});

/*router.get('/phpmyadmin', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.send("<script>location.href = 'http://138.68.41.247:3000/phpmyadmin';</script>");

});*/

router.get('/js/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/js/'+req.params.resource));
});

router.get('/css/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/css/'+req.params.resource));
});

module.exports = router;
