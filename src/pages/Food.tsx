import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Product } from "src/api/Dto";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Site.css";
import "src/css/Food.css";

export default function FoodMenu() {
  return (
    <>
      <Helmet title="Food" />
      <div className="food-index-container">
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
      {productIsLoading ? (
        <LinearProgress />
      ) : (
        productList.map((product) => (
          <FoodItem key={product.productId} id={product.productId} imageUrl={product.imageUrl ?? ""} name={product.name} price={product.price} />
        )) ?? []
      )}
    </>
  );
}
