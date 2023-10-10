const ShortUniqueId = require("short-unique-id");
const URL = require("../models/url");

module.exports.handleWelcomeDashboard = async (req, res) => {
  return res.render("Welcome to URL dashboard");
};

module.exports.handleGenerateNewURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL not found" });

  const shortId = new ShortUniqueId({ length: 8 });
  const uid = new ShortUniqueId();

  await URL.create({
    shortId: uid.rnd(),
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ urlId: shortId });
};

module.exports.handleSearchURLByID = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
};

module.exports.handleGetURLAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
