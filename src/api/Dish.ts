/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import _client from "./HttpClient";
import * as DTO from "./Dto";
export const addProduct = async (Product: DTO.CreateProduct): Promise<DTO.Product> => {
    const path = [_client.resolveUrl(`/api/Product`)];
    return _client.httpFetch<DTO.Product>('POST', path.join(""), Product, undefined, undefined, undefined);
};

export const getProduct = async (id: number): Promise<DTO.Product> => {
    const path = [_client.resolveUrl(`/api/Product/${id}`)];
    return _client.httpFetch<DTO.Product>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listProductes = async (): Promise<DTO.Product[]> => {
    const path = [_client.resolveUrl(`/api/Product`)];
    return _client.httpFetch<DTO.Product[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const updateProduct = async (id: number, Product: DTO.CreateProduct): Promise<DTO.Product> => {
    const path = [_client.resolveUrl(`/api/Product/${id}`)];
    return _client.httpFetch<DTO.Product>('PUT', path.join(""), Product, undefined, undefined, undefined);
};

