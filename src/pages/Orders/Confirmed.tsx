import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Order, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Orders.css";

export default function Confirmed() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [orderStatus, setOrderStatus] = useState<Order[]>([]);
  const [orderStatusIsLoading, setOrderStatusIsLoading] = useState(false);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);

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

  useEffect(() => {
    setOrderStatusIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      setOrderStatus(response.data);
      setOrderStatusIsLoading(false);
    });
  }, []);

  const confirmedOrders = orderStatus.filter((confirmed) => confirmed.orderStatus === OrderStatus.Confirmed);

  const filteredList = confirmedOrders.map((confirmedOrder, id) => (
    <div key={id}>
      <div>{confirmedOrder.confirmed}</div>
    </div>
  ));

  return (
    <>
      <Helmet title="Bekräftade ordrar" />
      <div className="order-container">
        <TabLink />
        <br />
        <h1>Bekräftade ordrar</h1>
        <br />
        <div className="order-list">
          {orderIsLoading && productIsLoading && userIsLoading && orderStatusIsLoading ? (
            <LinearProgress />
          ) : (
            confirmedOrders?.map((confirmed, i) => (
              <div key={i} className="chef-card">
                <div>
                  <div className="confirmed-status-header">
                    Order Id: {confirmed.orderId}
                    <h2>Orderstatus: {confirmed.confirmed ? "Bekräftad" : "Ej bekräftad"}</h2>
                  </div>
                  <br />
                  {confirmed.orderLines?.map((item, productId) => (
                    <div key={productId} className="chef-list">
                      <div className="confirmed-status-header">
                        <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                      </div>
                      <br />
                      <div className="order-info">
                        <div>
                          Kund: {user.find((user) => user.userId === confirmed.userId)?.firstName}
                          {user.find((user) => user.userId === confirmed.userId)?.lastName} <br />
                        </div>
                        Ordersumma: {confirmed.totalAmount}kr
                        <br />
                        Tidstämpel: {confirmed.confirmed}
                        <br />
                        <br />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-btn-container">
                  <button className="order-btn done-btn" type="button" onClick={() => confirmed.done}>
                    Sätt som klar
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
