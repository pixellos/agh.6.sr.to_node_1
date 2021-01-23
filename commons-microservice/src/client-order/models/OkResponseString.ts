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
/**
 * 
 * @export
 * @interface OkResponseString
 */
export interface OkResponseString {
    /**
     * 
     * @type {string}
     * @memberof OkResponseString
     */
    data: string;
    /**
     * 
     * @type {boolean}
     * @memberof OkResponseString
     */
    error: OkResponseStringErrorEnum;
}

export function OkResponseStringFromJSON(json: any): OkResponseString {
    return OkResponseStringFromJSONTyped(json, false);
}

export function OkResponseStringFromJSONTyped(json: any, ignoreDiscriminator: boolean): OkResponseString {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': json['data'],
        'error': json['error'],
    };
}

export function OkResponseStringToJSON(value?: OkResponseString | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data,
        'error': value.error,
    };
}

/**
* @export
* @enum {string}
*/
export enum OkResponseStringErrorEnum {
    False = 'false'
}


