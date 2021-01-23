/* tslint:disable */
/* eslint-disable */
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

import { exists, mapValues } from '../runtime';
import {
    BadResponse,
    BadResponseFromJSON,
    BadResponseFromJSONTyped,
    BadResponseToJSON,
    OkResponseString,
    OkResponseStringFromJSON,
    OkResponseStringFromJSONTyped,
    OkResponseStringToJSON,
} from './';

/**
 * 
 * @export
 * @interface ErrorResponseString
 */
export interface ErrorResponseString {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseString
     */
    message: string;
    /**
     * 
     * @type {boolean}
     * @memberof ErrorResponseString
     */
    error: ErrorResponseStringErrorEnum;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponseString
     */
    data: string;
}

export function ErrorResponseStringFromJSON(json: any): ErrorResponseString {
    return ErrorResponseStringFromJSONTyped(json, false);
}

export function ErrorResponseStringFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorResponseString {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': json['message'],
        'error': json['error'],
        'data': json['data'],
    };
}

export function ErrorResponseStringToJSON(value?: ErrorResponseString | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
        'error': value.error,
        'data': value.data,
    };
}

/**
* @export
* @enum {string}
*/
export enum ErrorResponseStringErrorEnum {
    False = 'false'
}

