import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Box, Button, IconButton, List, Stack, SwipeableDrawer } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import axios from "axios";
import { CartItem } from "src/components/CartItem/CartItem";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { Anchor } from "react-bootstrap";
import type { Order, Product } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";
import { addOrder } from "Src/api/Order";

import { useShoppingCart } from "Src/context/ShoppingCartContex";
import { UserContext } from "Src/context/UserContextProvider";

import "src/css/ShoppingCart.css";

type Anchor = "right";

export default function ShoppingCart() {
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);
  const [, setOrder] = useState<Order[]>([]);
  const [, setOrderIsLoading] = useState(false);
  const [state, setState] = React.useState({
    right: false
  });
  const { cartItems } = useShoppingCart();
  const { userRole } = useContext(UserContext);

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

  const calculateTotalAmount = () =>
    cartItems.reduce((total, { id, quantity }) => total + (productItem.find((product) => product.productId === id)?.price || 0) * quantity, 0);

  const placeOrder = async () => {
    const orderLines = cartItems.map(({ id, quantity }) => ({
      orderLineId: 0,
      orderId: 0,
      productId: id,
      quantity
    }));

    const newOrder = {
      totalAmount: calculateTotalAmount(),
      userId: userRole?.userId || 0,
      orderStatus: OrderStatus.Created,
      orderLines
    };

    try {
      await addOrder(newOrder);
      localStorage.removeItem("shopping-cart");
      window.location.replace("/OrderComplete");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
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
      sx={{ width: "auto", minHeight: "230%", overflow: "auto" }}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <List>
        <div className="shopping-cart-header">
          <h2>
            <i className="bi bi-cart-plus-fill" />
            <span className="settings-header">Kundvagn</span>
          </h2>
        </div>
        <br />
        <div>
          <ListItem>
            <Stack gap={3}>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          </ListItem>
          <div className="cart-total">
            <h2>Totalt att betala:</h2>
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = productItem.find((product) => product.productId === cartItem.id);

                return total + (item?.price || 0) * cartItem?.quantity;
              }, 0)
            )}
            <div className="place-order-container">
              <button className="place-order-btn" type="button" onClick={placeOrder}>
                Skicka beställning
              </button>
              <button className="place-order-stripe-btn" type="button">
                <a href="https://buy.stripe.com/test_14kaGofVN2if7ugdQU">
                  <svg className="bi bi-stripe" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.662 7.662 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.29 7.29 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703Z" />
                  </svg>
                  Betala med Stripe
                </a>
              </button>
            </div>
          </div>
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
