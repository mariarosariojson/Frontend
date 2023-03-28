import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Favorite from "@mui/icons-material/Favorite";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import LinkMUI from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { FoodItemProps } from "../FoodItem/FoodItem";
import type { OrderLine } from "Src/api/Dto";

import { useShoppingCart } from "Src/context/ShoppingCartContex";
import { formatCurrency } from "Src/utilities/FormatCurrency";

import "src/css/FoodItem.css";

export default function FoodCardMobile({ product }: FoodItemProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
  const quantity = getItemQuantity(product.productId);
  const [, setOrder] = useState<OrderLine[]>([]);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [orderIsLoading, setOrderIsLoading] = useState(false);

  useEffect(() => {
    setOrderIsLoading(true);
    setProductIsLoading(true);
    const orderPath = `/api/Order/`;
    axios.get(orderPath).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
  }, []);

  return (
    <div className="card-mobile">
      <Stack
        direction="column"
        flexWrap="wrap"
        justifyContent="center"
        rowGap={2}
        sx={{ width: "fit-content", marginLeft: "auto", marginRight: "auto" }}
      >
        {orderIsLoading && productIsLoading ? (
          <LinearProgress />
        ) : (
          <Card
            className="card-mobile"
            orientation="horizontal"
            sx={{
              width: 320,
              gap: 2,
              "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" },
              backgroundColor: "#f2f2f2",
              border: "0.8px solid",
              borderColor: "#d3d3d3"
            }}
            variant="outlined"
          >
            <AspectRatio ratio="1" sx={{ width: 90 }}>
              <Link to={`/FoodProduct/${product.name}`}>
                <img alt="" loading="lazy" src="" srcSet={product.imageUrl} />
              </Link>
            </AspectRatio>
            <IconButton
              size="md"
              sx={{
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                color: "#fd6969",
                left: 0,
                top: 0
              }}
              variant="plain"
            >
              <Favorite />
            </IconButton>
            <div>
              <Link to={`/FoodProduct/${product.productId}`}>
                <Typography fontSize="13px" id="card-description" level="h2" mb={0.5}>
                  {product.name}
                </Typography>
              </Link>
              <Typography aria-describedby="card-description" fontSize="10px" mb={1}>
                <LinkMUI overlay href="#interactive-card" sx={{ color: "text.tertiary" }} underline="none">
                  {formatCurrency(product.price)}
                </LinkMUI>
              </Typography>
              <div className="food-card-btn-container">
                {quantity === 0 ? (
                  <>
                    <Button className="food-card-btn add-to-cart" onClick={() => increaseCartQuantity(product.productId)}>
                      <i className="bi bi-basket" />
                    </Button>
                    {/* <button className="place-order-btn stripe-btn" type="button">
                          <a href="https://buy.stripe.com/test_14kaGofVN2if7ugdQU">
                            <p>Quick checkout</p>
                          </a>
                        </button> */}
                  </>
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
          </Card>
        )}
      </Stack>
    </div>
  );
}
