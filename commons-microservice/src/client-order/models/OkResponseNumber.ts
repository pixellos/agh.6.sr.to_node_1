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
 * @interface OkResponseNumber
 */
export interface OkResponseNumber {
    /**
     * 
     * @type {number}
     * @memberof OkResponseNumber
     */
    data: number;
    /**
     * 
     * @type {boolean}
     * @memberof OkResponseNumber
     */
    error: OkResponseNumberErrorEnum;
}

export function OkResponseNumberFromJSON(json: any): OkResponseNumber {
    return OkResponseNumberFromJSONTyped(json, false);
}

export function OkResponseNumberFromJSONTyped(json: any, ignoreDiscriminator: boolean): OkResponseNumber {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': json['data'],
        'error': json['error'],
    };
}

export function OkResponseNumberToJSON(value?: OkResponseNumber | null): any {
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
export enum OkResponseNumberErrorEnum {
    False = 'false'
}


