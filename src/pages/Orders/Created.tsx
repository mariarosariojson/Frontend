import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Order, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Orders.css";

export default function Created() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);

  async function confirmedOrder(id: number, order: Order) {
    const orderPath = `/api/Order/${id}`;
    await axios.put(orderPath, { ...order, orderStatus: OrderStatus.Confirmed });
    setOrderIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
  }

  useEffect(() => {
    setOrderIsLoading(true);
    setProductIsLoading(true);
    setUserIsLoading(true);
    const orderPath = `/api/Order/`;
    const productPath = `/api/Product/`;
    axios.get(orderPath).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
    axios.get(productPath).then((response) => {
      setProduct(response.data);
      setProductIsLoading(false);
    });
    const userPath = `/api/User/`;
    axios.get(userPath).then((response) => {
      setUser(response.data);
      setUserIsLoading(false);
    });
  }, []);

  const createdOrders = order.filter((created) => created.orderStatus === OrderStatus.Created);

  const filteredList = createdOrders.map((createdOrder, id) => (
    <div key={id}>
      <div>{createdOrder.created}</div>
    </div>
  ));

  return (
    <>
      <Helmet title="Nya ordrar" />
      <div className="order-container">
        <TabLink />
        <br />
        <h1>Nya ordrar</h1>
        <br />
        <div className="order-list">
          {orderIsLoading && productIsLoading && userIsLoading ? (
            <LinearProgress />
          ) : (
            createdOrders?.map((created, orderId) => (
              <div key={orderId} className="chef-card">
                <div className="chef-list">
                  <div className="created-status-header">
                    Order id: {created.orderId} <br />
                    <h2>Orderstatus: {created.created ? "Ny order" : ""}</h2>
                    Order skapad: {created.created}
                  </div>
                  <br />
                  {created.orderLines?.map((item, productId) => (
                    <div key={productId}>
                      <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                      <br />
                      <div className="order-info">
                        <div>
                          Kund: {user.find((user) => user.userId === created.userId)?.firstName}{" "}
                          {user.find((user) => user.userId === created.userId)?.lastName} <br />
                        </div>
                        Ordersumma: {created.totalAmount}kr
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-btn-container">
                  <button className="order-btn confirmed-btn" type="button" onClick={(_) => confirmedOrder(created.orderId, created)}>
                    Sätt som befräftad
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
