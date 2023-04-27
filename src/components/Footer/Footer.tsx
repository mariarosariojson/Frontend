import { useContext, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import type { User } from "Src/api/Dto";

import { UserType } from "Src/api/Enums";

import { UserContext } from "Src/context/UserContextProvider";

import "src/css/Footer.css";

export default function Footer() {
  const [user, setUser] = useState({ email: "", code: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <Box>
      <footer>
        <div className="footer-container">
          <section className="footer-col-1">
            <ul>
              <h3>Öppettider</h3>
              <br />
              <li>
                <b>Måndag - Fredag</b>
              </li>
              <li>10:00 - 19:00</li>
              <br />
              <li>
                <b>Lördag - Söndag</b>
              </li>
              <li>10:00 - 17:00</li>
            </ul>
          </section>
          <section className="footer-col-2">
            <ul>
              <h3>Kontakt</h3>
              <br />
              <li>
                <b>Besöksadress</b>
              </li>
              <li>
                <p>
                  Saluvägen 5
                  <br />
                  187 66 Täby
                </p>
              </li>
              <br />
              <li>
                <b>Telefonummer</b>{" "}
              </li>
              <li>079-306 00 15</li>
              <br />
              <li>
                <b>Hemsida</b>{" "}
              </li>
              <li>www.tbr-appen.se</li>
            </ul>
          </section>
          <section className="footer-col-3">
            <form className="login-footer" onSubmit={handleSubmit}>
              <ul>
                <h3>Logga in här</h3>
                <br />
                <li>
                  <input name="email" placeholder="E-mailadress" type="email" value={user.email} onChange={handleChange} />
                </li>
                <li>
                  <input name="code" placeholder="Dagens kod" type="text" value={user.code} onChange={handleChange} />
                </li>
                <li>
                  <div className="login-btn-container-footer">
                    <button className="login-btn-footer" type="submit">
                      Logga in
                    </button>
                  </div>
                </li>
                <br />
                <li>
                  <a href="./Register">
                    <p className="reg-footer">Inget konto? Registrera dig här.</p>
                  </a>
                </li>
              </ul>
            </form>
          </section>
          <section className="footer-col-4">
            <div className="logotype-footer">
              <img alt="logo" className="logotype" src={fastfood} width="150px" />
              <h1>TBR appen</h1>
              <p>www.tbr-appen.se</p>
            </div>
          </section>
        </div>
      </footer>
      <section className="footer-copy">
        <p>Copyright 2023 | All rights reserved.</p>
      </section>
    </Box>
  );
}
