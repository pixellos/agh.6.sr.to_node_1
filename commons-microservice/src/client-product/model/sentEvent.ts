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
import { SentEventAllOf } from './sentEventAllOf';


export interface SentEvent { 
    who: string;
    _with: object;
    what: SentEvent.WhatEnum;
}
export namespace SentEvent {
    export type WhatEnum = 'Sent';
    export const WhatEnum = {
        Sent: 'Sent' as WhatEnum
    };
}


