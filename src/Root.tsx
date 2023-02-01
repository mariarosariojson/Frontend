import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "src/components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";
import { ShoppingCartProvider } from "./context/ShoppingCartContex";
import Routes from "./routes/Routes";

import "./css/Site.css";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ShoppingCartProvider>
      <BrowserRouter basename={process.env.BASE_URL}>
        <Navbar>
          <Routes />
        </Navbar>
        <Footer />
      </BrowserRouter>
    </ShoppingCartProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
