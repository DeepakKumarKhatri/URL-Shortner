var express = require('express');
var router = express.Router();
const URL = require("../models/url");

router.get('/userScreen', async function(req, res){
    if (!req.user) return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id});
    return res.render("home", {
        urls: allUrls,
    });
});

router.get('/signup', async function(req, res){
    return res.render("signup");
});

router.get('/', async function(req, res){
    return res.render("welcome");
});

router.get('/login', async function(req, res){
    return res.render("login");
});

module.exports = router;