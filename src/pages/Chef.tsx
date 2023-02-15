import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { CreateOrderLine, Order, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Chef.css";

export default function Chef() {
  const [order, setOrder] = useState<Order[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);

  function removeOrder(id: number) {
    const orderPath = `/api/Order/${id}`;
    axios.delete(orderPath).then();
    const newOrderList = order.filter((id) => id !== id);
    setOrder(newOrderList);
  }

  async function confirmedOrder(id: number, order: any) {
    const orderPath = `/api/Order/${id}`;
    await axios.put(orderPath, { ...order, orderStatus: OrderStatus.Confirmed });
    setOrderIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      console.log(response.data);
      setOrder(response.data);
      setOrderIsLoading(false);
    });
  }

  async function doneOrder(id: number, order: any) {
    const orderPath = `/api/Order/${id}`;
    await axios.put(orderPath, { ...order, orderStatus: OrderStatus.Done });
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
    axios.get(orderPath).then((response) => {
      setOrder(response.data);
      setOrderIsLoading(false);
    });
    const productPath = `/api/Product/`;
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

  return (
    <>
      <Helmet title="Kocken" />
      <div className="chef-container">
        <TabLink />
        <br />
        <h1>Chefs view</h1>
        <br />
        <div className="chef-order-status">
          <div className="chef-status-col-1">
            <h2>Nya ordrar: {OrderStatus.Created} st</h2>
          </div>
          <div className="chef-status-col-2">
            <h2>Bekräftade: {OrderStatus.Confirmed} st</h2>
          </div>
          <div className="chef-status-col-3">
            <h2>Slutförda: {OrderStatus.Done}st</h2>
          </div>
        </div>
        <div className="chef-order-list">
          {orderIsLoading && orderIsLoading && userIsLoading ? (
            <LinearProgress />
          ) : (
            order?.map((order, orderId) => (
              <div key={orderId} className="chef-card">
                <div>
                  <div className="chef-list">
                    <div className="chef-status-header">
                      <h2>Order id: {order.orderId}</h2>
                      <br />
                    </div>
                    {order.orderLines?.map((item, productId) => (
                      <div key={productId} className="chef-list">
                        <div className="chef-status-header">
                          <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                        </div>
                        <br />
                        <div className="chef-order-info">
                          <div>
                            Kund: {user.find((user) => user.userId === order.userId)?.firstName}{" "}
                            {user.find((user) => user.userId === order.userId)?.lastName} <br />
                          </div>
                          Ordersumma: {order.totalAmount}kr
                          <br />
                          Tidstämpel: {order.confirmed}
                          <br />
                          <br />
                        </div>
                      </div>
                    ))}
                    <div className="chef-btn-container">
                      <button className="order-btn confirmed-btn" type="button" onClick={(_) => confirmedOrder(order.orderId, order)}>
                        Sätt som befräftad
                      </button>
                      <button className="order-btn done-btn" type="button" onClick={(_) => doneOrder(order.orderId, order)}>
                        Sätt som klar
                      </button>
                      <button className="order-btn delete-order-btn" type="button" onClick={(_) => removeOrder(order.orderId)}>
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
