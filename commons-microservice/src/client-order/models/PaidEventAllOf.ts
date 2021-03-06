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
    PaidEventAllOfWith,
    PaidEventAllOfWithFromJSON,
    PaidEventAllOfWithFromJSONTyped,
    PaidEventAllOfWithToJSON,
} from './';

/**
 * 
 * @export
 * @interface PaidEventAllOf
 */
export interface PaidEventAllOf {
    /**
     * 
     * @type {PaidEventAllOfWith}
     * @memberof PaidEventAllOf
     */
    _with: PaidEventAllOfWith;
    /**
     * 
     * @type {string}
     * @memberof PaidEventAllOf
     */
    what: PaidEventAllOfWhatEnum;
}

export function PaidEventAllOfFromJSON(json: any): PaidEventAllOf {
    return PaidEventAllOfFromJSONTyped(json, false);
}

export function PaidEventAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaidEventAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_with': PaidEventAllOfWithFromJSON(json['with']),
        'what': json['what'],
    };
}

export function PaidEventAllOfToJSON(value?: PaidEventAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'with': PaidEventAllOfWithToJSON(value._with),
        'what': value.what,
    };
}

/**
* @export
* @enum {string}
*/
export enum PaidEventAllOfWhatEnum {
    Paid = 'Paid'
}


