import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import type React from "react";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import SideBar from "../Sidebar/Sidebar";
import AccountMenu from "../UserMenu";

import "src/css/Navbar.css";

interface Props {
  children: React.ReactNode;
}

const links = [
  {
    display: "Hem",
    path: "/"
  },
  {
    display: "Maträtter",
    path: "/foodMenu"
  },
  {
    display: "Kontakt",
    path: "/Contact"
  }
];

export default function Navbar({ children }: Props) {
  const { cartQuantity } = useShoppingCart();

  return (
    <>
      <Helmet />
      <nav>
        <div className="navbar">
          <div className="nav-mobile">
            <AccountMenu />
            <div className="logotype-nav">
              <Link to="/">
                <img alt="logo" className="logotype" src={fastfood} width="45px" />
              </Link>
            </div>
            {cartQuantity > 0 && (
              <Button>
                <ShoppingCart />
                <div className="cart-count">{cartQuantity}</div>
              </Button>
            )}
          </div>
          <div className="nav-links">
            {links.map((item, index) => (
              <NavLink key={index} to={item.path}>
                {item.display}
              </NavLink>
            ))}
          </div>
          <div className="logotype-nav">
            <img alt="logo" className="logotype" src={fastfood} width="50px" />
            <h5>TBR appen</h5>
            <p>www.tbr-appen.se</p>
          </div>
          <div className="nav-icons">
            <div className="login-register">
              <Link to="/Login">
                <p>Logga in / Skapa konto</p>
              </Link>
            </div>
            <div>
              <Link to="/">
                <Button>
                  <i className="bi bi-person-circle nav-icons" />
                </Button>
              </Link>
              {cartQuantity > 0 && (
                <Button>
                  <ShoppingCart />
                  <div className="cart-count">{cartQuantity}</div>
                </Button>
              )}
              <SideBar />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
