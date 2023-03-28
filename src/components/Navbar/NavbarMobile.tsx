import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import SideBar from "../Sidebar/Sidebar";

import "src/css/Navbar.css";

export default function NavbarMobile() {
  return (
    <div className="nav-mobile">
      <div className="header-icons-1">
        <div className="icon-1">
          <Link className="link-icon" to="/Home">
            <i className="bi bi-house-fill" />
          </Link>
        </div>
      </div>
      <div className="logotype-nav">
        <img alt="logo" className="logotype" src={fastfood} width="45px" />
      </div>
      <section className="header-icons-1">
        <div className="icon-2">
          <Link className="link-icon" to="/">
            <i className="bi bi-person-circle" />
          </Link>
        </div>
        <div className="icon-3">
          <Link className="link-icon" to="/Sidebar">
            <SideBar />
          </Link>
        </div>
      </section>
    </div>
  );
}
