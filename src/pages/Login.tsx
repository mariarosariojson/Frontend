/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import axios from "axios";

import type { SubmitHandler } from "react-hook-form";
import type { CreateKitchen } from "Src/api/Dto";

import Kitchen from "Src/components/Kitchen/Kitchen";
import QueueSlider from "Src/components/QueueSlider/QueueSlider";

import "src/css/Login.css";

interface LoginValues {
  email: string;
  code: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginValues>();
  const onSubmit: SubmitHandler<LoginValues> = (data) => data;
  const [kitchen, setKitchen] = useState<CreateKitchen[]>([]);
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
              <br />
              <span>{kitchenIsLoading && <p>Laddar</p>}</span>
              {kitchen?.map((kitchen, kitchenId) => (
                <div key={kitchenId} className="kitchen-status">
                  <h5>
                    KitchenStatus: {kitchen.kitchenQueueTime}, {kitchen.kitchenStatus}
                  </h5>
                </div>
              ))}
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
