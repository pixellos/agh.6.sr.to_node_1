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
import { ProductQuantity } from './productQuantity';


export interface ProductEventUnionAnyOf2 { 
    _with: ProductQuantity;
    what: ProductEventUnionAnyOf2.WhatEnum;
}
export namespace ProductEventUnionAnyOf2 {
    export type WhatEnum = 'Added';
    export const WhatEnum = {
        Added: 'Added' as WhatEnum
    };
}


