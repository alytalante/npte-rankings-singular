import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "./images/npte.png";

function Home() {
  const [page, setPage] = useState(1);
  const [data, setData] = React.useState([]);
  const [tournData, setTournData] = React.useState([]);
  let pagesArray = [[], []];

  const axiosPosts = async () => {
    const response = await axios.get("/api/v1/teams");
    setData(response.data.teams.sort((a, b) => b.points - a.points));
  };

  const axiosTourns = async () => {
    const response = await axios.get("/api/v1/tournaments");
    setTournData(response.data.tournaments);
  };

  React.useEffect(() => {
    axiosPosts();
    axiosTourns();
  }, []);

  function paginate(array, perPage) {
    let page1 = array.slice(0, perPage);
    let page2 = array.slice(perPage, perPage * 2);
    let page3 = array.slice(perPage * 2, perPage * 3);
    let page4 = array.slice(perPage * 3, perPage * 4);

    if (array.length > 0) {
      pagesArray = [];
      pagesArray.push(page1);
      if (array.length > perPage) {
        pagesArray.push(page2);
        if (array.length > perPage * 2) {
          pagesArray.push(page3);
          if (array.length > perPage * 3) {
            pagesArray.push(page4);
          }
        }
      }
    }

    return (
      <>
        {pagesArray.map((pg) => {
          return (
            <>
              {page === pagesArray.indexOf(pg) + 1 && (
                <>
                  {" "}
                  {pagesArray[pagesArray.indexOf(pg)].map((team) => {
                    let mod = 50 * pagesArray.indexOf(pg);
                    return (
                      <tr>
                        <td>
                          {pagesArray[pagesArray.indexOf(pg)].indexOf(team) +
                            1 +
                            mod}
                        </td>
                        <td>
                          <Link to={"/team/" + team._id}>
                            {team.school} {team.s1LastName}/{team.s2LastName}
                          </Link>
                        </td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>
                          {calculateWins(team.wins, team.losses)
                            .toString()
                            .substr(0, 4)}
                          %
                        </td>
                        <td>{topFour(team.tournaments)}</td>
                      </tr>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </>
    );
  }

  function topFour(data) {
    let pointsArray = [];

    for (let i = 0; i < data.length; i++) {
      pointsArray.push(data[i].points);
    }

    let sortedPoints = pointsArray.sort((a, b) => b - a);

    if (sortedPoints.length > 4) {
      sortedPoints.length = 4;
    }

    let total = 0;

    for (let i = 0; i < sortedPoints.length; i++) {
      total = total + pointsArray[i];
    }

    return total.toString().substring(0, 5);
  }

  function pageBtns() {
    function pageUp() {
      if (page < pagesArray.length) {
        setPage(page + 1);
      }
    }

    function pageDown() {
      if (page !== 1) {
        setPage(page - 1);
      }
    }

    return (
      <div className="btnBox">
        <button onClick={() => pageDown()} className="pageButton">
          Previous
        </button>
        Page {page} of {pagesArray.length}
        <button onClick={() => pageUp()} className="pageButton">
          Next
        </button>
      </div>
    );
  }

  function calculateWins(wins, losses) {
    let rounds = wins + losses;
    let raw = wins / rounds;
    let percent = raw * 100;
    if (wins === 0) {
      return 0;
    } else {
      return percent;
    }
  }

  function orderData() {
    data.sort((a, b) => {
      return a.points - b.points;
    });
  }

  return (
    <div className="App">
      <div className="subHead">
        <h1>2021-2022 NPTE Rankings</h1>
        <p>
          Inclusion in the NPTE rankings does not indicate that a school is a
          member of the NPTE. A full list of NPTE member schools can be found{" "}
          <a href="https://www.nptedebate.org/schools">here</a>.
        </p>
      </div>
      <div className="tournsBox">
        <h4>Currently Entered Tournaments</h4>
        {tournData.map((tournament) => {
          return <>{tournament.name}, </>;
        })}
      </div>
      <table>
        <tbody>
          <tr className="rounded">
            <th>Rank</th>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Percent</th>
            <th>Points</th>
          </tr>
          {paginate(data, 50)}
        </tbody>
      </table>
      {pageBtns()}
    </div>
  );
}

export default Home;
