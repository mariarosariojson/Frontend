import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import headerImg from "src/images/placeholder-img/headerImg.svg";

import type { Product } from "Src/api/Dto";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Site.css";

interface HomeProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function Index({ imageUrl, name, price, id }: HomeProps) {
  const [, setProduct] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);

  React.useEffect(() => {
    setProductIsLoading(true);
    const productPath = `/api/Product/`;
    axios.get(productPath).then((response) => {
      setProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

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
      </Box>
      <div className="food-container">
        <FoodItem id={id} imageUrl={imageUrl} name={name} price={price} />
      </div>
    </>
  );
}
