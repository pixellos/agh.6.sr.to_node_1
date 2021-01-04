/* tslint:disable */
/* eslint-disable */
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

import { exists, mapValues } from '../runtime';
import {
    BadResponse,
    BadResponseFromJSON,
    BadResponseFromJSONTyped,
    BadResponseToJSON,
    OkResponseProductDtoArray,
    OkResponseProductDtoArrayFromJSON,
    OkResponseProductDtoArrayFromJSONTyped,
    OkResponseProductDtoArrayToJSON,
    ProductDto,
    ProductDtoFromJSON,
    ProductDtoFromJSONTyped,
    ProductDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface ErrorResponseProductDtoArray
 */
export interface ErrorResponseProductDtoArray {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseProductDtoArray
     */
    message: string;
    /**
     * 
     * @type {boolean}
     * @memberof ErrorResponseProductDtoArray
     */
    error: ErrorResponseProductDtoArrayErrorEnum;
    /**
     * 
     * @type {Array<ProductDto>}
     * @memberof ErrorResponseProductDtoArray
     */
    data: Array<ProductDto>;
}

export function ErrorResponseProductDtoArrayFromJSON(json: any): ErrorResponseProductDtoArray {
    return ErrorResponseProductDtoArrayFromJSONTyped(json, false);
}

export function ErrorResponseProductDtoArrayFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponseProductDtoArray {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': json['message'],
        'error': json['error'],
        'data': ((json['data'] as Array<any>).map(ProductDtoFromJSON)),
    };
}

export function ErrorResponseProductDtoArrayToJSON(value?: ErrorResponseProductDtoArray | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'error': value.error,
        'data': ((value.data as Array<any>).map(ProductDtoToJSON)),
    };
}

/**
* @export
* @enum {string}
*/
export enum ErrorResponseProductDtoArrayErrorEnum {
    False = 'false'
}


