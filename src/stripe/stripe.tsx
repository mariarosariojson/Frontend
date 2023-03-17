// import { useEffect, useState } from "react";

// function ProductDisplay() {
//   return (
//     <section>
//       <div className="product">
//         <img alt="The cover of Stubborn Attachments" src="https://i.imgur.com/EHyR2nP.png" />
//         <div className="description">
//           <h3>Stubborn Attachments</h3>
//           <h5>$20.00</h5>
//         </div>
//       </div>
//       <form action="/create-checkout-session" method="POST">
//         <button type="submit">Checkout</button>
//       </form>
//     </section>
//   );
// }

// function Message({ message }:any) {
//   return (
//     <section>
//       <p>{message}</p>
//     </section>
//   );
// }

// export default function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
//     }
//   }, []);

//   return message ? <Message message={message} /> : <ProductDisplay />;
// }
