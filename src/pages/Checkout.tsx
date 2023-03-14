import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { Box, Button } from "@mui/material";

import { formatCurrency } from "Src/utilities/FormatCurrency";

import "src/css/Checkout.css";

export default function Checkout() {
  const cartItems = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

  return (
    <Box>
      <Helmet title="Checkout" />
      <div className="checkout-container">
        <div className="products">
          {cartItems.length === 0 ? (
            <div className="emptyFood-container">
              <h3>Här var det tomt!</h3>
              <Link to="/FoodMenu">
                <button className="emptyFood-btn" type="button">
                  Tillbaka till maten
                </button>
              </Link>
            </div>
          ) : (
            <div className="product">
              <h3>Orders</h3>
            </div>
          )}
        </div>
        <div className="payment-info">
          <Stack rowGap={1.5}>
            <div className="checkout-info">
              <b>Betalningsinformation</b>
            </div>
            <div className="checkout-name checkout-input">
              <Input required className="checkout-form" name="firstname" placeholder="Förnamn" size="sm" type="text" variant="outlined" />
            </div>
            <div className="checkout-lastname checkout-input">
              <Input required className="checkout-form" name="firstname" placeholder="Efternamn" size="sm" type="text" variant="outlined" />
            </div>
            <div className="checkout-phone checkout-input">
              <Input required className="checkout-form" name="telefonnummer" placeholder="Telefonnummer" size="sm" type="tel" variant="outlined" />
            </div>
            <div className="checkout-email checkout-input">
              <Input required className="checkout-form" name="mailadress" placeholder="Mailadress" size="sm" type="email" variant="outlined" />
            </div>
            <div>
              <b>Totalt: {formatCurrency(cartItems.price)}</b>
            </div>
          </Stack>
          <div>
            <Button className="checkout-btn" type="submit">
              Gå till betalning
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}
