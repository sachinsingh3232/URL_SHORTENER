const shortid = require("shortid");
const URL = require("../models/url");
const mongoose = require("mongoose");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = shortid();

    await URL.create({
      userId: req.user._id,
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.status(200).json({ url: `${process.env.BASE_URL}/url/${shortID}` });
  } catch (e) {
    return res.status(500).json("Internal Server Error!");
  }
}

async function handleGetURL(req, res, next) {
  try {
    const shortId = req.params.shortId;
    let entry = await URL.findOne({
      shortId,
    })
    if (!entry) {
      return res.status(404).json("Invalid URL!")
    }
    entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            time: Date.now(),
          },
        },
      }
    );
    if (entry.redirectURL.substr(0, 4) === "http")
      return res.status(200).redirect(entry.redirectURL);
    else return res.status(200).redirect(`https://${entry.redirectURL}`);

  } catch (e) {
    return res.status(500).json("Internal Server Error!");
  }
}
async function handleEdit(req, res, next) {
  try {
    const shortId = req.params.shortId;
    let entry = await URL.findOne({
      shortId,
    })
    if (!entry) {
      return res.status(404).json("Invalid URL!")
    }
    if (entry.userId.toString() != req.user._id.toString()) {
      res.status(401).json("Unauthorised User!")
      return;
    }
    entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        redirectURL: req.body.url
      }
    );
    return res.status(200).json(`updated`);

  } catch (e) {
    return res.status(500).json("Internal Server Error!");
  }
}
async function handleGetAllUserURL(req, res) {
  try {
    const entry = await URL.find(
      {
        userId: req.user._id
      }
    );
    res.status(200).json({ data: entry });

  } catch (e) {
    console.log(e)
    return res.status(500).json("Internal Server Error!");
  }
}
async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.body.shortId;
    const result = await URL.findOne({ shortId });
    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });

  } catch (e) {
    return res.status(500).json("Internal Server Error!");
  }
}
async function deleteURL(req, res) {
  try {
    const shortId = req.params.shortId;
    let entry = await URL.findOne({ shortId: shortId.toString() });
    if (!entry || entry.userId.toString() != req.user._id.toString()) {
      res.status(401).json("Unauthorised User!")
      return;
    }
    entry = await URL.findOneAndDelete(
      {
        shortId,
      }
    );
    // res.json({ url: entry.redirectURL });
    return res.status(200).json("Deleted!");

  } catch (e) {
    console.log(e)
    return res.status(500).json("Internal Server Error!");
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetURL,
  handleGetAllUserURL,
  handleGetAnalytics,
  deleteURL,
  handleEdit
};
