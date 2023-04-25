import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import LogoutButton from "src/components/LogoutButton/LogoutButton";
import AccountMenu from "src/components/StatusBanner/StatusBanner";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import type React from "react";
import type { User } from "src/api/Dto";

import { UserType } from "Src/api/Enums";

import { useShoppingCart } from "Src/context/ShoppingCartContex";
import { UserContext } from "Src/context/UserContextProvider";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SideBar from "../Sidebar/Sidebar";

import NavbarMobile from "./NavbarMobile";

import "src/css/Navbar.css";

interface Props {
  children: React.ReactNode;
}

export default function Navbar({ children }: Props) {
  const { cartQuantity } = useShoppingCart();
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

  const customerLinks = [
    {
      display: "Hem",
      path: "/Home"
    },
    {
      display: "Maträtter",
      path: "/Food"
    },
    {
      display: "Kontakt",
      path: "/Contact"
    }
  ];

  const adminLinks = [
    {
      display: "",
      path: ""
    },
    {
      display: "",
      path: ""
    }
  ];

  const links = userRole?.userType === UserType.Admin ? adminLinks : customerLinks;

  return (
    <>
      <Helmet />
      <nav>
        <div className="navbar">
          <NavbarMobile />
          <div className="nav-links">
            {links.map((link) => (
              <span key={link.path}>
                <NavLink to={link.path}>{link.display}</NavLink>
              </span>
            ))}
          </div>
          <div className="logotype-nav">
            <img alt="logo" className="logotype" src={fastfood} width="50px" />
            <h5>TBR appen</h5>
            <p>www.tbr-appen.se</p>
          </div>
          <div className="nav-icons">
            <div className="login-register">
              {userRole ? (
                <>
                  <p>Du är inloggad</p>
                  <LogoutButton />
                </>
              ) : (
                <Link to="/">
                  <p>Logga in / Skapa konto</p>
                </Link>
              )}
            </div>
            <div className="nav-icons-container">
              {userRole?.userType === UserType.Admin && (
                <Link to="/Chef">
                  <Button>
                    <i className="bi bi-shop-window nav-icons" />
                  </Button>
                </Link>
              )}
              {cartQuantity > 0 && (
                <Button>
                  {userRole?.userType === UserType.User && (
                    <>
                      <ShoppingCart />
                      <div className="cart-count">{cartQuantity}</div>
                    </>
                  )}
                </Button>
              )}
              {userRole?.userType === UserType.Admin && (
                <div className="nav-sidebar-icon">
                  <SideBar />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="account-menu">
          <AccountMenu />
        </div>
      </nav>
      {children}
    </>
  );
}
