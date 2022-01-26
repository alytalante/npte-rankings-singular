const express = require("express");
const app = express();
const teams = require("./routes/teams");
const tournaments = require("./routes/tournaments");
const connectDB = require("./db/connect");
require("dotenv").config();
var crypto = require("crypto");
const path = require("path");

//middleware /sdfsdfsdf

app.use(express.json());
// Use this after the variable declaration

app.use(express.static(path.resolve(__dirname, "../client/build")));

// routes

app.use("/api/v1/teams", teams);
app.use("/api/v1/tournaments", tournaments);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

start();
