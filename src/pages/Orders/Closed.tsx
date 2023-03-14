import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Order, Product } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Orders.css";

export default function Closed() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
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

  const closedOrders = order.filter((closed) => closed.orderStatus === OrderStatus.Closed);

  const filteredList = closedOrders.map((closedOrder, id) => (
    <div key={id}>
      <div>{closedOrder.closed}</div>
    </div>
  ));

  return (
    <>
      <Helmet title="Slutförda ordrar" />
      <div className="order-container">
        <TabLink />
        <br />
        <h1>Stängda ordrar</h1>
        <br />
        <div className="order-list">
          {orderIsLoading && productIsLoading ? (
            <LinearProgress />
          ) : (
            closedOrders?.map((closed, orderId) => (
              <div key={orderId} className="chef-card">
                <div>
                  <div className="chef-list">
                    <div className="closed-status-header">
                      Order Id: {closed.orderId}
                      <h2>Orderstatus: {closed.done ? "Stängd" : "Ej stängd"}</h2>
                      <br />
                    </div>
                    {closed.orderLines?.map((item, productId) => (
                      <div key={productId}>
                        <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                      </div>
                    ))}
                    <div className="order-info">
                      <br />
                      <br />
                      Ordersumma: {closed.totalAmount}kr
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
