import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import type { CreateOrder, Order, Product } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Orders.css";

export default function Created() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [orderStatus, setOrderStatus] = useState<CreateOrder[]>([]);
  const [orderStatusIsLoading, setOrderStatusIsLoading] = useState(false);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);

  useEffect(() => {
    setOrderIsLoading(true);
    setProductIsLoading(true);
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
  }, []);

  useEffect(() => {
    setOrderStatusIsLoading(true);
    const path = `/api/Order/`;
    axios.get(path).then((response) => {
      setOrderStatus(response.data);
      setOrderStatusIsLoading(false);
    });
  }, []);

  function toggleState(id: number) {
    setOrder(
      order.map((state) => {
        if (state.orderId === id) {
          return {
            ...state,
            completed: !state.confirmed
          };
        }

        return state;
      })
    );
  }

  console.log(orderStatus)


  const createdOrders = orderStatus.filter((created) => created.orderStatus === OrderStatus.Created);

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
          {orderIsLoading ? (
            <p>Laddar</p>
          ) : (
            createdOrders?.map((order, orderId) => (
              <div key={orderId} className="chef-card">
                <div className="chef-list">
                  <div className="created-status-header">
                    Order Id: {order.created}
                    <h2>Orderstatus: {order.created ? "Ny order" : ""}</h2>
                  </div>
                  <br />
                  {order.orderLines?.map((item, productId) => (
                    <div key={productId}>
                      <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                      <br />
                      <div className="order-info">
                        Order skapad: {order.created} <br />
                        Kund: {order.userId}
                        <br />
                        <br />
                        Ordersumma: {order.totalAmount}kr
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-btn-container">
                  <button className="order-btn confirmed-btn" type="button" onClick={() => toggleState}>
                    Sätt som bekräftad
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
