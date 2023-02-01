import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import type { CreateOrder, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";
import { addOrder } from "Src/api/Order";
import { listProducts } from "Src/api/Product";
import { listUsers } from "Src/api/User";

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersIsLoading, setUsersIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsIsLoading, setProductsIsLoading] = useState(false);
 

  useEffect(() => {
    const fetchData = async () => {
      setProductsIsLoading(true);
      const result = await listProducts();

      setProducts(result);

      setProductsIsLoading(false);
    };
    fetchData();

    return () => {
      setProducts([]);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setUsersIsLoading(true);
      setProductsIsLoading(true);

      const usersResult = await listUsers();
      const productsResult = await listProducts();

      setProducts(productsResult);
      setUsers(usersResult);

      setProductsIsLoading(false);
      setUsersIsLoading(false);
    };
    fetchData();

    return () => {
      setProducts([]);
      setUsers([]);
    };
  }, []);

  // console.log("users", users);

  const placeOrder = async () => {
    // Skapa ny order
    const newOrder: CreateOrder = {
      totalAmount: 240,
      userId: 1,
      orderStatus: OrderStatus.Created,
      orderLines: [{ orderLineId: 0, orderId: 0, productId: 3, quantity: 2 }]
    };
    // Skicka order till DB
    await addOrder(newOrder);
    // Ladda om användare
    setUsersIsLoading(true);
    const result = await listUsers();
    setUsers(result);
    setUsersIsLoading(false);
  };

  return (
    <>
      <Helmet title="About" />
      <div style={{ width: "933px", marginLeft: "auto", marginRight: "auto" }}>
        <h1>Användare</h1>
        {usersIsLoading && productsIsLoading && <h1>Laddar användare</h1>}
        <ul>
          {users?.map((u, k) => (
            <li key={k}>
              {u.firstName} {u.lastName}
              <ul>
                {u.orders.map((o, k) => (
                  <li key={k}>{OrderStatus[o.orderStatus]}</li>
                ))}
              </ul>
            </li>
          )) ?? []}
        </ul>
        <button type="button" onClick={placeOrder}>
          Skicka beställning
        </button>
      </div>
    </>
  );
}
