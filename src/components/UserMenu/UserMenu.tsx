import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Global } from "@emotion/react";
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

import type { CreateOrder, CreateOrderLine, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";
import { addOrder } from "Src/api/Order";
import { listUsers } from "Src/api/User";

import { useShoppingCart } from "Src/context/ShoppingCartContex";

import "src/css/UserMenu.css";

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

  const [, setUser] = useState<User[]>([]);
  const [, setUserIsLoading] = useState(false);
  const [productItem, setProductItem] = useState<Product[]>([]);
  const [, setProductIsLoading] = useState(false);
  const [, setOrder] = useState<CreateOrderLine[]>([]);
  const [, setOrderIsLoading] = useState(false);
  const { cartItems } = useShoppingCart();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
      userId: 1,
      orderStatus: OrderStatus.Created,
      orderLines
    };

    try {
      await addOrder(newOrder);
      const result = await listUsers();
      console.log(result);
    } catch (error) {
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
            <Typography sx={{ p: 2, color: "text.secondary", textAlign: "center" }}>
              <b>Orderstatus: 5 min</b>
            </Typography>
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
              <ListItem>
                <Stack gap={3}>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </Stack>
              </ListItem>
            </List>
            <div className="place-order-drawer">
              <Button className="place-order-btn" type="button" onClick={placeOrder}>
                Skicka beställning <i className="bi bi-send-fill" />
              </Button>
            </div>
          </StyledBox>
        </SwipeableDrawer>
      </Root>
    </>
  );
}
