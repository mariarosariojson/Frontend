/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";
import { gapi } from "gapi-script";

import type { SubmitHandler } from "react-hook-form";
import type { Kitchen } from "Src/api/Dto";
import type { QueueSliderProps } from "Src/components/QueueSlider/QueueSlider";

import GoogleLoginButton from "Src/components/google-login/GoogleLogin";
import KitchenTime, { KitchenState } from "Src/components/KitchenTime/KitchenTime";
import QueueSlider, { KitchenLine } from "Src/components/QueueSlider/QueueSlider";

// import { WaitingLine } from "Src/components/QueueSlider/QueueSlider";
import "src/css/Login.css";

interface LoginValues {
  email: string;
  code: string;
}

const clientId = "758380863651-69t6pe0h7ta7g7btvh7v9dt5r1b3nkkd.apps.googleusercontent.com";

export default function Login() {
  const { register, handleSubmit } = useForm<LoginValues>();
  const onSubmit: SubmitHandler<LoginValues> = (data) => data;
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [kitchenIsLoading, setKitchenIsLoading] = useState(false);
  // const { label, value, onChange } = Input();

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

  // const accessToken = gapi.auth.getToken().access_token;

  return (
    <>
      <Helmet title="Login" />
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="login-container">
            <div className="kitchen">
              {kitchenIsLoading ? (
                <LinearProgress />
              ) : (
                <div className="kitchen-status-login" id="kitchen-status">
                  <h3>
                    <KitchenState kitchen={kitchen} />
                  </h3>
                  <p>
                    <KitchenLine kitchen={kitchen} />
                  </p>
                </div>
              )}
            </div>
            <br />
            <div className="login-header">
              <h3>Logga in här</h3>
            </div>
            <div className="login-input">
              <ul>
                <br />
                <li>
                  <input placeholder="E-postadress" type="email" {...register("email")} />
                </li>
                <li>
                  <input placeholder="Kod" type="password" {...register("code")} />
                </li>
                <li>
                  <button className="register-btn" type="submit">
                    Logga in
                  </button>
                  <div className="google-login-btn">
                    <GoogleLoginButton />
                  </div>
                </li>
              </ul>
            </div>
            <div className="reg-nav-text">
              <a href="./Register">
                <p>Har du inget konto? Registrera dig här.</p>
              </a>
            </div>
          </section>
        </form>
      </Box>
    </>
  );
}
