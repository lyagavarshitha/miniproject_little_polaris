const express = require("express");
const router = express.Router();

const {
  getChores,
  completeChore,
} = require("../controllers/choreController");

router.get("/:userId", getChores);
router.post("/complete", completeChore);

module.exports = router;