/* eslint-disable react/button-has-type */
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import axios from "axios";

import type { Kitchen } from "Src/api/Dto";

import GoogleLogoutButton from "Src/components/google-login/GoogleLogout";
import UserTypeButton from "Src/components/UserTypeButton/UserTypeButton";

import Login from "./Login";

import "src/css/Register.css";

export default function Register() {
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "" });
  const [kitchen] = useState<Kitchen>();

  const handleChange = (e: any) => {
    const { value } = e.target;
    setNewUser({
      ...newUser,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUsers = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };
    axios.post(`/api/User`, newUsers).then((response) => {
      console.log(response.status);
    });
  };

  return (
    <>
      <Helmet title="Register" />
      <Box className="container-logreg">
        <form className="register-input" onSubmit={handleSubmit}>
          <div className="login-reg">
            <div>
              <Login />
            </div>
          </div>
          <div className="register-container">
            <div className="register-header">
              <h3>Skapa nytt konto</h3>
            </div>
            <div className="register-input-field">
              <section className="input-1">
                <input name="firstName" placeholder="Förnamn" type="text" value={newUser.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Efternamn" type="text" value={newUser.lastName} onChange={handleChange} />
              </section>
              <section className="input-2">
                <input name="email" placeholder="E-mailadress" type="email" value={newUser.email} onChange={handleChange} />
              </section>
              <section className="input-2">
                <UserTypeButton />
              </section>
            </div>
            <section className="input-3">
              <button className="register-btn" type="submit">
                Spara
              </button>
            </section>
            <div className="google-logout-btn">
              <GoogleLogoutButton />
            </div>
          </div>
        </form>
      </Box>
    </>
  );
}
