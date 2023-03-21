import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { Product } from "src/api/Dto";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Site.css";
import "src/css/Food.css";

export default function FoodMenu() {
  return (
    <>
      <Helmet title="Food" />
      <div className="food-container">
        <FoodList />
      </div>
    </>
  );
}

export function FoodList() {
  const [productlist, setProduct] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);

  useEffect(() => {
    setProductIsLoading(true);
    const productPath = `/api/Product/`;
    axios.get(productPath).then((response) => {
      setProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

  return (
    <>
      {productlist?.map((product) => (
        <FoodItem key={product.productId} id={product.productId} imageUrl={product.imageUrl ?? ""} name={product.name} price={product.price} />
      ))}
    </>
  );
}
