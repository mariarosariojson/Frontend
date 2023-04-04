import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { LinearProgress } from "@mui/material";
import axios from "axios";

import type { Order, Product, User } from "Src/api/Dto";

import { OrderStatus } from "Src/api/Enums";

import TabLink from "Src/components/TabLink/TabLink";

// import { useShoppingCart } from "Src/context/ShoppingCartContex";
import "src/css/Chef.css";

export default function Chef() {
  const [order, setOrder] = useState<Order[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false);
  const [productIsLoading, setProductIsLoading] = useState(false);
  const [userIsLoading, setUserIsLoading] = useState(false);
  // const { getItemQuantity } = useShoppingCart();
  // const quantity = getItemQuantity(id);

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

  async function closedOrder(id: number, order: any) {
    const orderPath = `/api/Order/${id}`;
    await axios.put(orderPath, { ...order, orderStatus: OrderStatus.Closed });
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

  const createdOrders = order.filter((created) => created.orderStatus === OrderStatus.Created);
  const confirmedOrders = order.filter((confirmed) => confirmed.orderStatus === OrderStatus.Confirmed);
  const doneOrders = order.filter((done) => done.orderStatus === OrderStatus.Done);
  const closedOrders = order.filter((closed) => closed.orderStatus === OrderStatus.Closed);

  return (
    <>
      <Helmet title="Kocken" />
      <div className="chef-container">
        <TabLink />
        <br />
        <h1>Alla ordrar</h1>
        <br />
        <div className="chef-order-status">
          <div className="chef-status-col-1">
            <h2>Nya ordrar: {createdOrders.length}st</h2>
          </div>
          <div className="chef-status-col-2">
            <h2>Bekräftade: {confirmedOrders.length}st</h2>
          </div>
          <div className="chef-status-col-3">
            <h2>Slutförda: {doneOrders.length}st</h2>
          </div>
          <div className="chef-status-col-4">
            <h2>Stängda: {closedOrders.length}st</h2>
          </div>
        </div>
        <div className="chef-order-list">
          {orderIsLoading && orderIsLoading && userIsLoading && productIsLoading ? (
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
                          Senast uppdaterad: {order.confirmed}
                          <br />
                          {order.orderStatus}
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
                      <button className="order-btn delete-order-btn" type="button" onClick={(_) => closedOrder(order.orderId, order)}>
                        Stängd
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
