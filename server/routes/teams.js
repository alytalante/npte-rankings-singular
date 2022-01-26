const express = require("express");
const router = express.Router();

const {
  getAllTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controlleres/teams");

router.route("/").get(getAllTeams).post(createTeam);
router.route("/:id").get(getTeam).patch(updateTeam).delete(deleteTeam);
module.exports = router;
