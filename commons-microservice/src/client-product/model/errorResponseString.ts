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
import { OkResponseString } from './okResponseString';


export interface ErrorResponseString { 
    message: string;
    error: ErrorResponseString.ErrorEnum;
    data: string;
}
export namespace ErrorResponseString {
    export type ErrorEnum = 'false';
    export const ErrorEnum = {
        False: 'false' as ErrorEnum
    };
}


