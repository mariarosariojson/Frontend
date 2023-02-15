import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";

import type { CreateProduct } from "Src/api/Dto";
import type { FoodItemProps } from "Src/components/FoodItem/FoodItem";

import { addProduct } from "Src/api/Product";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import "src/css/FoodProduct.css";

export default function FoodProduct({ name, imageUrl, price, id }: FoodItemProps) {
  const [foodProduct, setFoodProduct] = useState({});
  const [productIsLoading, setProductIsLoading] = useState(false);
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const params = useParams();

 

  const handleClick = (product: CreateProduct) => {
    addProduct(product);
  };

  return (
    <>
      <Helmet title="FoodProduct" />
      <div className="product-container">
        <h1>productName{name}</h1>
        <section className="product">
          <div className="product-img">
            <img alt={imageUrl} className="img-product" src={imageUrl} />
            <div>
              <div className="product-title">
                <h2>productName{name}</h2>
              </div>
              <h2 className="product-price">{price} SEK</h2>
              <div className="product-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut molestias molestiae quidem labore similique est, tempore cupiditate id
                  quia aperiam minus amet quo quisquam earum voluptates sint nostrum alias ipsam?
                </p>
              </div>
              <div className="product-btn-container">
                {quantity === 0 ? (
                  <Button className="food-card-btn add-to-cart" onClick={() => increaseCartQuantity(id)}>
                    <i className="bi bi-basket" />
                  </Button>
                ) : (
                  <>
                    <Button className="food-card-btn food-card-remove-btn" onClick={() => removeFromCart(id)}>
                      <i className="bi bi-x-lg" />
                    </Button>
                    <div className="food-count-container">
                      <Button className="food-card-count-btn" onClick={() => decreaseCartQuantity(id)}>
                        -
                      </Button>
                      <div className="quantity-count">{quantity}</div>
                      <Button className="food-card-count-btn" onClick={() => increaseCartQuantity(id)}>
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
    </>
  );
}
