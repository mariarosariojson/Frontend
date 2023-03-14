const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")("sk_test_51McFTpAkYoZe3tMzQgSE27sxoCM7IcGJmqxJArNOLPrgvTTqBWru5ROIKI1Gygk4ekDrtarZAsVaAQs7dDDySdUJ00xewC5EpO");
const express = require("express");

const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:8080";
const whitelist = new Set(["http://localhost:8080", "https://js.stripe.com/"]);
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.post("/create-checkout-session", async (req, res) => {
  console.log("hej stripe");
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
  console.log(session);
  // res.json({ url: session.url });
  const t = session.url;
  console.log(t);
  // res.json({ url: t });
  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
