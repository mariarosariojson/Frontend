/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import _client from "./HttpClient";
import * as Enums from "./Enums";
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

export const listOrders = async (/** Default =  */from?: string, /** Default = 0 */status?: Enums.OrderStatus): Promise<DTO.Order[]> => {
    const path = [_client.resolveUrl(`/api/Order`)];
    const _queryParameters: string[] = [];
    if(from !== null && from !== undefined) {
        _queryParameters.push(`from=${encodeURIComponent(from)}`);
    }
    if(status !== null && status !== undefined) {
        _queryParameters.push(`status=${encodeURIComponent(status)}`);
    }
    if(_queryParameters.length > 0) {
        path.push("?");
        path.push(_queryParameters.join("&"));
    }
    return _client.httpFetch<DTO.Order[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listUsersOrders = async (id: number): Promise<DTO.Order[]> => {
    const path = [_client.resolveUrl(`/api/Order/ListUsersOrders/${id}`)];
    return _client.httpFetch<DTO.Order[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const updateOrder = async (id: number, Order: DTO.CreateOrder): Promise<DTO.Order> => {
    const path = [_client.resolveUrl(`/api/Order/${id}`)];
    return _client.httpFetch<DTO.Order>('PUT', path.join(""), Order, undefined, undefined, undefined);
};

