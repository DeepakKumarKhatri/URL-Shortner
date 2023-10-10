var express = require('express');
var router = express.Router();
const urlController = require("../controllers/url");

router.post('/', urlController.handleGenerateNewURL);
router.get('/', urlController.handleWelcomeDashboard);
router.get('/:shortId', urlController.handleSearchURLByID);
router.get('/analytics/:shortId', urlController.handleGetURLAnalytics);

module.exports = router;