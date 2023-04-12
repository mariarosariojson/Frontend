import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "src/components/Navbar/Navbar";

import Footer from "./components/Footer/Footer";
import { ShoppingCartProvider } from "./context/ShoppingCartContex";
import Routes from "./routes/Routes";

import "./css/Site.css";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="758380863651-69t6pe0h7ta7g7btvh7v9dt5r1b3nkkd.apps.googleusercontent.com">
      <ShoppingCartProvider>
        <BrowserRouter basename={process.env.BASE_URL}>
          <Navbar>
            <Routes />
          </Navbar>
          <Footer />
        </BrowserRouter>
      </ShoppingCartProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.querySelector("#root")
);
