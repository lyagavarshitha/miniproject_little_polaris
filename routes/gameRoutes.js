const express = require("express");
const router = express.Router();

const {
  getGames,
  unlockGame,
} = require("../controllers/gameController");

router.get("/", getGames);
router.post("/unlock", unlockGame);

module.exports = router;