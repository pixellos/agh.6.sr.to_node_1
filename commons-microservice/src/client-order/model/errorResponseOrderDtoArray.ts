/**
 * order-microservice
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { BadResponse } from './badResponse';
import { OrderDto } from './orderDto';
import { OkResponseOrderDtoArray } from './okResponseOrderDtoArray';


export interface ErrorResponseOrderDtoArray { 
    message: string;
    error: ErrorResponseOrderDtoArray.ErrorEnum;
    data: Array<OrderDto>;
}
export namespace ErrorResponseOrderDtoArray {
    export type ErrorEnum = 'false';
    export const ErrorEnum = {
        False: 'false' as ErrorEnum
    };
}

