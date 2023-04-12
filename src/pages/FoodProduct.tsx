import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

import type { Product } from "Src/api/Dto";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import "src/css/FoodProduct.css";

export default function FoodProduct() {
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  useEffect(() => {
    setProductIsLoading(true);
    const path = `/api/Product/`;
    axios.get(path).then((response) => {
      setProductItem(response.data);
      setProductIsLoading(false);
    });
  }, []);

  const item = productItem.find((product) => product.productId === Number(id));
  if (!item) {
    return null;
  }

  const { imageUrl, name, price, productId } = item;
  const quantity = getItemQuantity(productId);

  return (
    <>
      <Helmet title="FoodProduct" />
      <div key={item.productId} className="product-container">
        <h1>{name}</h1>
        <section className="product">
          <div className="product-img">
            <img alt={imageUrl} className="img-product" src={imageUrl} />
            <div>
              <div className="product-title">
                <h2>{name}</h2>
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
                  <Button className="food-card-btn add-to-cart" onClick={() => increaseCartQuantity(productId)}>
                    <i className="bi bi-basket" />
                  </Button>
                ) : (
                  <>
                    <Button className="food-card-btn food-card-remove-btn" onClick={() => removeFromCart(productId)}>
                      <i className="bi bi-x-lg" />
                    </Button>
                    <div className="food-count-container">
                      <Button className="food-card-count-btn" onClick={() => decreaseCartQuantity(productId)}>
                        -
                      </Button>
                      <div className="quantity-count">{quantity}</div>
                      <Button className="food-card-count-btn" onClick={() => increaseCartQuantity(productId)}>
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
