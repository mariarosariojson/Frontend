/* eslint-disable react/button-has-type */
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";
import axios from "axios";

// import GoogleLogoutButton from "Src/components/google-login/GoogleLogout";
import UserTypeButton from "Src/components/UserTypeButton/UserTypeButton";

import Login from "./Login";

import "src/css/Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`/api/User`, { firstName, lastName, email }).then((response) => {
      return response;
      // console.log(response.status);
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
                <input required name="firstName" placeholder="Förnamn" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input required name="lastName" placeholder="Efternamn" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </section>
              <section className="input-2">
                <input required name="email" placeholder="E-mailadress" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </section>
              <section className="input-3">
                <UserTypeButton />
              </section>
            </div>
            <section className="input-3">
              <button className="register-btn" type="submit">
                Spara
              </button>
            </section>
            {/* <div className="google-logout-btn">
              <GoogleLogoutButton />
            </div> */}
          </div>
        </form>
      </Box>
    </>
  );
}
