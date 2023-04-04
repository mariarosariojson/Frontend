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
          <AspectRatio ratio="0.9" sx={{ width: 90 }}>
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
              <Typography fontSize="14px" id="card-description" level="h2" mb={0.5}>
                {product.name}
              </Typography>
            </Link>
            <Typography aria-describedby="card-description" fontSize="12px" mb={-4}>
              <LinkMUI overlay href="#interactive-card" sx={{ color: "text.tertiary" }} underline="none">
                {formatCurrency(product.price)}
              </LinkMUI>
            </Typography>
            <div className="food-mobile-card-btn-container">
              {quantity === 0 ? (
                <>
                  <Button className="food-card-mobile-btn" onClick={() => increaseCartQuantity(product.productId)}>
                    <i className="bi bi-basket" />
                  </Button>
                  <Button className="food-card-stripe-btn" type="button">
                    <a href="https://buy.stripe.com/test_14kaGofVN2if7ugdQU">
                      <svg className="bi bi-stripe" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.662 7.662 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.29 7.29 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703Z" />
                      </svg>
                    </a>
                    Snabbkassa
                  </Button>
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
    </div>
  );
}
