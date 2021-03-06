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
    RefundEventAllOf,
    RefundEventAllOfFromJSON,
    RefundEventAllOfFromJSONTyped,
    RefundEventAllOfToJSON,
    RefundEventAllOfWith,
    RefundEventAllOfWithFromJSON,
    RefundEventAllOfWithFromJSONTyped,
    RefundEventAllOfWithToJSON,
    UserBaseEvent,
    UserBaseEventFromJSON,
    UserBaseEventFromJSONTyped,
    UserBaseEventToJSON,
} from './';

/**
 * 
 * @export
 * @interface RefundEvent
 */
export interface RefundEvent {
    /**
     * 
     * @type {string}
     * @memberof RefundEvent
     */
    who: string;
    /**
     * 
     * @type {RefundEventAllOfWith}
     * @memberof RefundEvent
     */
    _with: RefundEventAllOfWith;
    /**
     * 
     * @type {string}
     * @memberof RefundEvent
     */
    what: RefundEventWhatEnum;
}

export function RefundEventFromJSON(json: any): RefundEvent {
    return RefundEventFromJSONTyped(json, false);
}

export function RefundEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): RefundEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'who': json['who'],
        '_with': RefundEventAllOfWithFromJSON(json['with']),
        'what': json['what'],
    };
}

export function RefundEventToJSON(value?: RefundEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'who': value.who,
        'with': RefundEventAllOfWithToJSON(value._with),
        'what': value.what,
    };
}

/**
* @export
* @enum {string}
*/
export enum RefundEventWhatEnum {
    Refunded = 'Refunded'
}


