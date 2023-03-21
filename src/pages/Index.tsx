import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import headerImg from "src/images/placeholder-img/headerImg.svg";

import { FoodList } from "Src/pages/Food";

import "src/css/Site.css";

export default function Index() {
  return (
    <>
      <Helmet title="Home" />
      <Box className="hero-container">
        <section className="hero-header">
          <div className="hero-greeting">
            <div className="hero-title">
              <h5>Välkommen,</h5>
              <h1>
                Kom förbi eller <br />
                beställ din mat här!
              </h1>
              <p className="hero-paragraph">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!
              </p>
            </div>
            <div className="hero-btns">
              <Link to="/Food">
                <Button className="hero-btn">Maträtter</Button>
              </Link>
              <Link to="/contact">
                <Button className="hero-btn">Kontakta oss</Button>
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <img alt="placeholder" src={headerImg} />
          </div>
        </section>
        <div className="food-container">
          <FoodList />
        </div>
      </Box>
    </>
  );
}
