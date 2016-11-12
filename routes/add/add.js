/**
 * Created by James on 11/8/2016.
 */
var express = require('express');
var router = express.Router();
var path    = require("path");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


router.get('/addChip', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/addChip.html'));
});

router.post('/addChip', function (req, res, next) {
    console.log(req.body);
    var request = require('./addChip');
    request.addChip(req, res);
});


router.get('/addColor', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/addColor.html'));
});

router.post('/addColor', function (req, res, next) {
    var request = require('./addColor');
    request.addColor(req, res,path);
});

router.post('/getAllColorsForChip', function (req, res, next) {
    var request = require('./addSet');
    request.getAllColorsForChip(req, res);
});

router.post('/getAllAddedColors', function (req, res, next) {
    var request = require('./addColor');
    request.getAllAddedColors(req, res);
});


router.get('/addSet', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/addSet.html'));
});

router.post('/addSet', function (req, res, next) {
    console.log(req.body);
    var request = require('./addSet');
    request.addSet(req, res);
});

router.post('/getAllAddedChips', function (req, res, next) {
    var request = require('./addSet');
    request.getAllAddedChips(req, res);
});

router.post('/getAllPatternsForChip', function (req, res, next) {
    var request = require('./addSet');
    request.getAllPatternsForChip(req, res);
});

router.post('/getAllAddedPatterns', function (req, res, next) {
    var request = require('./addSet');
    request.getAllAddedPatterns(req, res);
});


router.post('/givePoint', function (req, res, next) {
    var request = require('./points');
    console.log("hi");
    request.givePoint(req, res);
});


router.get('/js/:resource', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/html/js/'+req.params.resource));
});


module.exports = router;
