/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import _client from "./HttpClient";
import * as DTO from "./Dto";
export const addOrder = async (Order: DTO.CreateOrder): Promise<DTO.Order> => {
    const path = [_client.resolveUrl(`/api/Order`)];
    return _client.httpFetch<DTO.Order>('POST', path.join(""), Order, undefined, undefined, undefined);
};

export const deleteOrder = async (id: number): Promise<any> => {
    const path = [_client.resolveUrl(`/api/Order/${id}`)];
    return _client.httpFetch<any>('DELETE', path.join(""), null, undefined, undefined, undefined);
};

export const getOrder = async (id: number): Promise<DTO.Order> => {
    const path = [_client.resolveUrl(`/api/Order/${id}`)];
    return _client.httpFetch<DTO.Order>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listOrders = async (): Promise<DTO.Order[]> => {
    const path = [_client.resolveUrl(`/api/Order`)];
    return _client.httpFetch<DTO.Order[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listUsersOrders = async (userId: number, id: any): Promise<DTO.Order[]> => {
    const path = [_client.resolveUrl(`/api/Order/ListUsersOrders/${id}`)];
    const _queryParameters: string[] = [];
    if(userId !== null && userId !== undefined) {
        _queryParameters.push(`userId=${encodeURIComponent(userId)}`);
    }
    if(_queryParameters.length > 0) {
        path.push("?");
        path.push(_queryParameters.join("&"));
    }
    return _client.httpFetch<DTO.Order[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const updateOrder = async (id: number, Order: DTO.CreateOrder): Promise<DTO.Order> => {
    const path = [_client.resolveUrl(`/api/Order/${id}`)];
    return _client.httpFetch<DTO.Order>('PUT', path.join(""), Order, undefined, undefined, undefined);
};

