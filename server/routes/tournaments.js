const express = require("express");
const router = express.Router();

const {
  getAllTournaments,
  getTournament,
  createTournament,
  updateTournament,
  deleteTournament,
} = require("../controlleres/tournaments");

router.route("/").get(getAllTournaments).post(createTournament);
router
  .route("/:id")
  .get(getTournament)
  .patch(updateTournament)
  .delete(deleteTournament);
module.exports = router;
