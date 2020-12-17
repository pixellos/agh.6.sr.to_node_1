/**
 * product-microservice
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
import { ProductEventUnion } from './productEventUnion';
import { OkResponseProductEventUnionArray } from './okResponseProductEventUnionArray';


export interface ErrorResponseProductEventUnionArray { 
    message: string;
    error: ErrorResponseProductEventUnionArray.ErrorEnum;
    data: Array<ProductEventUnion>;
}
export namespace ErrorResponseProductEventUnionArray {
    export type ErrorEnum = 'false';
    export const ErrorEnum = {
        False: 'false' as ErrorEnum
    };
}

