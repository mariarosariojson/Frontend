// This is your test secret API key.
const stripe = require("stripe")("pk_test_51McFTpAkYoZe3tMzWqzrM4XVlsLXHIcYEmT52OrFtV7B7BkwaTV2JGTFPwOCL6MoR7vK93NGbANYgbOAePI5pOER00XKvVqHI7");
const express = require("express");

const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:8080";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1McFoeAkYoZe3tMzubbNtnhS",
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: { enabled: true }
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
