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
    <BrowserRouter basename={process.env.BASE_URL}>
      <UserContextProvider>
        <ShoppingCartProvider>
          <Navbar>
            <Routes />
          </Navbar>
          <Footer />
        </ShoppingCartProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector("#root")
);
