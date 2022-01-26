const Tournament = require("../models/Tournament");

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find({});
    res.status(200).json({ tournaments });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json({ tournament });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTournament = async (req, res) => {
  try {
    const { id: tournamentID } = req.params;
    const tournament = await Tournament.findOne({ _id: tournamentID });
    if (!tournament) {
      return res
        .status(404)
        .json({ msg: `no message with ID: ${tournamentID}` });
    }
    res.status(200).json({ tournament });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTournament = async (req, res) => {
  try {
    const { id: tournamentID } = req.params;
    const tournament = await Tournament.findOneAndDelete({ _id: tournamentID });
    if (!tournament) {
      return res
        .status(404)
        .json({ msg: `no message with ID: ${tournamentID}` });
    }
    res.status(200).json({ tournament });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTournament = async (req, res) => {
  try {
    const { id: tournamentID } = req.params;
    const tournament = await Tournament.findOneAndUpdate(
      { _id: tournamentID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!tournament) {
      return res
        .status(404)
        .json({ msg: `no message with ID: ${tournamentID}` });
    }
    res.status(200).json({ tournament });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTournaments,
  getTournament,
  updateTournament,
  createTournament,
  deleteTournament,
};
