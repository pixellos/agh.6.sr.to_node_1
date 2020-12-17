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
import { UserBaseEvent } from './userBaseEvent';
import { RefundEventAllOfWith } from './refundEventAllOfWith';
import { RefundEventAllOf } from './refundEventAllOf';


export interface RefundEvent { 
    who: string;
    _with: RefundEventAllOfWith;
    what: RefundEvent.WhatEnum;
}
export namespace RefundEvent {
    export type WhatEnum = 'Refunded';
    export const WhatEnum = {
        Refunded: 'Refunded' as WhatEnum
    };
}

