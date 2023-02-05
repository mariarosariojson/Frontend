import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { Product } from "Src/api/Dto";

export default function FoodProduct() {
  const [foodProduct, setFoodProduct] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    setProductIsLoading(true);
    const path = `/api/Product/`;
    axios.get(path).then((response) => {
      setFoodProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet title="FoodProduct" />
      <div>
        <h1>{FoodProduct.name}</h1>
      </div>
    </>
  );
}
