import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutButton from "src/components/LogoutButton/LogoutButton";
import { UserContext } from "src/context/UserContextProvider";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import type { User } from "src/api/Dto";

import { UserType } from "Src/api/Enums";

import SideBar from "../Sidebar/Sidebar";

import "src/css/Navbar.css";

interface Props {
  children: React.ReactNode;
}

export default function NavbarMobile() {
  const { userRole } = useContext(UserContext);
  const [, setUser] = useState<User | null>(null);
  const [, setUserIsLoading] = useState(true);

  useEffect(() => {
    setUserIsLoading(true);
    const path = `/api/User/`;
    axios
      .get(path)
      .then((response) => {
        setUser(response.data);
        setUserIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="nav-mobile">
      <div className="header-icons-1">
        <div className="icon-1">
          {userRole?.userType === UserType.User && (
            <Link className="link-icon" to="/Home">
              <i className="bi bi-house-fill" />
            </Link>
          )}
        </div>
      </div>
      <div className="logotype-nav">
        <img alt="logo" className="logotype" src={fastfood} width="45px" />
      </div>
      <section className="header-icons-1">
        <div className="icon-2">
          {userRole ? (
            <LogoutButton />
          ) : (
            <Link className="link-icon" to="/">
              <i className="bi bi-person-circle" />
            </Link>
          )}
        </div>
        <div className="icon-3">
          {userRole?.userType === UserType.Admin && (
            <div className="nav-sidebar-icon">
              <SideBar />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
