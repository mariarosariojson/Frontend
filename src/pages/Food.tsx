import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Grid from "@mui/joy/Grid";
import LinearProgress from "@mui/joy/LinearProgress";
import axios from "axios";

import type { Product } from "src/api/Dto";

import FoodCardMobile from "Src/components/FoodCardMobile/FoodCardMobile";
import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Site.css";

export default function Food() {
  return (
    <>
      <Helmet title="Food" />
      <div className="food-list">
        <FoodList />
      </div>
    </>
  );
}

export function FoodList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    setProductIsLoading(true);
    const productPath = `/api/Product/`;
    axios.get(productPath).then((response) => {
      setProductList(response.data);
      setProductIsLoading(false);
    });
  }, []);

  return (
    <>
      <section className="food-mobile-section">
        <Grid container alignItems="center" columns={{ xs: 1 }} justifyContent="center" spacing={{ xs: 2 }}>
          {productIsLoading ? (
            <LinearProgress thickness={1} />
          ) : (
            productList.map((product) => (
              <Grid key={product.productId}>
                <div className="food-container-mobile">
                  <FoodCardMobile product={product} />
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </section>
      <section className="food-container-section">
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
          {productIsLoading ? (
            <LinearProgress thickness={1} />
          ) : (
            productList.map((product) => (
              <Grid key={product.productId} md={3} sm={6} xs={4}>
                <div className="food-container">
                  <FoodItem product={product} />
                </div>
              </Grid>
            ))
          )}
        </Grid>
      </section>
    </>
  );
}
