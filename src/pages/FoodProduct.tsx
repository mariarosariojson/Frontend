import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Product } from "Src/api/Dto";
import type { FoodItemProps } from "Src/components/FoodItem/FoodItem";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import "src/css/FoodProduct.css";

export default function FoodProduct({ id }: FoodItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [product, setProduct] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    setProductIsLoading(true);
    const productPath = `/api/Product/${id}`;
    axios.get(productPath).then((response) => {
      setProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

  const singleProducts = product.filter((done) => done.productId === id);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filteredList = singleProducts.map((singleProduct, id) => (
    <div key={id}>
      <div>{singleProduct.productId}</div>
    </div>
  ));

  return (
    <>
      <Helmet title="FoodProduct" />
      {productIsLoading ? (
        <LinearProgress />
      ) : (
        product.map(
          (product) =>
            (
              <div key={product.productId} className="product-container">
                <h1>{product.name}</h1>
                <section className="product">
                  <div className="product-img">
                    <img alt={product.imageUrl} className="img-product" src={product.imageUrl} />
                    <div>
                      <div className="product-title">
                        <h2>{product.name}</h2>
                      </div>
                      <h2 className="product-price">{product.price} SEK</h2>
                      <div className="product-description">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut molestias molestiae quidem labore similique est, tempore
                          cupiditate id quia aperiam minus amet quo quisquam earum voluptates sint nostrum alias ipsam?
                        </p>
                      </div>
                      <div className="product-btn-container">
                        {quantity === 0 ? (
                          <Button className="food-card-btn add-to-cart" onClick={() => increaseCartQuantity(product.productId)}>
                            <i className="bi bi-basket" />
                          </Button>
                        ) : (
                          <>
                            <Button className="food-card-btn food-card-remove-btn" onClick={() => removeFromCart(product.productId)}>
                              <i className="bi bi-x-lg" />
                            </Button>
                            <div className="food-count-container">
                              <Button className="food-card-count-btn" onClick={() => decreaseCartQuantity(product.productId)}>
                                -
                              </Button>
                              <div className="quantity-count">{getItemQuantity(product.productId)}</div>
                              <Button className="food-card-count-btn" onClick={() => increaseCartQuantity(product.productId)}>
                                +
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) ?? []
        )
      )}
    </>
  );
}
