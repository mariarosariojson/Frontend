import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Grid from "@mui/joy/Grid";
import { Box, LinearProgress } from "@mui/material";
import axios from "axios";

import type { Product } from "src/api/Dto";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Site.css";
import "src/css/Food.css";

export default function Food() {
  return (
    <>
      <Helmet title="Food" />
      <FoodList />
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
    <Box className="food-container">
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={{ xs: 2, md: 3 }} sx={{ flexGrow: 1 }}>
        {productIsLoading ? (
          <LinearProgress />
        ) : (
          productList.map((product) => (
            <Grid key={product.productId} justify-content="center" xs="auto">
              <FoodItem product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
