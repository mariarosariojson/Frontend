import { Box } from "@mui/material";
import fastfood from "src/images/placeholder-img/fastfood.svg";

import "src/css/Footer.css";

export default function Footer() {
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
              <li>9:00 - 19:00</li>
              <br />
              <li>
                <b>Lördag - Söndag</b>
              </li>
              <li>11:00 - 18:00</li>
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
                  En gata 12
                  <br />
                  123 45 Täby
                </p>
              </li>
              <br />
              <li>
                <b>Telefonummer</b>{" "}
              </li>
              <li>08-1234 123 456</li>
              <br />
              <li>
                <b>Hemsida</b>{" "}
              </li>
              <li>www.entbrapp.se</li>
            </ul>
          </section>
          <section className="footer-col-3">
            <ul>
              <h3>Logga in här</h3>
              <br />
              <li>
                <input placeholder="Användarnamn" type="text" />
              </li>
              <li>
                <input placeholder="Lösenord" type="password" />
              </li>
              <li>
                <button type="button">Logga in</button>
              </li>
              <br />
              <li>
                <a href="./Register">
                  <p className="reg-footer">Inget konto? Registrera dig här.</p>
                </a>
              </li>
            </ul>
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
