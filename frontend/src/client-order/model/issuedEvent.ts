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
import { Order } from './order';
import { UserBaseEvent } from './userBaseEvent';
import { IssuedEventAllOf } from './issuedEventAllOf';


export interface IssuedEvent { 
    who: string;
    _with: Order;
    what: IssuedEvent.WhatEnum;
}
export namespace IssuedEvent {
    export type WhatEnum = 'Issued';
    export const WhatEnum = {
        Issued: 'Issued' as WhatEnum
    };
}


