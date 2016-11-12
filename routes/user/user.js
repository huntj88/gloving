/**
 * Created by James on 11/10/2016.
 */
var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/createAccount', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/createAccount.html'));
});

router.post('/createAccount', function (req, res, next) {
    var request = require('./createAccount');
    request.createAccount(req,res);
});

router.post('/login', function (req, res, next) {
    var request = require('./account');
    request.login(req,res);
});


router.post('/viewAccount', function(req, res, next) {
    /*var request = require('./account');
    request.viewAccount(req,res);*/
    res.redirect("./viewAccount?userID="+req.body.userID);
});

router.get('/viewAccount', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/viewAccount.html'));
});

router.get('/js/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/js/'+req.params.resource));
});

router.get('/css/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/css/'+req.params.resource));
});


module.exports = router;
