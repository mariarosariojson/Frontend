/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LinearProgress from "@mui/joy/LinearProgress";
import { Box } from "@mui/material";
import axios from "axios";
import { gapi } from "gapi-script";

import type { Kitchen } from "Src/api/Dto";

import GoogleLoginButton from "Src/components/google-login/GoogleLogin";
import KitchenTime, { KitchenState } from "Src/components/KitchenTime/KitchenTime";
import QueueSlider, { KitchenLine } from "Src/components/QueueSlider/QueueSlider";

import "src/css/Login.css";

// interface LoginValues {
//   email: string;
//   code: string;
// }

const clientId = "758380863651-69t6pe0h7ta7g7btvh7v9dt5r1b3nkkd.apps.googleusercontent.com";

export default function Login() {
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [kitchenIsLoading, setKitchenIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "" });
  const [code, setCode] = useState({ code: "" });

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setUser({
      ...user,
      [e.target.name]: value
    });
    setCode({
      ...code,
      [e.target.code]: value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const loginData = {
      email: user.email,
      code: code.code
    };
    axios.post(`/api/User/`, loginData).then((response) => {
      console.log(response.status);
    });
  };

  useEffect(() => {
    setKitchenIsLoading(true);
    const path = `/api/Kitchen/`;
    axios.get(path).then((response) => {
      setKitchen(response.data);
      setKitchenIsLoading(false);
    });
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: ""
      });
    }
    gapi.load("client:auth2", start);
  });

  // const accessToken = gapi.auth2.getToken().access_token;

  return (
    <>
      <Helmet title="Login" />
      <Box>
        <section className="kitchen-status-login">
          {kitchenIsLoading ? (
            <LinearProgress thickness={1} />
          ) : (
            <div id="kitchen-status">
              <h3>
                <KitchenState kitchen={kitchen} />
              </h3>
              <b>
                <KitchenLine kitchen={kitchen} />
              </b>
            </div>
          )}
        </section>
        <section className="login-container">
          <form className="login-input" onSubmit={handleSubmit}>
            <div className="login-header">
              <h3>Logga in</h3>
            </div>
            <div className="login-input-field">
              <input name="email" placeholder="E-mailadress" type="email" value={user.email} onChange={handleChange} /> <br />
              <input name="code" placeholder="Dagens kod" type="text" value={code.code} onChange={handleChange} />
            </div>
            <button className="login-btn" type="submit">
              Logga in
            </button>
            <div className="google-login-btn">
              <GoogleLoginButton />
            </div>
            <div className="reg-nav-text">
              <a href="./Register">
                <p>Har du inget konto? Registrera dig här.</p>
              </a>
            </div>
          </form>
        </section>
      </Box>
    </>
  );
}
