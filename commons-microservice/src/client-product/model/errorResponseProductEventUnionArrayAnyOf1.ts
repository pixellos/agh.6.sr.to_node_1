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
import { ProductEventUnion } from './productEventUnion';


export interface ErrorResponseProductEventUnionArrayAnyOf1 { 
    data: Array<ProductEventUnion>;
    error: ErrorResponseProductEventUnionArrayAnyOf1.ErrorEnum;
}
export namespace ErrorResponseProductEventUnionArrayAnyOf1 {
    export type ErrorEnum = 'false';
    export const ErrorEnum = {
        False: 'false' as ErrorEnum
    };
}


