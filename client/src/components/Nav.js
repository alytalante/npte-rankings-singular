import logo from "./images/npte.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <Link to="/">
        <img src={logo} />
      </Link>
      <Link to="/admin">
        <div>Admin</div>
      </Link>
    </div>
  );
}

export default Nav;
