import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { UserData } from "./Data";
import ResizeObserver from "resize-observer-polyfill";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { install } from "resize-observer";

function ViewTeam(props) {
  install();

  const [userData, setUserData] = useState({
    labels: [],
    datasets: [],
  });
  const [yearData, setYearData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });
  const [data, setData] = useState([{ tournaments: [] }]);
  const [dl, setDl] = useState(false);

  const addponts = (tournaments) => {
    let array = [];
    let totalpoints = 0;
    tournaments.forEach((tourn) => {
      array.push(tourn.points + totalpoints);
      let newpoints = tourn.points + totalpoints;
      totalpoints = newpoints;
    });
    return array;
  };

  const axiosPosts = () => {
    axios.get("/api/v1/teams/" + props.match.params.id).then((res) => {
      setData(res.data.team);
      console.log(res.data.team);
      setUserData({
        labels: res.data.team.tournaments.map((tournament) =>
          tournament.name.substring(0, 9)
        ),
        datasets: [
          {
            label: "",
            data: res.data.team.tournaments.map(
              (tournament) => tournament.points
            ),
            backgroundColor: [
              "#3F6DA4",
              "#F9F871",
              "#0091C0",
              "#94EA87",
              "#00B3C1",
              "#00D2AA",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      setPieData({
        labels: ["Win", "Loss"],
        datasets: [
          {
            label: "Win/Loss Record",
            data: [res.data.team.wins, res.data.team.losses],
            backgroundColor: ["#3F6DA4", "#A05369"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

      setYearData({
        labels: res.data.team.tournaments.map((tournament) =>
          tournament.name.substring(0, 9)
        ),
        datasets: [
          {
            label: "Points Gained Across Season",
            data: addponts(res.data.team.tournaments),
            backgroundColor: ["#3F6DA4"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });

      setDl(true);
    });
  };

  const [formattedData, setFormattedData] = useState({
    labels: "",
    datasets: [],
  });

  useEffect(() => {
    axiosPosts();
  }, []);

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

  return (
    <>
      <h1>
        {data.school} {data.s1LastName}/{data.s2LastName}
      </h1>

      {dl === true && (
        <div className="tableDiv">
          <table>
            <tbody>
              <tr>
                <th>Tournament</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win %</th>
                <th>Points</th>
              </tr>
              {data.tournaments.length > 0 && (
                <>
                  {data.tournaments.map((t, index) => {
                    return (
                      <tr key={index}>
                        <td>{t.name}</td>
                        <td>{t.wins}</td>
                        <td>{t.losses}</td>
                        <td>
                          {calculateWins(t.wins, t.losses)
                            .toString()
                            .substr(0, 4)}
                          %
                        </td>
                        <td>{t.points.toString().substring(0, 4)}</td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
          <h2>Visual Team Data </h2>
          <div className="chartFlex">
            <div className="chart">
              <div className="chartHeader">
                <h3>Points Gained (Per Tournament)</h3>
              </div>
              <div className="chartBod">
                <BarChart chartData={userData} />
              </div>
            </div>
            <div className="chart pie">
              <div className="chartHeader">
                <h3>Win/Loss</h3>
              </div>
              <PieChart chartData={pieData} />
            </div>
          </div>
          <div className="freeChart">
            <div className="chartHeader">
              <h3>Points Gained Accross Season</h3>
            </div>
            <LineChart chartData={yearData} />
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(ViewTeam);
