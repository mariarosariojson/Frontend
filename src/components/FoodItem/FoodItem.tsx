import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Favorite from "@mui/icons-material/Favorite";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardOverflow from "@mui/joy/CardOverflow";
import IconButton from "@mui/joy/IconButton";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useShoppingCart } from "src/context/ShoppingCartContex";
import { formatCurrency } from "src/utilities/FormatCurrency";

import type { OrderLine, Product } from "Src/api/Dto";

import FoodCardMobile from "../FoodCardMobile/FoodCardMobile";

import "src/css/FoodItem.css";

export interface FoodItemProps {
  product: Product;
}

export default function FoodItem({ product }: FoodItemProps) {
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
    <>
      <Helmet title={product.name} />
      <Box className="main-container">
        <FoodCardMobile product={product} />
        {orderIsLoading && productIsLoading ? (
          <LinearProgress thickness={1} />
        ) : (
          <Card
            key={product.productId}
            className="card-desktop"
            sx={{
              minHeight: "250px",
              width: 280,
              backgroundColor: "#f2f2f2",
              border: "0.8px solid",
              borderColor: "#d3d3d3",
              gap: 2,
              "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" }
            }}
            variant="outlined"
          >
            <CardOverflow className="card-section">
              <AspectRatio>
                <CardCover>
                  <Link to={`/FoodProduct/${product.productId}`}>
                    <img alt="image" loading="lazy" src={product.imageUrl} />
                  </Link>
                </CardCover>
              </AspectRatio>
              <IconButton
                size="md"
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: "1rem",
                  bottom: 0,
                  transform: "translateY(50%)",
                  color: "#fd6969",
                  backgroundColor: "#f2f2f2"
                }}
                variant="soft"
              >
                <Favorite />
              </IconButton>
            </CardOverflow>
            <div>
              <Link to={`/FoodProduct/${product.productId}`}>
                <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                  <span>{product.name}</span>
                </Typography>
              </Link>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                <div style={{ fontSize: ".75rem" }}>{formatCurrency(product.price)}</div>
              </Typography>
              <Typography aria-describedby="card-description" fontSize="sm" mb={1}>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, laudantium iusto.</span>
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
      </Box>
    </>
  );
}
