import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { ShoppingBag } from "@mui/icons-material";
import axios from "axios";

import type { Product } from "Src/api/Dto";

import { addProduct } from "Src/api/Product";

export default function FoodProduct() {
  const [foodProduct, setFoodProduct] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const params = useParams<{ productId: string }>();

  useEffect(() => {
    setProductIsLoading(true);
    const path = `/api/Product?id=${params.productId}`;
    axios.get(path).then((response) => {
      setFoodProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

  const handleClick = (foodProduct: Product) => {
    addProduct(foodProduct);
  };

  return (
    <>
      <Helmet title="FoodProduct" />
      <div>
        <h1>{FoodProduct.name}</h1>
        {foodProduct?.map((foodProduct) => (
          <section key={foodProduct.productId}>
            <h1 className="title-add">{foodProduct.name}</h1>
            <div className="img-desc">
              <img alt="prodImage" className="img-add" src={foodProduct.imageUrl} />
              <div>
                <p className="food-description">{foodProduct.productId}</p>
                <h2 className="price-add">{foodProduct.price} SEK</h2>
                <input className="inputProductQty" max="10" min="1" placeholder="1" type="number" />
                <button
                  className="checkout_btn"
                  type="button"
                  onClick={() => {
                    handleClick(foodProduct);
                  }}
                >
                  <ShoppingBag />
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
