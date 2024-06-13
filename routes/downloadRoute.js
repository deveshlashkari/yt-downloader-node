const express = require("express");
const {
  downloadVideo,
  getVideoDetails,
} = require("../controllers/downloadController");

const router = express.Router();

router.get("/download", downloadVideo);
router.get("/details", getVideoDetails);

module.exports = router;
