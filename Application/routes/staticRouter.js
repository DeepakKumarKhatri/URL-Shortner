var express = require('express');
var router = express.Router();
const URL = require("../models/url");

router.get('/', async function(req, res){
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,
    });
});

module.exports = router;