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
/**
 * 
 * @export
 * @interface ProductDtoAllOf
 */
export interface ProductDtoAllOf {
    /**
     * 
     * @type {string}
     * @memberof ProductDtoAllOf
     */
    status: ProductDtoAllOfStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof ProductDtoAllOf
     */
    id?: string;
}

export function ProductDtoAllOfFromJSON(json: any): ProductDtoAllOf {
    return ProductDtoAllOfFromJSONTyped(json, false);
}

export function ProductDtoAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductDtoAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function ProductDtoAllOfToJSON(value?: ProductDtoAllOf | null): any {
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
export enum ProductDtoAllOfStatusEnum {
    Started = 'Started',
    Sent = 'Sent',
    Derived = 'Derived',
    Returned = 'Returned'
}


