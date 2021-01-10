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
 * @interface OrderDtoAllOf
 */
export interface OrderDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof OrderDtoAllOf
     */
    status: OrderDtoAllOfStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof OrderDtoAllOf
     */
    id?: string;
}

export function OrderDtoAllOfFromJSON(json: any): OrderDtoAllOf {
    return OrderDtoAllOfFromJSONTyped(json, false);
}

export function OrderDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function OrderDtoAllOfToJSON(value?: OrderDtoAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'id': value.id,
    };
}

/**
* @export
* @enum {string}
*/
export enum OrderDtoAllOfStatusEnum {
    Started = 'Started',
    Sent = 'Sent',
    Derived = 'Derived',
    Returned = 'Returned',
    Paid = 'Paid'
}


