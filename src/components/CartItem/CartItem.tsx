import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useShoppingCart } from "src/context/ShoppingCartContex";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { CreateOrderLine, Product } from "Src/api/Dto";

import "src/css/CartItem.css";

interface CartItemProps {
  quantity: number;
  id: number;
}

export function CartItem({ quantity, id }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [order, setOrder] = useState<CreateOrderLine[]>([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    setOrderIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setProductIsLoading(true);
    const path = `/api/Product/`;
    axios.get(path).then((response) => {
      setProductItem(response.data);
      setProductIsLoading(false);
    });
  }, []);

  const item = productItem.find((product) => product.productId === id);
  if (item === null) {
    return null;
  }

  return (
    <>
      <Helmet title="CartItem" />
      {productItem?.map((productItem) => (
        <Stack key={productItem.productId} className="cart-item-container" direction="horizontal" gap={2}>
          <img className="cart-item-img" src={productItem.imageUrl} />
          <div className="cart-item-body">
            <div>
              {productItem.name} <br />
              {quantity > 1 && <span className="cart-item-text-secondary">{quantity}st</span>}
            </div>
            <div className="cart-item-text-secondary">{formatCurrency(productItem.price)}</div>
            <div>{formatCurrency(productItem.price * quantity)}</div>
          </div>
          <div>
            <Button className="cart-item-btn cart-item-remove-btn" onClick={() => removeFromCart(id)}>
              &times;
            </Button>
          </div>
        </Stack>
      ))}
    </>
  );
}
