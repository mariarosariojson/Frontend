import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Button, IconButton, List, Stack, SwipeableDrawer } from "@mui/material";
import axios from "axios";
import { CartItem } from "src/components/CartItem/CartItem";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { Anchor } from "react-bootstrap";
import type { CreateOrder, CreateOrderLine, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";
import { addOrder } from "Src/api/Order";
import { listUsers } from "Src/api/User";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import "src/css/ShoppingCart.css";

type Anchor = "right";

export default function ShoppingCart() {
  const [user, setUser] = useState<User[]>([]);
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [order, setOrder] = useState<CreateOrderLine[]>([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [state, setState] = React.useState({
    right: false
  });
  const { cartItems } = useShoppingCart();

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

  const placeOrder = async () => {
    const newOrder: CreateOrder = {
      totalAmount: 240,
      userId: 1,
      orderStatus: OrderStatus.Created,
      orderLines: [{ orderLineId: 0, orderId: 0, productId: 3, quantity: 2 }],
      orderId: 0
    };
    await addOrder(newOrder);
    setUserIsLoading(true);
    const result = await listUsers();
    setUser(result);
    setUserIsLoading(false);
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      className="shopping-cart"
      role="presentation"
      sx={{ width: "auto" }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="shopping-cart-header">
          <h2>
            <i className="bi bi-cart-plus-fill" />
            Kundvagn
          </h2>
        </div>
        <br />
        <div>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="cart-total">
              <h2>Totalt att betala:</h2>
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = productItem.find((product) => product.productId === product.productId);

                  return total + (item?.price || 0) * cartItem?.quantity;
                }, 0)
              )}
              <div className="place-order-container">
                <button className="place-order-btn" type="button" onClick={placeOrder}>
                  Skicka beställning
                </button>
              </div>
            </div>
          </Stack>
        </div>
      </List>
    </Box>
  );

  return (
    <>
      <Helmet title="Shopping Cart" />
      <Button>
        {(["right"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton onClick={toggleDrawer(anchor, true)}>
              <i className="bi bi-basket nav-icons" />
            </IconButton>
            <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} onOpen={toggleDrawer(anchor, true)}>
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </Button>
    </>
  );
}
