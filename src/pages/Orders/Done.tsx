import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { CreateOrder, Order, Product } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

import "src/css/Orders.css";

export default function Done() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [orderStatus, setOrderStatus] = useState<Order[]>([]);
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

  const doneOrders = orderStatus.filter((done) => done.orderStatus === OrderStatus.Done);

  const filteredList = doneOrders.map((doneOrder, id) => (
    <div key={id}>
      <div>{doneOrder.done}</div>
    </div>
  ));

  return (
    <>
      <Helmet title="Slutförda ordrar" />
      <div className="order-container">
        <TabLink />
        <br />
        <h1>Slutförda ordrar</h1>
        <br />
        <div className="order-list">
          {orderIsLoading && productIsLoading ? (
            <LinearProgress />
          ) : (
            doneOrders?.map((done, orderId) => (
              <div key={orderId} className="chef-card">
                <div>
                  <div className="chef-list">
                    <div className="done-status-header">
                      Order Id: {done.orderId}
                      <h2>Orderstatus: {done.done ? "Slutförd" : "Ej slutförd"}</h2>
                      <br />
                    </div>
                    {done.orderLines?.map((item, productId) => (
                      <div key={productId}>
                        <h3>{product.find((product) => product.productId === item.productId)?.name}</h3>
                      </div>
                    ))}
                    <div className="order-info">
                      <br />
                      <br />
                      Ordersumma: {done.totalAmount}kr
                    </div>
                  </div>
                </div>
                <div className="order-btn-container">
                  <button className="order-btn delete-order-btn" type="button">
                    Ta bort
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
