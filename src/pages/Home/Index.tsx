import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import headerImg from "src/images/placeholder-img/headerImg.svg";

import FoodItem from "Src/components/FoodItem/FoodItem";

import { ShoppingCartProvider } from "Src/context/ShoppingCartContex";

interface HomeProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function Index({ imageUrl, name, price, id }: HomeProps) {
  return (
    <ShoppingCartProvider>
      <Helmet title="Home" />
      <Box className="hero-container">
        <section className="hero-text">
          <div>
            <h5>Välkommen hit,</h5>
            <h1 className="hero-title">
              Kom förbi eller <br />
              beställ din mat här!
            </h1>
            <p className="hero-p">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui magni delectus tenetur autem, sint veritatis!</p>
          </div>
          <div>
            <Link to="/FoodMenu">
              <Button className="hero-btn">Maträtter</Button>
            </Link>
            <Link to="/contact">
              <Button className="hero-btn">Kontakta oss</Button>
            </Link>
          </div>
        </section>
        <section>
          <img alt="placeholder" src={headerImg} />
        </section>
        <div className="food-container">
          <FoodItem id={id} imageUrl={imageUrl} name={name} price={price} />
        </div>
      </Box>
    </ShoppingCartProvider>
  );
}
