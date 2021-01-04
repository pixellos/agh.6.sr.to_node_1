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
    ProductQuantity,
    ProductQuantityFromJSON,
    ProductQuantityFromJSONTyped,
    ProductQuantityToJSON,
} from './';

/**
 * 
 * @export
 * @interface ProductEventUnionAnyOf3
 */
export interface ProductEventUnionAnyOf3 {
    /**
     * 
     * @type {ProductQuantity}
     * @memberof ProductEventUnionAnyOf3
     */
    _with: ProductQuantity;
    /**
     * 
     * @type {string}
     * @memberof ProductEventUnionAnyOf3
     */
    what: ProductEventUnionAnyOf3WhatEnum;
}

export function ProductEventUnionAnyOf3FromJSON(json: any): ProductEventUnionAnyOf3 {
    return ProductEventUnionAnyOf3FromJSONTyped(json, false);
}

export function ProductEventUnionAnyOf3FromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductEventUnionAnyOf3 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_with': ProductQuantityFromJSON(json['with']),
        'what': json['what'],
    };
}

export function ProductEventUnionAnyOf3ToJSON(value?: ProductEventUnionAnyOf3 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'with': ProductQuantityToJSON(value._with),
        'what': value.what,
    };
}

/**
* @export
* @enum {string}
*/
export enum ProductEventUnionAnyOf3WhatEnum {
    Bought = 'Bought'
}


