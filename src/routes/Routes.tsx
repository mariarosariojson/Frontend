import { useContext } from "react";
import { useRoutes } from "react-router-dom";

import type { RouteObject } from "react-router";

import Error401 from "Src/components/Errors/Error401";
import Error404 from "Src/components/Errors/Error404";
import ShoppingCart from "Src/components/ShoppingCart/ShoppingCart";
import Sidebar from "Src/components/Sidebar/Sidebar";
import { UserType } from "Src/api/Enums";

import { UserContext } from "Src/context/UserContextProvider";
import Checkout from "Src/pages/Checkout";
import Chef from "Src/pages/Chef";
import Contact from "Src/pages/Contact";
import Food from "Src/pages/Food";
import FoodProduct from "Src/pages/FoodProduct";
import Index from "Src/pages/Index";
import Login from "Src/pages/Login";
import OrderComplete from "Src/pages/OrderComplete";
import Closed from "Src/pages/Orders/Closed";
import Confirmed from "Src/pages/Orders/Confirmed";
import Created from "Src/pages/Orders/Created";
import Done from "Src/pages/Orders/Done";
import Register from "Src/pages/Register";

interface UserContextType {
  userRole: string;
  adminOnly: boolean;
}

const userRoutes: RouteObject[] = [
  { path: "/Home", element: <Index /> },
  { path: "/Food", element: <Food /> },
  { path: "/Contact", element: <Contact /> },
  { path: "/", element: <Login /> },
  { path: "*", element: <Error404 /> },
  { path: "/Register", element: <Register /> },
  { path: "/ShoppingCart", element: <ShoppingCart /> },
  { path: "/Checkout", element: <Checkout /> },
  { path: "/OrderComplete", element: <OrderComplete /> },
  { path: "/FoodProduct/:id", element: <FoodProduct /> }
];

const adminRoutes: RouteObject[] = [
  { path: "/Chef", element: <Chef /> },
  { path: "/Confirmed", element: <Confirmed /> },
  { path: "/Created", element: <Created /> },
  { path: "/Done", element: <Done /> },
  { path: "/Closed", element: <Closed /> },
  { path: "*", element: <Error404 /> },
  { path: "unauthorized", element: <Error401 /> },
  { path: "/Sidebar", element: <Sidebar /> }
];

export default function Routes() {
  const { userRole } = useContext(UserContext) as UserContextType;
  const routes = userRole === "Admin" ? adminRoutes : userRoutes;
  const allRoutes = useRoutes(routes);

  return allRoutes;
}
