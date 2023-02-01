import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useShoppingCart } from "src/context/ShoppingCartContex";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { OrderLine, Product } from "Src/api/Dto";

import "src/css/FoodItem.css";

interface FoodItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function FoodItem({ id, name, price, imageUrl }: FoodItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const [product, setProduct] = useState<Product[]>([]);
  const [orderLine, setOrder] = useState<OrderLine[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const quantity = getItemQuantity(id);

  useEffect(() => {
    setOrderIsLoading(true);
    setProductIsLoading(true);
    const orderPath = `/api/Order/`;
    const productPath = `/api/Product/`;
    axios.get(orderPath).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
    axios.get(productPath).then((response) => {
      setProduct(response.data);
      setProductIsLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet title="/Meny" />
      {orderIsLoading && productIsLoading ? (
        <LinearProgress />
      ) : (
        product?.map(
          (product) =>
            (
              <div key={product.productId} className="card">
                <img alt="image" className="card-img" src={product.imageUrl} />
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {formatCurrency(product.price)}
                  </div>
                  <div className="food-card-btn-container">
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
            ) ?? []
        )
      )}
    </>
  );
}
