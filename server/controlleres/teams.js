const Team = require("../models/Team");

const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ team });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTeam = async (req, res) => {
  try {
    const { id: teamID } = req.params;
    const team = await Team.findOne({ _id: teamID });
    if (!team) {
      return res.status(404).json({ msg: `no message with ID: ${teamID}` });
    }
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id: teamID } = req.params;
    const team = await Team.findOneAndDelete({ _id: teamID });
    if (!team) {
      return res.status(404).json({ msg: `no message with ID: ${teamID}` });
    }
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id: teamID } = req.params;
    const team = await Team.findOneAndUpdate({ _id: teamID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!team) {
      return res.status(404).json({ msg: `no message with ID: ${teamID}` });
    }
    res.status(200).json({ team });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  createTeam,
};
