import { useContext,useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Global } from "@emotion/react";
import LinearProgress from "@mui/joy/LinearProgress";
import { List, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { CartItem } from "src/components/CartItem/CartItem";

import type { Order, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";
import { addOrder } from "Src/api/Order";

import { useShoppingCart } from "Src/context/ShoppingCartContex";
import { UserContext } from "Src/context/UserContextProvider";

import "src/css/StatusBanner.css";

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)"
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { cartQuantity } = useShoppingCart();
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);
  const [, setOrder] = useState<Order[]>([]);
  const [, setOrderIsLoading] = useState(false);
  const [, setUser] = useState<User[]>([]);
  const [, setUserIsLoading] = useState(false);
  const [currentUserOrders, setCurrentUserOrders] = useState<Order[]>([]);
  const { cartItems } = useShoppingCart();
  const [, setProgress] = useState(0);
  const { userRole } = useContext(UserContext);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setOrderIsLoading(true);
    setProductIsLoading(true);
    setUserIsLoading(true);
    const orderPath = `/api/Order/`;
    axios.get(orderPath).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
    const productPath = `/api/Product/`;
    axios.get(productPath).then((response) => {
      setProductItem(response.data);
      setProductIsLoading(false);
    });
    const userPath = `/api/User/`;
    axios.get(userPath).then((response) => {
      setUser(response.data);
      setUserIsLoading(false);
    });
  }, []);

  const userId = userRole?.userId || 0;
  useEffect(() => {
    setOrderIsLoading(true);
    const orderPath = `/api/Order/`;
    axios.get(orderPath).then((response) => {
      const orders = response.data;
      const filteredOrders = orders.filter((order: Order) => order.userId === userId);
      setOrder(filteredOrders);
      setCurrentUserOrders(filteredOrders);
      setOrderIsLoading(false);
    });
    const userPath = `/api/User/`;
    axios.get(userPath).then((response) => {
      setUser(response.data);
      setUserIsLoading(false);
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
      userId: 1,
      orderStatus: OrderStatus.Confirmed,
      orderLines
    };

    try {
      await addOrder(newOrder);
      localStorage.removeItem("shopping-cart");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const container = window === undefined ? undefined : () => window().document.body;

  return (
    <>
      <CssBaseline />
      <Root>
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible"
            }
          }}
        />
        <Box className="bottom-drawer">
          <button className="drawer-btn" type="button" onClick={toggleDrawer(true)}>
            {cartQuantity > 0 && (
              <i className="bi bi-basket checkout-count">
                <span className="count">{cartQuantity}</span>
              </i>
            )}
            Din beställning
          </button>
        </Box>
        <SwipeableDrawer
          ModalProps={{
            keepMounted: true
          }}
          anchor="bottom"
          container={container}
          disableSwipeToOpen={false}
          open={open}
          swipeAreaWidth={drawerBleeding}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0
            }}
          >
            <Puller className="swipeable-drawer-puller" />
            {currentUserOrders.length > 0 && (
              <Typography sx={{ p: 2, color: "text.secondary", textAlign: "left" }}>
                <div />
                <span>
                  {currentUserOrders[0].orderStatus === OrderStatus.Created && (
                    <Box
                      sx={{
                        width: "95%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <b>Din order:</b>Ny order
                      <LinearProgress determinate color="neutral" thickness={2} value={5} />
                    </Box>
                  )}
                  {currentUserOrders[0].orderStatus === OrderStatus.Confirmed && (
                    <Box
                      sx={{
                        width: "95%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <b>Din order:</b>Tillagas
                      <LinearProgress color="neutral" thickness={2} value={50} />
                    </Box>
                  )}
                  {currentUserOrders[0].orderStatus === OrderStatus.Done && (
                    <Box
                      sx={{
                        width: "95%",
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <b>Din order:</b>Klar för upphämtning
                      <i className="bi bi-check-circle-fill" />
                    </Box>
                  )}
                </span>
              </Typography>
            )}
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto"
            }}
          >
            <List>
              {cartItems.length > 0 ? (
                <>
                  <ListItem>
                    <Stack gap={3}>
                      {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                      ))}
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <div className="place-order-drawer">
                      <Button className="place-order-btn" type="button" onClick={placeOrder}>
                        Skicka beställning <i className="bi bi-send-fill" />
                      </Button>
                    </div>
                  </ListItem>
                </>
              ) : (
                <div className="empty-cart-message">
                  <p>Din kundvagn är tom!</p>
                </div>
              )}
            </List>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </>
  );
}
