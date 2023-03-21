import { useRoutes } from "react-router-dom";

import type { RouteObject } from "react-router";

import Error401 from "Src/components/Errors/Error401";
import Error404 from "Src/components/Errors/Error404";
import ShoppingCart from "Src/components/ShoppingCart/ShoppingCart";
import Sidebar from "Src/components/Sidebar/Sidebar";

import Checkout from "Src/pages/Checkout";
import Chef from "Src/pages/Chef";
import Contact from "Src/pages/Contact";
import FoodMenu from "Src/pages/Food";
import FoodProduct from "Src/pages/FoodProduct";
import Index from "Src/pages/Index";
import Login from "Src/pages/Login";
import Closed from "Src/pages/Orders/Closed";
import Confirmed from "Src/pages/Orders/Confirmed";
import Created from "Src/pages/Orders/Created";
import Done from "Src/pages/Orders/Done";
import Register from "Src/pages/Register";

const routes: RouteObject[] = [
  { path: "/Home", element: <Index /> },
  { path: "/Food", element: <FoodMenu /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/", element: <Login /> },
  { path: "*", element: <Error404 /> },
  { path: "unauthorized", element: <Error401 /> },
  { path: "/Register", element: <Register /> },
  { path: "/Chef", element: <Chef /> },
  { path: "/Confirmed", element: <Confirmed /> },
  { path: "/Created", element: <Created /> },
  { path: "/Done", element: <Done /> },
  { path: "/Closed", element: <Closed /> },
  { path: "/ShoppingCart", element: <ShoppingCart /> },
  { path: "/Checkout", element: <Checkout /> },
  { path: "/Sidebar", element: <Sidebar /> }
  // { path: "/FoodProduct/:id", element: <FoodProduct /> }
];

export default function Routes() {
  const allRoutes = useRoutes(routes);

  return allRoutes;
}
