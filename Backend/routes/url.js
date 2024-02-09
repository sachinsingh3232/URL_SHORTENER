const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetURL,
  handleGetAnalytics,
  handleGetAllUserURL,
  deleteURL,
  handleEdit,
} = require("../controllers/url");
const isUserAuthenticated = require("../Middleware/auth");

const router = express.Router();

router.post("/", isUserAuthenticated, handleGenerateNewShortURL);
router.get("/getAllUserURL", isUserAuthenticated, handleGetAllUserURL);
router.put("/handleEdit/:shortId", isUserAuthenticated, handleEdit);
router.get("/go/:shortId", handleGetURL);
router.post("/analytics", isUserAuthenticated, handleGetAnalytics);
router.delete("/deleteURL/:shortId", isUserAuthenticated, deleteURL);

module.exports = router;
