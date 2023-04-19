import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "src/components/Navbar/Navbar";
import { UserContextProvider } from "src/context/UserContextProvider";

import Footer from "./components/Footer/Footer";
import { ShoppingCartProvider } from "./context/ShoppingCartContex";
import Routes from "./routes/Routes";

import "./css/Site.css";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ShoppingCartProvider>
        <BrowserRouter basename={process.env.BASE_URL}>
          <Navbar>
            <Routes />
          </Navbar>
          <Footer />
        </BrowserRouter>
      </ShoppingCartProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
