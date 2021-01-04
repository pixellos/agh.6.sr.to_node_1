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
    OkResponseProductEventUnionArray,
    OkResponseProductEventUnionArrayFromJSON,
    OkResponseProductEventUnionArrayFromJSONTyped,
    OkResponseProductEventUnionArrayToJSON,
    ProductEventUnion,
    ProductEventUnionFromJSON,
    ProductEventUnionFromJSONTyped,
    ProductEventUnionToJSON,
} from './';

/**
 * 
 * @export
 * @interface ErrorResponseProductEventUnionArray
 */
export interface ErrorResponseProductEventUnionArray {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseProductEventUnionArray
     */
    message: string;
    /**
     * 
     * @type {boolean}
     * @memberof ErrorResponseProductEventUnionArray
     */
    error: ErrorResponseProductEventUnionArrayErrorEnum;
    /**
     * 
     * @type {Array<ProductEventUnion>}
     * @memberof ErrorResponseProductEventUnionArray
     */
    data: Array<ProductEventUnion>;
}

export function ErrorResponseProductEventUnionArrayFromJSON(json: any): ErrorResponseProductEventUnionArray {
    return ErrorResponseProductEventUnionArrayFromJSONTyped(json, false);
}

export function ErrorResponseProductEventUnionArrayFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponseProductEventUnionArray {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': json['message'],
        'error': json['error'],
        'data': ((json['data'] as Array<any>).map(ProductEventUnionFromJSON)),
    };
}

export function ErrorResponseProductEventUnionArrayToJSON(value?: ErrorResponseProductEventUnionArray | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'error': value.error,
        'data': ((value.data as Array<any>).map(ProductEventUnionToJSON)),
    };
}

/**
* @export
* @enum {string}
*/
export enum ErrorResponseProductEventUnionArrayErrorEnum {
    False = 'false'
}


