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
import { AddressDto } from './addressDto';


export interface AddressSetEventAllOf { 
    _with: AddressDto;
    what: AddressSetEventAllOf.WhatEnum;
}
export namespace AddressSetEventAllOf {
    export type WhatEnum = 'AddressSet';
    export const WhatEnum = {
        AddressSet: 'AddressSet' as WhatEnum
    };
}


