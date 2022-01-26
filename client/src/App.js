import React from "react";
import "./App.css";
import Admin from "./components/Admin";
import Home from "./components/Home";
import ViewTeam from "./components/ViewTeam";
import Nav from "./components/Nav";
import ResizeObserver from "resize-observer-polyfill";
import CreateStudent from "./components/CreateStudent";
import CreateTournament from "./components/CreateTournament";
import EditTeam from "./components/EditTeam";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const ro = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
      const { left, top, width, height } = entry.contentRect;

      console.log("Element:", entry.target);
      console.log(`Element's size: ${width}px x ${height}px`);
      console.log(`Element's paddings: ${top}px ; ${left}px`);
    }
  });

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            {" "}
            <Home />
          </Route>
          <Route path="/team/:id">
            <ViewTeam />
          </Route>
          <Route path="/admin/">
            <Admin />
          </Route>
          <Route path="/create/">
            <CreateStudent />
          </Route>
          <Route path="/create-tourn/">
            <CreateTournament />
          </Route>
          <Route path="/edit/:id">
            <EditTeam />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
