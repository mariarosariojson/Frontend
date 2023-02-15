import { useRoutes } from "react-router-dom";

import type { RouteObject } from "react-router";

import Error401 from "Src/components/Errors/Error401";
import Error404 from "Src/components/Errors/Error404";
import ShoppingCart from "Src/components/ShoppingCart/ShoppingCart";

import Chef from "Src/pages/Chef";
import Contact from "Src/pages/Contact";
import FoodMenu from "Src/pages/FoodMenu";
import FoodProduct from "Src/pages/FoodProduct";
import Index from "Src/pages/Home/Index";
import Login from "Src/pages/Login";
import Confirmed from "Src/pages/Orders/Confirmed";
import Created from "Src/pages/Orders/Created";
import Done from "Src/pages/Orders/Done";
import Register from "Src/pages/Register";
// import Register from "Src/pages/Register";

const routes: RouteObject[] = [
  { path: "/", element: <Index id={0} imageUrl="" name="" price={0} /> },
  { path: "/foodMenu", element: <FoodMenu id={0} imageUrl="" name="" price={0} /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/Login", element: <Login kitchenQueue={0} /> },
  { path: "*", element: <Error404 /> },
  { path: "unauthorized", element: <Error401 /> },
  { path: "/Register", element: <Register /> },
  { path: "/Chef", element: <Chef /> },
  { path: "/Confirmed", element: <Confirmed /> },
  { path: "/Created", element: <Created /> },
  { path: "/Done", element: <Done /> },
  { path: "/ShoppingCart", element: <ShoppingCart /> },
  { path: "/FoodProduct/:id", element: <FoodProduct id={0} imageUrl="" name="" price={0} /> }
];

export default function Routes() {
  const allRoutes = useRoutes(routes);

  return allRoutes;
}
