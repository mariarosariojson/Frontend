/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";

import type { SubmitHandler } from "react-hook-form";
import type { Kitchen } from "Src/api/Dto";

import type QueueSliderProps from "Src/components/QueueSlider/QueueSlider";

import { KitchenStatus } from "Src/api/Enums";

import "src/css/Login.css";

interface LoginValues {
  email: string;
  code: string;
}

export interface QueueSliderProps {
  kitchenQueue: number;
}

export default function Login(props: QueueSliderProps) {
  const { register, handleSubmit } = useForm<LoginValues>();
  const onSubmit: SubmitHandler<LoginValues> = (data) => data;
  const [kitchen, setKitchen] = useState<Kitchen[]>([]);
  const [kitchenIsLoading, setKitchenIsLoading] = useState(false);

  useEffect(() => {
    setKitchenIsLoading(true);
    const path = `/api/Kitchen/`;
    axios.get(path).then((response) => {
      setKitchen(response.data);
      setKitchenIsLoading(false);
    });
  }, []);

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
                kitchen.map((kitchen, kitchenId) => (
                  <div key={kitchenId} className="kitchen-status-login" id="kitchen-status">
                    <h3>Restaurangen är {kitchen.kitchenStatus}</h3>
                    <p>Kötiden är cirka {props.kitchenQueue} minuter</p>
                  </div>
                ))
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
                  <input placeholder="E-mailadress" type="email" {...register("email")} />
                </li>
                <li>
                  <input placeholder="Kod" type="password" {...register("code")} />
                </li>
                <li>
                  <button className="register-btn" type="submit">
                    Logga in
                  </button>
                </li>
              </ul>
            </div>
            <section>
              <div className="reg-nav-text">
                <a href="./Register">
                  <p>Har du inget konto? Registrera dig här.</p>
                </a>
              </div>
            </section>
          </section>
        </form>
      </Box>
    </>
  );
}
