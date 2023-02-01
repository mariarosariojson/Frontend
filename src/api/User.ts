/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import _client from "./HttpClient";
import * as DTO from "./Dto";
export const addUser = async (user: DTO.CreateUser): Promise<DTO.User> => {
    const path = [_client.resolveUrl(`/api/User`)];
    return _client.httpFetch<DTO.User>('POST', path.join(""), user, undefined, undefined, undefined);
};

export const getUser = async (id: number): Promise<DTO.User> => {
    const path = [_client.resolveUrl(`/api/User/${id}`)];
    return _client.httpFetch<DTO.User>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listUsers = async (): Promise<DTO.User[]> => {
    const path = [_client.resolveUrl(`/api/User`)];
    return _client.httpFetch<DTO.User[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const login = async (email: string, code: string): Promise<boolean> => {
    const path = [_client.resolveUrl(`/api/User/${email}/${code}`)];
    return _client.httpFetch<boolean>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const updateUser = async (id: number, user: DTO.CreateUser): Promise<DTO.User> => {
    const path = [_client.resolveUrl(`/api/User/${id}`)];
    return _client.httpFetch<DTO.User>('PUT', path.join(""), user, undefined, undefined, undefined);
};

