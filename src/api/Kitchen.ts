/* eslint-disable */
/* eslint-disable prettier/prettier */
/******************************************\
* DO NOT EDIT, THIS CODE IS TOOL GENERATED *
* AND ANY CHANGES WILL BE OVERWRITTEN      *
\******************************************/

import _client from "./HttpClient";
import * as DTO from "./Dto";
export const addKitchen = async (Kitchen: DTO.CreateKitchen): Promise<DTO.Kitchen> => {
    const path = [_client.resolveUrl(`/api/Kitchen`)];
    return _client.httpFetch<DTO.Kitchen>('POST', path.join(""), Kitchen, undefined, undefined, undefined);
};

export const getKitchen = async (id: number): Promise<DTO.Kitchen> => {
    const path = [_client.resolveUrl(`/api/Kitchen/${id}`)];
    return _client.httpFetch<DTO.Kitchen>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const listKitchens = async (): Promise<DTO.Kitchen[]> => {
    const path = [_client.resolveUrl(`/api/Kitchen`)];
    return _client.httpFetch<DTO.Kitchen[]>('GET', path.join(""), null, undefined, undefined, undefined);
};

export const updateKitchen = async (id: number, Kitchen: DTO.CreateKitchen): Promise<DTO.Kitchen> => {
    const path = [_client.resolveUrl(`/api/Kitchen/${id}`)];
    return _client.httpFetch<DTO.Kitchen>('PUT', path.join(""), Kitchen, undefined, undefined, undefined);
};

