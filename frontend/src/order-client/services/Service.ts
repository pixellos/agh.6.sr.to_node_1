/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorResponse } from '../models/ErrorResponse';
import type { Orders_ViewModel } from '../models/Orders_ViewModel';
import { request as __request } from '../core/request';

export class Service {

    /**
     * @param requestBody 
     * @result ErrorResponse Ok
     * @throws ApiError
     */
    public static async send(
requestBody: {
id: string,
},
): Promise<ErrorResponse> {
        const result = await __request({
            method: 'POST',
            path: `/order/send`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param requestBody 
     * @result ErrorResponse Ok
     * @throws ApiError
     */
    public static async add(
requestBody: Orders_ViewModel,
): Promise<ErrorResponse> {
        const result = await __request({
            method: 'POST',
            path: `/order/add`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param amount 
     * @param id 
     * @result ErrorResponse Ok
     * @throws ApiError
     */
    public static async pay(
amount: number,
id: string,
): Promise<ErrorResponse> {
        const result = await __request({
            method: 'POST',
            path: `/order/pay`,
            query: {
                'amount': amount,
                'id': id,
            },
        });
        return result.body;
    }

    /**
     * @result ErrorResponse Ok
     * @throws ApiError
     */
    public static async all(): Promise<ErrorResponse> {
        const result = await __request({
            method: 'GET',
            path: `/order/all`,
        });
        return result.body;
    }

    /**
     * @param id 
     * @param type 
     * @result ErrorResponse Ok
     * @throws ApiError
     */
    public static async list(
id: string,
type: 'Order',
): Promise<ErrorResponse> {
        const result = await __request({
            method: 'GET',
            path: `/events/list/${type}/${id}`,
        });
        return result.body;
    }

}