/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import * as Enums from "./Enums";

type Optional<T> = T | undefined;

export interface CreateKitchen {
    code: string;
    kitchenQueueTime: number;
    kitchenStatus: Enums.KitchenStatus;
    name: string;
}
export interface CreateOrder {
    confirmed?: Optional<string | null>;
    created?: Optional<string | null>;
    done?: Optional<string | null>;
    orderLines: OrderLine[];
    orderStatus: Enums.OrderStatus;
    totalAmount: number;
    updated?: Optional<string | null>;
    userId: number;
}
export interface CreateOrderLine {
    orderId: number;
    productId: number;
    quantity: number;
}
export interface CreateProduct {
    active?: Optional<boolean>;
    imageUrl?: Optional<string>;
    name: string;
    orderLines: OrderLine[];
    price: number;
    productCategoryId: number;
}
export interface CreateUser {
    active?: Optional<boolean>;
    email: string;
    firstName: string;
    lastName: string;
    orders: Order[];
    userType: Enums.UserType;
}
export interface Kitchen extends CreateKitchen {
    kitchenId: number;
}
export interface Order extends CreateOrder {
    orderId: number;
}
export interface OrderLine extends CreateOrderLine {
    orderLineId: number;
}
export interface Product extends CreateProduct {
    productId: number;
}
export interface User extends CreateUser {
    userId: number;
}
