import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import LinearProgress from "@mui/joy/LinearProgress";
import { Box } from "@mui/material";
import axios from "axios";

import type { Kitchen, User } from "Src/api/Dto";

import { UserType } from "Src/api/Enums";

import GoogleLoginButton from "Src/components/google-login/GoogleLogin";
import { KitchenState } from "Src/components/KitchenTime/KitchenTime";
import { KitchenLine } from "Src/components/QueueSlider/QueueSlider";

import { UserContext } from "Src/context/UserContextProvider";

import "src/css/Login.css";

export default function Login() {
  const [kitchen, setKitchen] = useState<Kitchen>();
  const [kitchenIsLoading, setKitchenIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "", code: "" });
  const [, setIsLoggedIn] = useState(false);

  const { setUserRole } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = {
      email: user.email,
      password: user.code
    };
    axios.post<User>(`/api/User/login`, loginData).then((response) => {
      const user = response.data;

      setUserRole(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);

      if (user.userType === UserType.User) {
        window.location.replace("/Home");
      } else if (user.userType === UserType.Admin) {
        window.location.replace("/Chef");
      } else {
        window.location.replace("/");
      }
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

  return (
    <>
      <Helmet title="Login" />
      <Box className="container-login">
        <section className="kitchen-status-login">
          {kitchenIsLoading ? (
            <LinearProgress thickness={1} />
          ) : (
            <div className="kitchen-status-info">
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
              <input name="code" placeholder="Dagens kod" type="text" value={user.code} onChange={handleChange} />
            </div>
            <div className="login-btn-container">
              <button className="login-btn" type="submit">
                Logga in
              </button>
            </div>
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
